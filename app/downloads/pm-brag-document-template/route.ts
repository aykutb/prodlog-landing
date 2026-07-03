import { NextResponse } from 'next/server';
import { getPillarDownload } from '@/src/lib/content';

const DEFAULT_FILENAME = 'pm-brag-document-template.docx';
const SLUG = 'brag-document';

export const dynamic = 'force-static';

export async function GET() {
  const download = await getPillarDownload(SLUG);

  if (!download?.downloadUrl) {
    return new NextResponse('Template not found', { status: 404 });
  }

  const fileResponse = await fetch(download.downloadUrl);

  if (!fileResponse.ok) {
    return new NextResponse('Template not found', { status: 404 });
  }

  const buffer = await fileResponse.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${DEFAULT_FILENAME}"`,
      'Content-Length': String(buffer.byteLength),
    },
  });
}
