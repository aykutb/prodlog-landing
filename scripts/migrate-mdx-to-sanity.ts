/**
 * One-time migration: import filesystem MDX into Sanity.
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
 *   - SANITY_API_WRITE_TOKEN with Editor permissions
 *
 * Usage: npm run migrate:sanity
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@sanity/client';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const FOLDER_TO_SECTION: Record<string, string> = {
  pillars: 'pillar',
  blog: 'blog',
  templates: 'templates',
  compare: 'compare',
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment.',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token,
  useCdn: false,
});

type MdxFrontmatter = {
  title: string;
  description: string;
  headline?: string;
  order?: number;
};

async function uploadDocx(filePath: string): Promise<{ _type: 'reference'; _ref: string }> {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('file', buffer, {
    filename: path.basename(filePath),
    contentType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  return { _type: 'reference', _ref: asset._id };
}

async function migrateMdxFile(
  section: string,
  slug: string,
  filePath: string,
  downloadFileRef?: { _type: 'reference'; _ref: string },
): Promise<void> {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { content: body, data } = matter(raw);
  const frontmatter = data as MdxFrontmatter;

  const doc = {
    _id: `contentPage-${section}-${slug}`,
    _type: 'contentPage' as const,
    section,
    slug: { _type: 'slug' as const, current: slug },
    title: frontmatter.title,
    description: frontmatter.description,
    headline: frontmatter.headline,
    order: frontmatter.order,
    body: body.trim(),
    ...(downloadFileRef ? { downloadFile: { asset: downloadFileRef, _type: 'file' as const } } : {}),
  };

  await client.createOrReplace(doc);
  console.log(`  ✓ ${section}/${slug}`);
}

async function main(): Promise<void> {
  console.log(`Migrating MDX to Sanity (${projectId}/${dataset})...\n`);

  const docxPath = path.join(CONTENT_DIR, 'pillars', 'pm-brag-document-template.docx');
  let docxRef: { _type: 'reference'; _ref: string } | undefined;

  if (fs.existsSync(docxPath)) {
    console.log('Uploading pm-brag-document-template.docx...');
    docxRef = await uploadDocx(docxPath);
    console.log('  ✓ docx uploaded\n');
  }

  for (const [folder, section] of Object.entries(FOLDER_TO_SECTION)) {
    const dir = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(dir)) {
      continue;
    }

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
    if (files.length === 0) {
      continue;
    }

    console.log(`${section}:`);
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(dir, file);
      const attachDocx = section === 'pillar' && slug === 'brag-document' ? docxRef : undefined;
      await migrateMdxFile(section, slug, filePath, attachDocx);
    }
    console.log('');
  }

  console.log('Migration complete. Verify at /studio');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
