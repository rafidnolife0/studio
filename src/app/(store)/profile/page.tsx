
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import type { Order, OrderItem } from '@/lib/types';
import { Loader2, PackageSearch, UserCircle, ShoppingBag, MapPin, LogOut, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';


const orderStatusMap: Record<Order['status'], string> = {
  Pending: 'অপেক্ষারত',
  Processing: 'প্রসেসিং চলছে',
  Shipped: 'পাঠানো হয়েছে',
  Delivered: 'ডেলিভারি হয়েছে',
  Cancelled: 'বাতিল হয়েছে',
};

const getStatusBadgeVariant = (status: Order['status']): string => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-400 hover:bg-yellow-200';
    case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-400 hover:bg-blue-200';
    case 'Shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-400 hover:bg-indigo-200';
    case 'Delivered': return 'bg-green-100 text-green-800 border-green-400 hover:bg-green-200';
    case 'Cancelled': return 'bg-red-100 text-red-800 border-red-400 hover:bg-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-400';
  }
};


export default function ProfilePage() {
  const { currentUser, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login?redirect=/profile');
    }
  }, [currentUser, authLoading, router]);

  useEffect(() => {
    if (currentUser) {
      setLoadingOrders(true);
      const ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.uid),
        orderBy("orderDate", "desc")
      );

      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        const fetchedOrders = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            orderDate: data.orderDate instanceof Timestamp ? data.orderDate.toDate().toISOString() : data.orderDate,
          } as Order;
        });
        setOrders(fetchedOrders);
        setLoadingOrders(false);
      }, (error) => {
        console.error("Error fetching orders: ", error);
        toast({ title: "ত্রুটি!", description: "আপনার অর্ডারগুলো আনতে সমস্যা হয়েছে।", variant: "destructive"});
        setLoadingOrders(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser, toast]);

  if (authLoading || (!currentUser && !authLoading)) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">আপনার তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }
  
  if (!currentUser) {
    // This case should be covered by the redirect, but as a fallback.
    return (
      <div className="text-center py-20 min-h-[calc(100vh-200px)] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-headline font-semibold mb-4">অনুগ্রহ করে লগইন করুন</h1>
        <p className="text-muted-foreground mb-8">আপনার প্রোফাইল দেখতে লগইন করতে হবে।</p>
        <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/login?redirect=/profile">লগইন পৃষ্ঠায় যান</Link>
        </Button>
      </div>
    );
  }

  const handleEditProfile = () => {
    toast({
      title: "শীঘ্রই আসছে!",
      description: "প্রোফাইল সম্পাদনা করার সুবিধা শীঘ্রই যোগ করা হবে।",
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mb-10 shadow-xl border-t-4 border-primary rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 p-6">
          <div className="flex items-center gap-4">
            <UserCircle className="h-16 w-16 text-primary shrink-0" />
            <div>
              <CardTitle className="text-3xl font-headline">{currentUser.displayName || 'ব্যবহারকারী'}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">{currentUser.email}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto pt-2 sm:pt-0">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-primary border-primary hover:bg-primary/10" onClick={handleEditProfile}>
                <Edit2 className="mr-2 h-4 w-4" /> প্রোফাইল সম্পাদনা
            </Button>
            <Button variant="outline" onClick={logout} size="sm" className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive flex-1 sm:flex-none">
              <LogOut className="mr-2 h-4 w-4" /> লগআউট
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-headline font-bold text-primary flex items-center">
          <ShoppingBag className="mr-3 h-8 w-8 text-accent" />
          আপনার অর্ডারসমূহ
        </h2>
      </div>


      {loadingOrders ? (
        <div className="text-center py-16">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">আপনার অর্ডারগুলো লোড হচ্ছে...</p>
        </div>
      ) : orders.length === 0 ? (
        <Card className="text-center py-16 px-6 shadow-md rounded-lg">
          <CardContent className="flex flex-col items-center">
            <PackageSearch className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-semibold mb-3 text-primary">এখনও কোনো অর্ডার করেননি!</h3>
            <p className="text-muted-foreground mb-8 max-w-md">আপনার পছন্দের পণ্যগুলো খুঁজে দেখুন এবং আজই আপনার প্রথম অর্ডারটি করুন। আমরা সেরা মানের পণ্য ও দ্রুত ডেলিভারি নিশ্চিত করি।</p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base py-3 px-6">
              <Link href="/">কেনাকাটা শুরু করুন</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {orders.map((order) => (
            <AccordionItem value={order.id} key={order.id} className="bg-card border border-border rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <AccordionTrigger className="px-4 py-3 md:px-6 md:py-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-4">
                  <div className="flex-1">
                    <p className="font-mono text-sm font-semibold text-primary">অর্ডার নং: {order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.orderDate ? format(new Date(order.orderDate), 'dd MMMM, yyyy, hh:mm a', { locale: bn }) : 'N/A'}
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-end gap-2 sm:gap-0 sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                     <Badge variant="outline" className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadgeVariant(order.status)}`}>
                        {orderStatusMap[order.status]}
                     </Badge>
                    <p className="text-lg font-bold text-accent">৳{order.totalAmount.toLocaleString('bn-BD')}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-0 md:px-6 md:pb-6">
                <Separator className="mb-4 mt-2"/>
                <div className="grid md:grid-cols-5 gap-6">
                    <div className="md:col-span-3">
                        <h4 className="font-semibold mb-3 text-md text-primary">অর্ডারকৃত পণ্যসমূহ:</h4>
                        <div className="space-y-3 max-h-72 overflow-y-auto pr-2 -mr-2 rounded-md border bg-background/50 p-3">
                            {order.items.map((item: OrderItem, index: number) => (
                            <Card key={index} className="flex items-start p-3 gap-3 shadow-sm bg-card hover:shadow-md transition-shadow">
                                <Image
                                src={item.imageUrl || "https://placehold.co/64x64.png"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="rounded-md object-cover border shrink-0"
                                data-ai-hint="ordered item thumbnail"
                                />
                                <div className="flex-grow">
                                <p className="font-semibold leading-tight text-sm">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    পরিমাণ: {item.quantity.toLocaleString('bn-BD')} | 
                                    একক মূল্য: ৳{item.price.toLocaleString('bn-BD')}
                                </p>
                                </div>
                                <p className="text-sm font-bold text-primary whitespace-nowrap">
                                ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                                </p>
                            </Card>
                            ))}
                        </div>
                    </div>
                     <div className="md:col-span-2">
                        <h4 className="font-semibold mb-3 text-md text-primary">ডেলিভারির ঠিকানা:</h4>
                        <Card className="p-4 shadow-sm space-y-2 text-sm bg-background/50 border">
                            <p><strong>নাম:</strong> {order.shippingAddress.name}</p>
                            <p><strong>ফোন:</strong> <a href={`tel:${order.shippingAddress.phone}`} className="text-primary hover:underline">{order.shippingAddress.phone}</a></p>
                            <p><strong>ঠিকানা:</strong> {order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.thana}, {order.shippingAddress.district}</p>
                            <p>{order.shippingAddress.division}</p>
                            {order.shippingAddress.notes && <p className="mt-2 pt-2 border-t text-xs"><strong>বিশেষ নির্দেশনা:</strong> {order.shippingAddress.notes}</p>}
                        </Card>
                    </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

