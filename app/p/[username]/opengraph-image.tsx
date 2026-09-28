import { ImageResponse } from 'next/og';
import { displayName, fetchPortfolio } from '@/src/lib/portfolio/data';
import { HEX } from '@/src/og/tokens';
import { Lockup, ogFonts } from '@/src/og/OgCard';

export const alt = 'A product manager portfolio on Prodlog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const portfolio = await fetchPortfolio(username);

  const name = portfolio ? displayName(portfolio.profile) : 'Prodlog';
  const title = portfolio?.profile.title || 'Product Manager';
  const verifiedCount = portfolio?.verifiedLogIds.size ?? 0;
  const logCount = portfolio?.logs.length ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: HEX.ink,
          color: HEX.onInk,
          fontFamily: 'Source Serif 4',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 72, fontWeight: 400, lineHeight: 1.1 }}>{name}</div>
          <div style={{ fontSize: 36, marginTop: 20, color: HEX.onInkMuted }}>{title}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {logCount > 0 && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 26,
                  padding: '12px 24px',
                  borderRadius: 999,
                  border: `2px solid ${HEX.sageOnInk}`,
                  color: HEX.sageOnInk,
                }}
              >
                {`${logCount} ${logCount === 1 ? 'entry' : 'entries'}`}
              </div>
            )}
            {verifiedCount > 0 && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 26,
                  padding: '12px 24px',
                  borderRadius: 999,
                  backgroundColor: HEX.sageOnInk,
                  color: HEX.ink,
                }}
              >
                {`${verifiedCount} confirmed`}
              </div>
            )}
          </div>
          <Lockup height={36} />
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
