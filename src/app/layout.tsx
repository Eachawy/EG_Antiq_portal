import type { Metadata } from 'next';
import '../styles/index.css';

export const metadata: Metadata = {
  title: 'KEMETRA - Ancient Egypt Archaeological Sites',
  description: 'Explore ancient Egyptian archaeological sites, monuments, and historical treasures',
  icons: {
    icon: [
      {
        url: '/images/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
