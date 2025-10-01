import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'SlotSync - Instant Booking for Shared Spaces',
  description: 'Book apartment amenities instantly. Zero drama, zero no-shows.',
  openGraph: {
    title: 'SlotSync',
    description: 'Instant booking, zero drama. Shared spaces that actually work.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
