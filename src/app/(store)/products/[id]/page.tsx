"use client";

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Mock data - replace with API call to Firebase
const mockProducts: Product[] = [
  { id: '1', name: 'সুতির পাঞ্জাবি', description: 'আরামদায়ক সুতির পাঞ্জাবি, বিভিন্ন রঙ ও সাইজে পাওয়া যায়। এটি ঐতিহ্যবাহী এবং আধুনিকতার এক দারুণ মিশ্রণ। উৎসব এবং সাধারণ পরিধানের জন্য খুবই উপযোগী।', price: 1200, imageUrl: 'https://placehold.co/600x600.png?text=পাঞ্জাবি', category: 'পোশাক', dataAihint: 'traditional men clothing' },
  { id: '2', name: 'জামদানি শাড়ি', description: 'বাংলাদেশের গর্ব ঐতিহ্যবাহী জামদানি শাড়ি। নিখুঁত বুনন এবং আকর্ষণীয় ডিজাইন এটিকে করেছে অনন্য। যেকোনো অনুষ্ঠানে আপনাকে দেবে রাজকীয় চেহারা।', price: 5500, imageUrl: 'https://placehold.co/600x600.png?text=শাড়ি', category: 'পোশাক', dataAihint: 'saree fashion' },
  { id: '3', name: 'চórz বাংলা টি-শার্ট', description: 'উচ্চ মানের কটন ফেব্রিক দিয়ে তৈরি স্টাইলিশ বাংলা প্রিন্টেড টি-শার্ট। এটি পরতে আরামদায়ক এবং দেখতেও আকর্ষণীয়। তরুণদের প্রথম পছন্দ।', price: 450, imageUrl: 'https://placehold.co/600x600.png?text=টি-শার্ট', category: 'পোশাক', dataAihint: 'tshirt graphic' },
  { id: '4', name: 'নকশি কাঁথা', description: 'বাংলার ঐতিহ্যবাহী হস্তশিল্প নকশি কাঁথা। প্রতিটি কাঁথায় রয়েছে লোককথার ছোঁয়া এবং শিল্পীর নিপুণ হাতের কাজ। এটি আপনার ঘরের সৌন্দর্য বহুগুণে বাড়িয়ে দেবে।', price: 2200, imageUrl: 'https://placehold.co/600x600.png?text=নকশি+কাঁথা', category: 'গৃহসজ্জা', dataAihint: 'textile pattern' },
  { id: '5', name: 'রূপার গহনা সেট', description: 'আধুনিক নারীদের জন্য আকর্ষণীয় ডিজাইনের রূপার গহনা সেট। এটি আপনার সাজকে আরও আকর্ষণীয় করে তুলবে। যেকোনো পার্টি বা অনুষ্ঠানের জন্য মানানসই।', price: 3500, imageUrl: 'https://placehold.co/600x600.png?text=গহনা', category: 'গহনা', dataAihint: 'jewelry silver' },
  { id: '6', name: 'চামড়ার স্যান্ডেল', description: 'খাঁটি চামড়া দিয়ে তৈরি উন্নত মানের স্যান্ডেল। এটি পরতে খুবই আরামদায়ক এবং দীর্ঘস্থায়ী। দৈনন্দিন ব্যবহারের জন্য আদর্শ।', price: 900, imageUrl: 'https://placehold.co/600x600.png?text=স্যান্ডেল', category: 'জুতা', dataAihint: 'leather sandals' },
];


export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const productId = params.id as string;

  // In a real app, fetch product by ID from Firebase Firestore
  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
        <div className="text-center py-10">
            <h1 className="text-2xl font-bold">পণ্যটি খুঁজে পাওয়া যায়নি।</h1>
            <Link href="/" className="text-primary hover:underline mt-4 inline-block">
                হোমে ফিরে যান
            </Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        সকল পণ্য দেখুন
      </Link>
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <CardHeader className="p-0 md:border-r">
            <div className="aspect-square relative w-full">
              <Image
                src={product.imageUrl || "https://placehold.co/600x600.png"}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                data-ai-hint={product.dataAihint || "product item"}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <CardTitle className="text-3xl font-headline mb-3 text-primary">{product.name}</CardTitle>
              {product.category && <p className="text-sm text-muted-foreground mb-3">ক্যাটাগরি: {product.category}</p>}
              <CardDescription className="text-base text-foreground mb-6 leading-relaxed">{product.description}</CardDescription>
              <p className="text-3xl font-semibold text-accent mb-6">৳{product.price.toLocaleString('bn-BD')}</p>
            </div>
            <Button
              variant="default"
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              কার্টে যোগ করুন
            </Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
