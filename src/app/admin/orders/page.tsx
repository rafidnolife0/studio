
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ReceiptText, PackageSearch } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const ordersCollectionRef = collection(db, "orders");
    const q = query(ordersCollectionRef, orderBy("orderDate", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamp to Date object then to ISO string if it's a Timestamp
        let orderDateStr = data.orderDate;
        if (data.orderDate instanceof Timestamp) {
          orderDateStr = data.orderDate.toDate().toISOString();
        }
        return { 
          id: doc.id, 
          ...data,
          orderDate: orderDateStr, // Ensure orderDate is a string
        } as Order;
      });
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders: ", error);
      toast({ title: "ত্রুটি!", description: "অর্ডার আনতে সমস্যা হয়েছে।", variant: "destructive" });
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [toast]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      toast({ title: "সফল!", description: `অর্ডারের স্ট্যাটাস "${orderStatusMap[newStatus]}" করা হয়েছে।` });
      // Real-time listener will update the local state automatically
    } catch (error) {
        console.error("Error updating order status: ", error);
        toast({ title: "ত্রুটি!", description: "অর্ডারের স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।", variant: "destructive" });
    }
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
                  <TableCell>{order.orderDate ? format(new Date(order.orderDate), 'dd MMM, yyyy, hh:mm a', { locale: bn }) : 'N/A'}</TableCell>
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
