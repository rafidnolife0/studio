import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppProviders from '@/contexts/AppProviders';

export const metadata: Metadata = {
  title: 'বাংলা শপ',
  description: 'আপনার বিশ্বস্ত অনলাইন শপিং হাব',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Updated font links */}
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased"> {/* font-body will now pick up Roboto from tailwind.config.ts */}
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
