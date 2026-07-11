import { ImageResponse } from 'next/og';
import { displayName, fetchPortfolio } from '@/src/lib/portfolio/data';

export const alt = 'Prodlog portfolio';
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
          backgroundColor: '#1F2A44',
          color: '#F6F7F9',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.1 }}>{name}</div>
          <div style={{ fontSize: 36, marginTop: 20, color: '#D8DAE0' }}>{title}</div>
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
                  border: '2px solid #6FAF8E',
                  color: '#6FAF8E',
                }}
              >
                {`${logCount} impact log${logCount === 1 ? '' : 's'}`}
              </div>
            )}
            {verifiedCount > 0 && (
              <div
                style={{
                  display: 'flex',
                  fontSize: 26,
                  padding: '12px 24px',
                  borderRadius: 999,
                  backgroundColor: '#6FAF8E',
                  color: '#1F2A44',
                }}
              >
                {`${verifiedCount} verified`}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#E1A948' }}>prodlog.app</div>
        </div>
      </div>
    ),
    size,
  );
}
