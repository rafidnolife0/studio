
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Monetag Site-wide Banner Ad Section */}
      <section className="w-full py-3 bg-muted/50 flex justify-center border-b border-border">
        <div className="ad-container-top-banner w-full flex justify-center">
          {/* Ad Slot 1: Top Banner */}
          <Script
            src="https://fpyf8.com/88/tag.min.js"
            strategy="lazyOnload"
            data-zone="150831"
            data-cfasync="false"
          />
        </div>
      </section>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
