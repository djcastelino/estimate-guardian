import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Estimate Guardian - Dental Fee Transparency',
  description: 'Check if your dental office is overcharging. Compare prices against NC Industrial Commission guidelines.',
  manifest: '/manifest.json',
  themeColor: '#2563eb'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
