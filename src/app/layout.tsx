import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Journey to the Soul — A Janmashtami Quest',
  description:
    'A premium interactive spiritual discovery experience through Vrindavan celebrating Janmashtami. Discover who you are beyond the external layers of identity.',
  keywords: ['Janmashtami', 'Vrindavan', 'Bhagavad Gita', 'Spiritual Quest', 'Soul Card'],
  authors: [{ name: 'Vrindavan Quest Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600;1,700&family=Mukta:wght@400;500;600;700&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-peacock-950 text-ivory font-body antialiased overflow-x-hidden selection:bg-gold-500/30 selection:text-gold-200">
        {children}
      </body>
    </html>
  );
}
