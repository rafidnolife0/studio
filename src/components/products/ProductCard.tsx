
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { differenceInDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast'; // Added toast

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast(); // Initialize toast

  let isNew = false;
  if (product.createdAt) {
    let productDate: Date;
    if (product.createdAt instanceof Timestamp) {
      productDate = product.createdAt.toDate();
    } else if (typeof product.createdAt === 'string') {
      productDate = new Date(product.createdAt);
    } else {
      productDate = product.createdAt instanceof Date ? product.createdAt : new Date(0); 
    }
    
    if (productDate && !isNaN(productDate.getTime())) { 
        isNew = differenceInDays(new Date(), productDate) <= 7;
    }
  }

  const handleWishlistClick = () => {
    toast({
      title: "শীঘ্রই আসছে!",
      description: `${product.name} আপনার পছন্দের তালিকায় যোগ করার সুবিধা শীঘ্রই আসছে।`,
    });
  };
  
  const stockStatus = () => {
    if (typeof product.stockQuantity === 'number') {
      if (product.stockQuantity <= 0) {
        return <Badge variant="destructive" className="text-xs">স্টক শেষ</Badge>;
      } else if (product.stockQuantity < 5) {
        return <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-600">স্টক সীমিত ({product.stockQuantity.toLocaleString('bn-BD')}টি)</Badge>;
      }
      return <p className="text-xs text-muted-foreground">স্টক: {product.stockQuantity.toLocaleString('bn-BD')}টি</p>;
    }
    return null;
  };


  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-card">
      <Link href={`/products/${product.id}`} className="block group">
        <CardHeader className="p-0 relative">
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5">
            {isNew && (
              <Badge
                variant="default"
                className="bg-accent text-accent-foreground shadow-md text-xs"
              >
                নতুন
              </Badge>
            )}
             {product.stockQuantity !== undefined && product.stockQuantity <= 0 && (
                <Badge variant="destructive" className="text-xs shadow-md">স্টক শেষ</Badge>
            )}
          </div>
          <div className="aspect-square relative w-full overflow-hidden">
            <Image
              src={product.imageUrl || "https://placehold.co/400x400.png"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.dataAihint || "product fashion"}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-headline mb-1 hover:text-primary transition-colors line-clamp-2">{product.name}</CardTitle>
        </Link>
        {product.category && (
          <Badge variant="secondary" className="mb-2 text-xs font-medium py-0.5 px-1.5">
            {product.category}
          </Badge>
        )}
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden line-clamp-2">
          {product.description}
        </CardDescription>
        <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-semibold text-primary">৳{product.price.toLocaleString('bn-BD')}</p>
            <div className="text-right">{stockStatus()}</div>
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t mt-auto bg-muted/30">
        <div className="flex w-full gap-2">
            <Button
                variant="default"
                className="flex-grow bg-accent text-accent-foreground hover:bg-accent/90 text-sm"
                onClick={() => addToCart(product)}
                disabled={product.stockQuantity !== undefined && product.stockQuantity <= 0}
            >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                কার্টে নিন
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-primary/50 text-primary/70 hover:bg-primary/10 hover:text-primary" onClick={handleWishlistClick}>
                <Heart className="h-4 w-4" />
                <span className="sr-only">পছন্দের তালিকায় যোগ</span>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

