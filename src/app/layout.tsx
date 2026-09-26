import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UJWALA — Let Your Light Shine | A Journey from Within',
  description:
    'An immersive spiritual interactive experience. A journey from within moving through Discover, Connect, Explore, and Illuminate to awaken the eternal light within you.',
  keywords: ['Ujwala', 'Festival of Light', 'Spiritual Journey', 'Inner Illumination', 'Bhagavad Gita', 'Soul Card'],
  authors: [{ name: 'Ujwala Festival Experience Team' }],
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Mukta:wght@300;400;500;600;700&family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ivory text-warm-800 font-body antialiased overflow-x-hidden selection:bg-blush-soft selection:text-warm-800">
        {children}
      </body>
    </html>
  );
}

