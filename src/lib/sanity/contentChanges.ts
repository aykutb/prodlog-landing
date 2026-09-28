/**
 * Field-level content changes for Sanity `contentPage` documents: loading
 * the change lists and applying them to a document's fields. Shared by
 * scripts/sanity-content-patch.ts (writes to Sanity) and the development
 * preview (CONTENT_PREVIEW=1, applies them in memory). Server only.
 */
import fs from 'fs';
import path from 'path';

export type TextField = 'title' | 'description' | 'headline' | 'body';
export type ContentChange =
  | { field: TextField; before: string; after: string; why: string }
  | { field: 'order'; before: number; after: number; why: string };
export interface DocChanges {
  docId: string;
  changes: ContentChange[];
}
export interface NewContentDoc {
  _id: string;
  _type: 'contentPage';
  section: string;
  slug: { _type: 'slug'; current: string };
  title: string;
  description: string;
  headline?: string;
  order?: number;
  body: string;
}

const ROOT = process.cwd();
export const CHANGES_DIR = path.join(ROOT, 'scripts/sanity-content/changes');
export const NEW_DIR = path.join(ROOT, 'scripts/sanity-content/new');

const readJsonDir = <T>(dir: string): T[] =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.json'))
        .sort()
        .map((file) => JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')) as T)
    : [];

/** All change lists, merged per document in file order. */
export function loadChanges(): DocChanges[] {
  const byDoc = new Map<string, ContentChange[]>();
  for (const list of readJsonDir<DocChanges[]>(CHANGES_DIR)) {
    for (const doc of list) byDoc.set(doc.docId, [...(byDoc.get(doc.docId) ?? []), ...doc.changes]);
  }
  return [...byDoc].map(([docId, changes]) => ({ docId, changes }));
}

export const loadNewDocs = (): NewContentDoc[] => readJsonDir<NewContentDoc>(NEW_DIR);

const count = (haystack: string, needle: string) => (needle ? haystack.split(needle).length - 1 : 0);

export type Outcome = 'ok' | 'applied-already' | 'missing' | 'ambiguous';

/**
 * Applies one document's changes to its current field values. Pure: returns
 * the changed fields and an outcome per change. A change whose `before` is
 * gone but whose `after` is present counts as already applied.
 */
export function applyChanges(current: Record<string, unknown>, changes: ContentChange[]) {
  const next: Record<string, unknown> = {};
  const value = (field: string) => (field in next ? next[field] : current[field]);
  const outcomes = changes.map((change): Outcome => {
    if (change.field === 'order') {
      if (value('order') === change.after) return 'applied-already';
      if (value('order') !== change.before) return 'missing';
      next.order = change.after;
      return 'ok';
    }
    const text = String(value(change.field) ?? '');
    const hits = count(text, change.before);
    if (hits === 1) {
      next[change.field] = text.replace(change.before, () => change.after);
      return 'ok';
    }
    if (hits === 0) return change.after && text.includes(change.after) ? 'applied-already' : 'missing';
    return 'ambiguous';
  });
  return { next, outcomes };
}
