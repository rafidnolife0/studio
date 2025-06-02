
"use client";
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

const mockProducts: Product[] = [
  { id: '1', name: 'সুতির পাঞ্জাবি', description: 'আরামদায়ক সুতির পাঞ্জাবি, উৎসবের জন্য উপযুক্ত।', price: 1200, imageUrl: 'https://placehold.co/400x400.png?text=পাঞ্জাবি', category: 'পোশাক', dataAihint: 'traditional men clothing' },
  { id: '2', name: 'জামদানি শাড়ি', description: 'ঐতিহ্যবাহী জামদানি শাড়ি, আধুনিক ডিজাইনের সাথে।', price: 5500, imageUrl: 'https://placehold.co/400x400.png?text=শাড়ি', category: 'পোশাক', dataAihint: 'saree fashion' },
  { id: '3', name: 'চórz বাংলা টি-শার্ট', description: 'স্টাইলিশ বাংলা প্রিন্টেড টি-শার্ট, তরুণদের জন্য।', price: 450, imageUrl: 'https://placehold.co/400x400.png?text=টি-শার্ট', category: 'পোশাক', dataAihint: 'tshirt graphic' },
  { id: '4', name: 'নকশি কাঁথা', description: 'হাতে তৈরি সুন্দর নকশি কাঁথা, ঘরের শোভা বাড়াতে।', price: 2200, imageUrl: 'https://placehold.co/400x400.png?text=নকশি+কাঁথা', category: 'গৃহসজ্জা', dataAihint: 'textile pattern' },
  { id: '5', name: 'রূপার গহনা সেট', description: 'আধুনিক ডিজাইনের আকর্ষণীয় রূপার গহনা সেট।', price: 3500, imageUrl: 'https://placehold.co/400x400.png?text=গহনা', category: 'গহনা', dataAihint: 'jewelry silver' },
  { id: '6', name: 'চামড়ার স্যান্ডেল', description: 'আরামদায়ক এবং টেকসই চামড়ার স্যান্ডেল।', price: 900, imageUrl: 'https://placehold.co/400x400.png?text=স্যান্ডেল', category: 'জুতা', dataAihint: 'leather sandals' },
];

export default function HomePage() {
  const products = mockProducts;
  const { currentUser, loading: authLoading } = useAuth();
  const ADMIN_EMAIL = "admin@banglashop.com";

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-8 text-center text-primary">আমাদের পণ্যসমূহ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!authLoading && currentUser && currentUser.email === ADMIN_EMAIL && (
        <div className="mt-12 mb-8 text-center">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/admin" className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5" />
              অ্যাডমিন প্যানেল
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

    