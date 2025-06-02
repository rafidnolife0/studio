"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Trash2, MinusSquare, PlusSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCartIcon className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-2xl font-headline font-semibold mb-4">আপনার শপিং কার্ট খালি</h1>
        <p className="text-muted-foreground mb-8">মনে হচ্ছে আপনি এখনো কিছু পছন্দ করেননি।</p>
        <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/">কেনাকাটা শুরু করুন</Link>
        </Button>
      </div>
    );
  }
  
  const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-headline font-bold mb-8 text-primary">আপনার শপিং কার্ট</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <Card key={item.id} className="flex flex-col md:flex-row items-center p-4 gap-4 shadow-md">
            <div className="w-24 h-24 relative shrink-0">
               <Image
                src={item.imageUrl || "https://placehold.co/100x100.png"}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                data-ai-hint="product item"
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-lg font-semibold font-headline">{item.name}</h2>
              <p className="text-sm text-muted-foreground">একক মূল্য: ৳{item.price.toLocaleString('bn-BD')}</p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                <MinusSquare className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                className="w-16 text-center h-9"
                min="1"
              />
              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                <PlusSquare className="h-4 w-4" />
              </Button>
            </div>
            <p className="font-semibold w-24 text-center md:text-right shrink-0">৳{(item.price * item.quantity).toLocaleString('bn-BD')}</p>
            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10 shrink-0">
              <Trash2 className="h-5 w-5" />
            </Button>
          </Card>
        ))}
      </div>

      <Card className="mt-10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-headline">অর্ডার সারাংশ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>মোট পণ্য:</span>
            <span>{itemCount} টি</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>সর্বমোট মূল্য:</span>
            <span className="text-accent">৳{cartTotal.toLocaleString('bn-BD')}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4 p-6">
          <Button variant="outline" onClick={clearCart} className="w-full md:w-auto border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
            কার্ট খালি করুন
          </Button>
          <Button asChild size="lg" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/checkout">চেকআউট করতে এগিয়ে যান</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
