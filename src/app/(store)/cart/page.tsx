
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Trash2, MinusSquare, PlusSquare, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Script from 'next/script';

const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-headline font-semibold mb-4 text-primary">আপনার শপিং কার্ট এখন খালি</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">মনে হচ্ছে আপনি এখনো কোনো পছন্দের পণ্য কার্টে যোগ করেননি। এখনই দারুণ সব পণ্য দেখুন!</p>
        <Button asChild variant="default" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base py-3 px-6">
          <Link href="/">কেনাকাটা শুরু করুন</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8 text-primary">আপনার শপিং কার্ট</h1>
      
      {/* Ad Slot 4: Cart Page - Above Cart Items/Summary Grid */}
      <section className="my-8 flex justify-center ad-container-cart-page min-h-[50px] bg-muted/10">
        <Script
          src="https://fpyf8.com/88/tag.min.js"
          strategy="afterInteractive"
          data-zone="150831"
          data-cfasync="false"
        />
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 gap-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-28 h-28 relative shrink-0">
                 <Image
                  src={item.imageUrl || "https://placehold.co/120x120.png"}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md border"
                  data-ai-hint="product item cart"
                />
              </div>
              <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${item.id}`} className="hover:underline">
                  <h2 className="text-lg font-semibold font-headline mb-1">{item.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">একক মূল্য: ৳{item.price.toLocaleString('bn-BD')}</p>
              </div>
              <div className="flex items-center space-x-2 shrink-0 my-2 sm:my-0">
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="h-9 w-9">
                  <MinusSquare className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (!isNaN(newQuantity) && newQuantity >= 1) {
                         updateQuantity(item.id, newQuantity);
                    } else if (e.target.value === "") {
                         // Allow empty input for a moment, but don't update until a valid number
                    } else {
                        updateQuantity(item.id, 1); // Reset to 1 if invalid input
                    }
                  }}
                  onBlur={(e) => { // Ensure quantity is at least 1 on blur
                    if (parseInt(e.target.value) < 1 || isNaN(parseInt(e.target.value))) {
                        updateQuantity(item.id, 1);
                    }
                  }}
                  className="w-16 text-center h-9 px-1"
                  min="1"
                />
                <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9">
                  <PlusSquare className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-semibold w-28 text-center sm:text-right shrink-0 text-primary">৳{(item.price * item.quantity).toLocaleString('bn-BD')}</p>
              <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10 hover:text-destructive-foreground shrink-0 h-9 w-9">
                <Trash2 className="h-5 w-5" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-headline">অর্ডার সারাংশ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>মোট পণ্য ({itemCount.toLocaleString('bn-BD')} টি):</span>
                <span>৳{cartTotal.toLocaleString('bn-BD')}</span>
              </div>
              {/* Placeholder for discount and shipping */}
              <div className="flex justify-between text-muted-foreground">
                <span>ডেলিভারি চার্জ:</span>
                <span>আলোচনা সাপেক্ষে</span>
              </div>
              <Separator className="my-3"/>
              <div className="flex justify-between font-bold text-lg">
                <span>সর্বমোট মূল্য:</span>
                <span className="text-accent">৳{cartTotal.toLocaleString('bn-BD')}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 p-4 pt-2">
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base py-3">
                <Link href="/checkout">চেকআউট করতে এগিয়ে যান</Link>
              </Button>
              <Button variant="outline" onClick={clearCart} className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive">
                কার্ট খালি করুন
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

