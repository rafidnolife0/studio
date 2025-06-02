
"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  
  useEffect(() => {
    const orderNumFromQuery = searchParams.get('orderNumber');
    if (orderNumFromQuery) {
      setOrderNumber(orderNumFromQuery);
    } else {
      // Fallback if orderNumber is not in query params for some reason
      setOrderNumber(`BS-${Math.floor(Math.random() * 1000000)}`);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Card className="w-full max-w-md p-6 md:p-10 shadow-xl">
        <CardHeader className="items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline text-primary">অর্ডার সফল হয়েছে!</CardTitle>
          <CardDescription className="text-lg mt-2">
            আপনার অর্ডার সফলভাবে প্লেস করা হয়েছে। শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে।
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          {orderNumber && (
            <p className="text-muted-foreground mb-2">
              অর্ডার নম্বর: <span className="font-mono">{orderNumber}</span>
            </p>
          )}
          <p className="text-muted-foreground mb-6">ধন্যবাদ আমাদের সাথে কেনাকাটার জন্য।</p>
          <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
            <Link href="/">আরও কেনাকাটা করুন</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
