import { defineField, defineType } from 'sanity';

const SECTIONS = [
  { title: 'Pillar', value: 'pillar' },
  { title: 'Blog', value: 'blog' },
  { title: 'Templates', value: 'templates' },
  { title: 'Compare', value: 'compare' },
] as const;

export const contentPage = defineType({
  name: 'contentPage',
  title: 'Content Page',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [...SECTIONS],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'SEO title (may include "| Prodlog" suffix)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Visible page H1. Falls back to title if empty.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first in hub listings.',
    }),
    defineField({
      name: 'body',
      title: 'MDX body',
      type: 'text',
      rows: 30,
      description:
        'MDX content without frontmatter. Use registered components: ProcessSteps, ProcessStep, FAQSection, FAQItem, BragExamplesGrid, BragExampleCard, ImagePlaceholder, TemplateDownloadCTA, ArticleCTA, NotComparisonSection, NotComparisonCard.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'downloadFile',
      title: 'Download file',
      type: 'file',
      description: 'Optional file attachment (e.g. brag document .docx template).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      section: 'section',
      slug: 'slug.current',
    },
    prepare({ title, section, slug }) {
      return {
        title: title ?? 'Untitled',
        subtitle: `${section ?? 'unknown'} / ${slug ?? 'no-slug'}`,
      };
    },
  },
});
