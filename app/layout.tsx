import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { Layout } from '@/src/components/layout';
import { ConsentGate } from '@/src/components/consent';
import './globals.css';
import { APP_STORE_ID } from '@/src/lib/appStore';

const GA_MEASUREMENT_ID = 'G-VYKQQTGRNT';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  // Generated in prodlog2 (npm run brand:assets) from the one logomark
  // definition; copied here, never edited by hand.
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  // Safari Smart App Banner. Root layout metadata merges into every route,
  // so the tag is site wide.
  other: {
    'apple-itunes-app': `app-id=${APP_STORE_ID}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <body>
        <Layout>{children}</Layout>
        {/* Owns both the banner and the Google tag: the tag is mounted only
            after consent, so a visitor who declines or never answers is never
            given an analytics cookie. */}
        <ConsentGate
          measurementId={GA_MEASUREMENT_ID}
          analyticsEnabled={process.env.NODE_ENV === 'production'}
        />
      </body>
    </html>
  );
}
