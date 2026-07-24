import type { Metadata } from 'next';
import { Inter, Outfit, Source_Serif_4 } from 'next/font/google';
import { Layout } from '@/src/components/layout';
import { ConsentGate } from '@/src/components/consent';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-VYKQQTGRNT';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: {
    icon: '/logomark.svg',
    apple: '/logomark.svg',
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
      className={`${inter.variable} ${outfit.variable} ${sourceSerif.variable}`}
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
