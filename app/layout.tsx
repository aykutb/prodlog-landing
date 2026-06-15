import type { Metadata } from 'next';
import { Inter, Outfit, Source_Serif_4 } from 'next/font/google';
import { Layout } from '@/src/components/layout';
import './globals.css';

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
      </body>
    </html>
  );
}
