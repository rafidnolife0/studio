
"use client";

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowLeft, Loader2, AlertTriangle, Star, MessageSquare, Heart } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">পণ্যের বিবরণ লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-destructive">একটি সমস্যা হয়েছে</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button asChild variant="default">
          <Link href="/">হোমে ফিরে যান</Link>
        </Button>
      </div>
    );
  }
  
  if (!product) {
    return (
        <div className="text-center py-10 min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">পণ্যটি খুঁজে পাওয়া যায়নি।</h1>
            <Button asChild variant="link" className="mt-4">
                <Link href="/">হোমে ফিরে যান</Link>
            </Button>
        </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "সফল!",
      description: `${product.name} (${quantity} টি) আপনার কার্টে যোগ করা হয়েছে।`,
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Button variant="outline" asChild className="text-sm">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            সকল পণ্য দেখুন
          </Link>
        </Button>
      </div>
      
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-4 md:p-6 bg-card flex justify-center items-center md:border-r">
            <div className="aspect-square relative w-full max-w-md">
              <Image
                src={product.imageUrl || "https://placehold.co/600x600.png"}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                data-ai-hint={product.dataAihint || "product item detail"}
              />
            </div>
          </div>
          
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl lg:text-4xl font-headline mb-2 text-primary">{product.name}</CardTitle>
              {product.category && (
                <Badge variant="secondary" className="w-fit text-sm py-1 px-3">{product.category}</Badge>
              )}
            </CardHeader>

            <CardContent className="p-0 flex-grow space-y-4">
              {/* Placeholder for ratings and reviews */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span>(৪.২ / ১২০ টি রিভিউ)</span> 
                <span className="text-primary hover:underline cursor-pointer flex items-center"><MessageSquare className="h-4 w-4 mr-1" /> একটি রিভিউ লিখুন</span>
              </div>

              <CardDescription className="text-base text-foreground leading-relaxed line-clamp-5 hover:line-clamp-none transition-all duration-300 ease-in-out">
                {product.description}
              </CardDescription>
              
              <p className="text-4xl font-bold text-accent pt-2">৳{product.price.toLocaleString('bn-BD')}</p>

              <div className="flex items-center space-x-3 pt-2">
                <label htmlFor="quantity" className="font-medium">পরিমাণ:</label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center"
                  min="1"
                />
              </div>
            </CardContent>

            <CardFooter className="p-0 mt-8 space-x-3">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg flex-grow"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                কার্টে যোগ করুন
              </Button>
              <Button variant="outline" size="lg" className="px-4">
                <Heart className="h-5 w-5" />
                <span className="sr-only">পছন্দের তালিকায় যোগ করুন</span>
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}

