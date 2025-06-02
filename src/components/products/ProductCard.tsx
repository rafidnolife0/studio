"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block">
        <CardHeader className="p-0">
          <div className="aspect-square relative w-full">
            <Image
              src={product.imageUrl || "https://placehold.co/400x400.png"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint="product fashion"
            />
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-headline mb-1 hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">
          {product.description.substring(0, 70)}{product.description.length > 70 ? '...' : ''}
        </CardDescription>
        <p className="text-lg font-semibold text-primary">৳{product.price.toLocaleString('bn-BD')}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
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
