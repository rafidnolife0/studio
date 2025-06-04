
"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { differenceInDays } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  let isNew = false;
  if (product.createdAt) {
    let productDate: Date;
    if (product.createdAt instanceof Timestamp) {
      productDate = product.createdAt.toDate();
    } else if (typeof product.createdAt === 'string') {
      productDate = new Date(product.createdAt);
    } else {
      // Fallback for unexpected type, or if it's already a Date object (though type says Timestamp | string)
      // Ensuring it's treated as a Date if possible, otherwise very old date
      productDate = product.createdAt instanceof Date ? product.createdAt : new Date(0); 
    }
    
    if (productDate && !isNaN(productDate.getTime())) { // Check if date is valid
        isNew = differenceInDays(new Date(), productDate) <= 7;
    }
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0 relative">
          {isNew && (
            <Badge
              variant="default"
              className="absolute top-2 right-2 bg-accent text-accent-foreground z-10 shadow-md"
            >
              নতুন
            </Badge>
          )}
          <div className="aspect-square relative w-full">
            <Image
              src={product.imageUrl || "https://placehold.co/400x400.png"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={product.dataAihint || "product fashion"}
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-headline mb-1 hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        {product.category && (
          <Badge variant="outline" className="mb-2 text-xs font-medium">
            {product.category}
          </Badge>
        )}
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
          {product.description.substring(0, 70)}{product.description.length > 70 ? '...' : ''}
        </CardDescription>
        <p className="text-lg font-semibold text-primary">৳{product.price.toLocaleString('bn-BD')}</p>
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <Button
          variant="default"
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          কার্টে যোগ করুন
        </Button>
      </CardFooter>
    </Card>
  );
}
