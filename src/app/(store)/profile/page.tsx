
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import type { Order, OrderItem } from '@/lib/types';
import { Loader2, PackageSearch, UserCircle, ShoppingBag, MapPin, Edit3, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const orderStatusMap: Record<Order['status'], string> = {
  Pending: 'অপেক্ষারত',
  Processing: 'প্রসেসিং চলছে',
  Shipped: 'শিপড',
  Delivered: 'ডেলিভারি হয়েছে',
  Cancelled: 'বাতিল হয়েছে',
};

const getStatusBadgeVariant = (status: Order['status']) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-500/80 hover:bg-yellow-500 text-white';
    case 'Processing': return 'bg-blue-500/80 hover:bg-blue-500 text-white';
    case 'Shipped': return 'bg-indigo-500/80 hover:bg-indigo-500 text-white';
    case 'Delivered': return 'bg-green-500/80 hover:bg-green-500 text-white';
    case 'Cancelled': return 'bg-red-500/80 hover:bg-red-500 text-white';
    default: return 'secondary';
  }
};


export default function ProfilePage() {
  const { currentUser, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

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
        setLoadingOrders(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  if (authLoading || (!currentUser && !authLoading)) { // Show loader if auth is loading or if user is null but auth isn't done loading
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">আপনার তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }
  
  if (!currentUser) { // Should be caught by useEffect redirect, but as a fallback
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-headline font-semibold mb-4">অনুগ্রহ করে লগইন করুন</h1>
        <p className="text-muted-foreground mb-8">আপনার প্রোফাইল দেখতে লগইন করতে হবে।</p>
        <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/login?redirect=/profile">লগইন পৃষ্ঠায় যান</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <UserCircle className="h-12 w-12 text-primary" />
            <div>
              <CardTitle className="text-2xl font-headline">{currentUser.displayName || 'ব্যবহারকারী'}</CardTitle>
              <CardDescription>{currentUser.email}</CardDescription>
            </div>
          </div>
          <Button variant="outline" onClick={logout} size="sm">
            <LogOut className="mr-2 h-4 w-4" /> লগআউট
          </Button>
        </CardHeader>
        {/* <CardContent className="grid md:grid-cols-2 gap-4 pt-4">
          <Button variant="ghost" className="justify-start"><Edit3 className="mr-2 h-4 w-4" /> প্রোফাইল সম্পাদনা করুন</Button>
          <Button variant="ghost" className="justify-start"><MapPin className="mr-2 h-4 w-4" /> ঠিকানা পরিচালনা করুন</Button>
        </CardContent> */}
      </Card>

      <h2 className="text-2xl font-headline font-bold mb-6 text-primary flex items-center">
        <ShoppingBag className="mr-3 h-7 w-7" />
        আপনার অর্ডারসমূহ
      </h2>

      {loadingOrders ? (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">আপনার অর্ডারগুলো লোড হচ্ছে...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg shadow-md p-8">
          <PackageSearch className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
          <h3 className="text-xl font-semibold mb-3">এখনও কোনো অর্ডার করেননি!</h3>
          <p className="text-muted-foreground mb-6">আপনার পছন্দের পণ্যগুলো খুঁজে দেখুন এবং অর্ডার করুন।</p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">কেনাকাটা শুরু করুন</Link>
          </Button>
        </div>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {orders.map((order) => (
            <AccordionItem value={order.id} key={order.id} className="bg-card border border-border rounded-lg shadow-md overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-center w-full">
                  <div className="text-left">
                    <p className="font-mono text-sm text-primary">অর্ডার নং: {order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.orderDate ? format(new Date(order.orderDate), 'dd MMMM, yyyy, hh:mm a', { locale: bn }) : 'N/A'}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                     <Badge variant="outline" className={`text-xs font-semibold ${getStatusBadgeVariant(order.status)}`}>
                        {orderStatusMap[order.status]}
                     </Badge>
                    <p className="text-lg font-semibold mt-1">৳{order.totalAmount.toLocaleString('bn-BD')}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <div className="border-t pt-4 mt-2">
                  <h4 className="font-semibold mb-3 text-md">অর্ডারকৃত পণ্যসমূহ:</h4>
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                    {order.items.map((item: OrderItem, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-2.5 rounded-md border bg-background shadow-sm">
                        <Image
                          src={item.imageUrl || "https://placehold.co/64x64.png"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded object-cover border"
                          data-ai-hint="ordered product"
                        />
                        <div className="flex-grow">
                          <p className="font-medium text-sm leading-tight">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            পরিমাণ: {item.quantity.toLocaleString('bn-BD')} | 
                            একক মূল্য: ৳{item.price.toLocaleString('bn-BD')}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">৳{(item.price * item.quantity).toLocaleString('bn-BD')}</p>
                      </div>
                    ))}
                  </div>
                  <h4 className="font-semibold mb-2 text-md">ডেলিভারির ঠিকানা:</h4>
                  <div className="text-sm p-3 rounded-md border bg-background shadow-sm space-y-1">
                    <p><strong>নাম:</strong> {order.shippingAddress.name}</p>
                    <p><strong>ফোন:</strong> {order.shippingAddress.phone}</p>
                    <p><strong>ঠিকানা:</strong> {order.shippingAddress.address}, {order.shippingAddress.thana}, {order.shippingAddress.district}, {order.shippingAddress.division}</p>
                    {order.shippingAddress.notes && <p><strong>বিশেষ নির্দেশনা:</strong> {order.shippingAddress.notes}</p>}
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

    