
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Monetag Site-wide Banner Ad Section */}
      <section className="w-full py-3 bg-muted/50 flex justify-center border-b border-border">
        <Link href="https://otieu.com/4/9416953" target="_blank" rel="noopener noreferrer" aria-label="Advertisement">
          <div className="relative w-[calc(100vw-40px)] max-w-[728px] h-[90px] md:max-w-[970px] md:h-[90px] lg:max-w-[1140px] lg:h-[100px] overflow-hidden shadow-md hover:shadow-lg transition-shadow rounded-md">
            <Image
              src="https://placehold.co/1140x100.png"
              alt="Banner Ad"
              layout="fill"
              objectFit="cover"
              data-ai-hint="advertisement banner top"
              priority
            />
          </div>
        </Link>
      </section>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
