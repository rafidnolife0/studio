
"use client";

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
          const productDocRef = doc(db, "products", productId);
          const productDocSnap = await getDoc(productDocRef);

          if (productDocSnap.exists()) {
            setProduct({ id: productDocSnap.id, ...productDocSnap.data() } as Product);
          } else {
            setError("দুঃখিত, এই পণ্যটি এখন আর খুঁজে পাওয়া যাচ্ছে না।");
            toast({ title: "ত্রুটি!", description: "পণ্যটি খুঁজে পাওয়া যায়নি।", variant: "destructive" });
          }
        } catch (err) {
          console.error("Error fetching product: ", err);
          setError("পণ্যটি আনতে একটি সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
          toast({ title: "ত্রুটি!", description: "পণ্যটি আনতে সমস্যা হয়েছে।", variant: "destructive" });
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, toast]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">পণ্যের বিবরণ লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-destructive">একটি সমস্যা হয়েছে</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          <Button variant="default">হোমে ফিরে যান</Button>
        </Link>
      </div>
    );
  }
  
  if (!product) {
     // This case might be redundant if error state handles it, but as a fallback
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
