
"use client";
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, itemCount } = useCart();
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && !authLoading && !currentUser) {
      router.push('/login?redirect=/checkout');
    }
  }, [currentUser, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-headline font-semibold mb-4">অনুগ্রহ করে লগইন করুন</h1>
        <p className="text-muted-foreground mb-8">চেকআউট করার জন্য আপনাকে লগইন করতে হবে।</p>
        <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/login?redirect=/checkout">লগইন পৃষ্ঠায় যান</Link>
        </Button>
      </div>
    );
  }

  if (itemCount === 0) {
     return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-headline font-semibold mb-4">আপনার কার্ট খালি</h1>
        <p className="text-muted-foreground mb-8">চেকআউট করার জন্য অনুগ্রহ করে কিছু পণ্য যোগ করুন।</p>
        <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/">কেনাকাটা শুরু করুন</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="text-3xl font-headline font-bold mb-8 text-primary">ডেলিভারির তথ্য</h1>
        <Card className="shadow-lg">
            <CardContent className="p-6 md:p-8">
                <CheckoutForm />
            </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <h2 className="text-2xl font-headline font-bold mb-8 text-primary">আপনার অর্ডার</h2>
        <Card className="shadow-lg sticky top-24">
            <CardHeader>
                <CardTitle className="text-xl">অর্ডার সারাংশ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[50vh] overflow-y-auto">
                {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border-b pb-3 last:border-b-0 last:pb-0">
                        <div className="relative w-16 h-16 shrink-0">
                            <Image src={item.imageUrl || "https://placehold.co/64x64.png"} alt={item.name} layout="fill" objectFit="cover" className="rounded" data-ai-hint="product item small" />
                        </div>
                        <div className="flex-grow">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">পরিমাণ: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold shrink-0">৳{(item.price * item.quantity).toLocaleString('bn-BD')}</p>
                    </div>
                ))}
            </CardContent>
            <CardContent className="border-t mt-4 pt-4">
                 <div className="flex justify-between text-lg font-bold">
                    <span>সর্বমোট:</span>
                    <span className="text-accent">৳{cartTotal.toLocaleString('bn-BD')}</span>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

    
