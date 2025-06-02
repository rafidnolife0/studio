
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ReceiptText, PackageSearch } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { format } from 'date-fns';
import { bn } from 'date-fns/locale'; // For Bengali date formatting

// Mock data - replace with API call to Firebase Firestore
const mockOrdersData: Order[] = [
  {
    id: 'order1', orderNumber: 'BS-74321', userId: 'userA', customerName: 'মোঃ আরিফ হোসেন', customerEmail: 'arif@example.com',
    items: [{ productId: '1', name: 'সুতির পাঞ্জাবি', quantity: 1, price: 1200, imageUrl: 'https://placehold.co/50x50.png' }],
    totalAmount: 1200, status: 'Pending', orderDate: new Date(2024, 4, 15, 10, 30).toISOString(),
    shippingAddress: { name: 'মোঃ আরিফ হোসেন', phone: '01711111111', address: 'বাড়ি ১২, রোড ৩, ধানমন্ডি', division: 'ঢাকা', district: 'ঢাকা', thana: 'ধানমন্ডি' },
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'order2', orderNumber: 'BS-74322', userId: 'userB', customerName: 'ফারজানা ইসলাম', customerEmail: 'farzana@example.com',
    items: [
        { productId: '2', name: 'জামদানি শাড়ি', quantity: 1, price: 5500, imageUrl: 'https://placehold.co/50x50.png' },
        { productId: '5', name: 'রূপার গহনা সেট', quantity: 1, price: 3500, imageUrl: 'https://placehold.co/50x50.png' }
    ],
    totalAmount: 9000, status: 'Processing', orderDate: new Date(2024, 4, 16, 14, 0).toISOString(),
    shippingAddress: { name: 'ফারজানা ইসলাম', phone: '01822222222', address: 'ফ্ল্যাট ৫বি, বনানী', division: 'ঢাকা', district: 'ঢাকা', thana: 'বনানী' },
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'order3', orderNumber: 'BS-74323', userId: 'userC', customerName: 'সাকিব আল হাসান', customerEmail: 'sakib@example.com',
    items: [{ productId: '3', name: 'চórz বাংলা টি-শার্ট', quantity: 2, price: 450, imageUrl: 'https://placehold.co/50x50.png' }],
    totalAmount: 900, status: 'Shipped', orderDate: new Date(2024, 4, 14, 9, 15).toISOString(),
    shippingAddress: { name: 'সাকিব আল হাসান', phone: '01933333333', address: 'মিরপুর ডিওএইচএস', division: 'ঢাকা', district: 'ঢাকা', thana: 'মিরপুর' },
    paymentMethod: 'Online Payment', transactionId: 'txn_123abc'
  },
    {
    id: 'order4', orderNumber: 'BS-74324', userId: 'userD', customerName: 'নুসরাত জাহান', customerEmail: 'nusrat@example.com',
    items: [{ productId: '4', name: 'নকশি কাঁথা', quantity: 1, price: 2200, imageUrl: 'https://placehold.co/50x50.png' }],
    totalAmount: 2200, status: 'Delivered', orderDate: new Date(2024, 4, 10, 17, 45).toISOString(),
    shippingAddress: { name: 'নুসরাত জাহান', phone: '01544444444', address: 'বাসা ১০, সেক্টর ৭, উত্তরা', division: 'ঢাকা', district: 'ঢাকা', thana: 'উত্তরা পশ্চিম' },
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'order5', orderNumber: 'BS-74325', userId: 'userE', customerName: 'তামিম ইকবাল', customerEmail: 'tamim@example.com',
    items: [{ productId: '6', name: 'চামড়ার স্যান্ডেল', quantity: 1, price: 900, imageUrl: 'https://placehold.co/50x50.png' }],
    totalAmount: 900, status: 'Cancelled', orderDate: new Date(2024, 4, 12, 11, 20).toISOString(),
    shippingAddress: { name: 'তামিম ইকবাল', phone: '01655555555', address: 'বাসা ৫, রোড ২, গুলশান', division: 'ঢাকা', district: 'ঢাকা', thana: 'গুলশান' },
    paymentMethod: 'Cash on Delivery'
  },
];

const orderStatusMap: Record<OrderStatus, string> = {
  Pending: 'অপেক্ষারত',
  Processing: 'প্রসেসিং চলছে',
  Shipped: 'শিপড',
  Delivered: 'ডেলিভারি হয়েছে',
  Cancelled: 'বাতিল হয়েছে',
};

const orderStatusColors: Record<OrderStatus, string> = {
  Pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/50',
  Processing: 'bg-blue-500/20 text-blue-700 border-blue-500/50',
  Shipped: 'bg-indigo-500/20 text-indigo-700 border-indigo-500/50',
  Delivered: 'bg-green-500/20 text-green-700 border-green-500/50',
  Cancelled: 'bg-red-500/20 text-red-700 border-red-500/50',
};


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    setTimeout(() => {
      setOrders(mockOrdersData);
      setLoading(false);
    }, 1000);
    // In a real app, fetch orders from Firebase:
    // const fetchOrders = async () => {
    //   const ordersCollectionRef = collection(db, "orders");
    //   const q = query(ordersCollectionRef, orderBy("orderDate", "desc"));
    //   const unsubscribe = onSnapshot(q, (snapshot) => {
    //     const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    //     setOrders(ordersData);
    //     setLoading(false);
    //   }, (error) => {
    //     console.error("Error fetching orders: ", error);
    //     toast({ title: "ত্রুটি!", description: "অর্ডার আনতে সমস্যা হয়েছে।", variant: "destructive" });
    //     setLoading(false);
    //   });
    //   return unsubscribe;
    // };
    // fetchOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    // In a real app, update status in Firebase:
    // const orderRef = doc(db, "orders", orderId);
    // await updateDoc(orderRef, { status: newStatus });
    // toast({ title: "সফল!", description: `অর্ডারের স্ট্যাটাস "${orderStatusMap[newStatus]}" করা হয়েছে।` });
    console.log(`Order ${orderId} status changed to ${newStatus}`);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ReceiptText className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">অর্ডারসমূহ</CardTitle>
            <CardDescription>সকল অর্ডার এবং তাদের বর্তমান অবস্থা দেখুন ও পরিচালনা করুন।</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">অর্ডার লোড হচ্ছে...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">
            <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg">এখনও কোনো অর্ডার পাওয়া যায়নি।</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>অর্ডার আইডি</TableHead>
                <TableHead>ক্রেতা</TableHead>
                <TableHead>তারিখ</TableHead>
                <TableHead className="text-right">মোট টাকা (৳)</TableHead>
                <TableHead className="text-center">স্ট্যাটাস</TableHead>
                <TableHead className="text-center">স্ট্যাটাস পরিবর্তন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>{order.customerName}</div>
                    <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                  </TableCell>
                  <TableCell>{format(new Date(order.orderDate), 'dd MMM, yyyy, hh:mm a', { locale: bn })}</TableCell>
                  <TableCell className="text-right font-medium">{order.totalAmount.toLocaleString('bn-BD')}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={cn("border font-semibold", orderStatusColors[order.status])}>
                      {orderStatusMap[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                    >
                        <SelectTrigger className="w-[150px] h-9 mx-auto">
                            <SelectValue placeholder="স্ট্যাটাস" />
                        </SelectTrigger>
                        <SelectContent>
                        {(Object.keys(orderStatusMap) as OrderStatus[]).map(statusKey => (
                            <SelectItem key={statusKey} value={statusKey}>
                            {orderStatusMap[statusKey]}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
