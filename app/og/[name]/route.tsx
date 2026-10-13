import { ImageResponse } from 'next/og';
import { OG_CARDS, type OgCardDef, type OgCardName } from '@/src/og/cards';
import { OG_SIZE, OgCard, ogFonts } from '@/src/og/OgCard';

// Rendered once at build: one PNG per card in src/og/cards.ts.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(OG_CARDS).map((name) => ({ name }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const card: OgCardDef | undefined = OG_CARDS[name as OgCardName];
  if (!card) return new Response('Not found', { status: 404 });
  return new ImageResponse(<OgCard headline={card.headline} sub={card.sub} visual={card.visual} />, { ...OG_SIZE, fonts: ogFonts() });
}
