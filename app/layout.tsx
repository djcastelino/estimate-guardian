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
  title: 'Estimate Guardian | NC Dental Price Checker - Stop Overcharging',
  description: 'Free NC dental estimate verification tool. Check if your dentist is overcharging based on NC Industrial Commission guidelines. Compare CDT codes, prices, and get instant audit results for North Carolina dental procedures.',
  keywords: 'dental estimate, NC dental prices, dental overcharging, workers compensation dental, NC Industrial Commission, dental fee schedule, CDT codes, dental price checker, fair dental prices North Carolina',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  openGraph: {
    title: 'Estimate Guardian - Stop Dental Overcharging in NC',
    description: 'Free tool to check if your dentist is overcharging. Compare against NC state guidelines instantly.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estimate Guardian - NC Dental Price Checker',
    description: 'Check if your dentist is overcharging. Free, instant, based on NC state guidelines.',
  }
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
