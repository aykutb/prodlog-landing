import { groq } from 'next-sanity';

export type SanityContentSection = 'pillar' | 'blog' | 'templates' | 'compare';

export type SanityContentPage = {
  slug: string;
  title: string;
  description: string;
  headline?: string;
  order?: number;
  author?: string;
  imageUrl?: string;
  updatedAt?: string;
  body: string;
  downloadUrl?: string;
};

export const contentPagesBySectionQuery = groq`
  *[_type == "contentPage" && section == $section] | order(order asc, title asc) {
    "slug": slug.current,
    title,
    description,
    headline,
    order,
    author,
    "imageUrl": image.asset->url,
    "updatedAt": _updatedAt,
    body,
    "downloadUrl": downloadFile.asset->url
  }
`;

export const contentPageBySectionAndSlugQuery = groq`
  *[_type == "contentPage" && section == $section && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    description,
    headline,
    order,
    author,
    "imageUrl": image.asset->url,
    "updatedAt": _updatedAt,
    body,
    "downloadUrl": downloadFile.asset->url
  }
`;

export const contentPageSlugsBySectionQuery = groq`
  *[_type == "contentPage" && section == $section] | order(order asc) {
    "slug": slug.current
  }.slug
`;

export const pillarSlugsQuery = groq`
  *[_type == "contentPage" && section == "pillar"] | order(order asc) {
    "slug": slug.current
  }.slug
`;

export const bragDocumentDownloadQuery = groq`
  *[_type == "contentPage" && section == "pillar" && slug.current == "brag-document"][0] {
    "downloadUrl": downloadFile.asset->url,
    "filename": downloadFile.asset->originalFilename
  }
`;
