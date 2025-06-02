
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Loader2, ReceiptText, PackageSearch, ChevronDown } from "lucide-react";
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
  const [expandedOrderIds, setExpandedOrderIds] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const ordersCollectionRef = collection(db, "orders");
    const q = query(ordersCollectionRef, orderBy("orderDate", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => {
        const data = doc.data();
        let orderDateStr = data.orderDate;
        if (data.orderDate instanceof Timestamp) {
          orderDateStr = data.orderDate.toDate().toISOString();
        }
        return { 
          id: doc.id, 
          ...data,
          orderDate: orderDateStr,
        } as Order;
      });
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders: ", error);
      toast({ title: "ত্রুটি!", description: "অর্ডার আনতে সমস্যা হয়েছে।", variant: "destructive" });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      toast({ title: "সফল!", description: `অর্ডারের স্ট্যাটাস "${orderStatusMap[newStatus]}" করা হয়েছে।` });
    } catch (error) {
        console.error("Error updating order status: ", error);
        toast({ title: "ত্রুটি!", description: "অর্ডারের স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।", variant: "destructive" });
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrderIds(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
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
                <TableHead className="w-12 px-2"></TableHead> {/* For expander button */}
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
                <React.Fragment key={order.id}>
                  <TableRow className={cn(expandedOrderIds[order.id] && "bg-muted/10")}>
                    <TableCell className="px-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleOrderExpansion(order.id)} className="h-8 w-8">
                        <ChevronDown className={cn("h-4 w-4 transition-transform", expandedOrderIds[order.id] && "rotate-180")} />
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono">{order.orderNumber}</TableCell>
                    <TableCell>
                      <div>{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                    </TableCell>
                    <TableCell>{order.orderDate ? format(new Date(order.orderDate), 'dd MMM, yyyy, hh:mm a', { locale: bn }) : 'N/A'}</TableCell>
                    <TableCell className="text-right font-medium">{order.totalAmount.toLocaleString('bn-BD')}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={cn("border font-semibold text-xs px-1.5 py-0.5", orderStatusColors[order.status])}>
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
                  {expandedOrderIds[order.id] && (
                    <TableRow className="bg-muted/20 hover:bg-muted/30">
                      <TableCell colSpan={7} className="p-0">
                        <div className="p-4 space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-base mb-3">অর্ডারকৃত পণ্যসমূহ</h4>
                              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 rounded-md border bg-background p-3">
                                {order.items.length > 0 ? order.items.map((item, index) => (
                                  <Card key={index} className="flex items-start p-2.5 gap-3 shadow-sm">
                                    <Image
                                      src={item.imageUrl || "https://placehold.co/48x48.png"}
                                      alt={item.name}
                                      width={48}
                                      height={48}
                                      className="rounded-md object-cover mt-1 shrink-0 border"
                                      data-ai-hint="product item small"
                                    />
                                    <div className="flex-grow">
                                      <p className="font-medium leading-tight text-sm">{item.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        পরিমাণ: {item.quantity.toLocaleString('bn-BD')} | 
                                        একক মূল্য: ৳{item.price.toLocaleString('bn-BD')}
                                      </p>
                                    </div>
                                    <p className="text-sm font-semibold whitespace-nowrap">
                                      ৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                                    </p>
                                  </Card>
                                )) : (
                                  <p className="text-sm text-muted-foreground">এই অর্ডারে কোনো পণ্য পাওয়া যায়নি।</p>
                                )}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-base mb-3">ডেলিভারির ঠিকানা</h4>
                              <Card className="p-3.5 shadow-sm space-y-1.5 text-sm bg-background border">
                                <p><strong>নাম:</strong> {order.shippingAddress.name}</p>
                                <p><strong>ফোন:</strong> {order.shippingAddress.phone}</p>
                                <p><strong>ঠিকানা:</strong> {order.shippingAddress.address}</p>
                                <p><strong>থানা/উপজেলা:</strong> {order.shippingAddress.thana}</p>
                                <p><strong>জেলা:</strong> {order.shippingAddress.district}</p>
                                <p><strong>বিভাগ:</strong> {order.shippingAddress.division}</p>
                                {order.shippingAddress.notes && (
                                  <p className="mt-2 pt-2 border-t">
                                    <strong>বিশেষ নির্দেশনা:</strong> {order.shippingAddress.notes}
                                  </p>
                                )}
                              </Card>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
