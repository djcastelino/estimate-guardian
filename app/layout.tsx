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
  description: 'Free NC dental estimate verification tool. Check if your dentist charges fair prices based on NC Medicaid fee schedules. Compare CDT codes, get instant pricing audits for North Carolina dental procedures.',
  keywords: 'dental estimate, NC dental prices, dental overcharging, NC Medicaid dental, medicaid fee schedule, dental fee schedule, CDT codes, dental price checker, fair dental prices North Carolina, affordable dental NC',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  openGraph: {
    title: 'Estimate Guardian - Stop Dental Overcharging in NC',
    description: 'Free tool to check if your dentist charges fair prices. Compare against NC Medicaid fee schedules instantly.',
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
