
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Loader2, ReceiptText, PackageSearch, ChevronDown, ShoppingBag, User, Phone, HomeIcon, MapPin } from "lucide-react";
import type { Order, OrderStatus, OrderItem } from "@/lib/types";
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

const getStatusBadgeVariant = (status: Order['status']) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200';
    case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200';
    case 'Shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200';
    case 'Delivered': return 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200';
    case 'Cancelled': return 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
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
    <Card className="shadow-xl border-none">
      <CardHeader className="bg-card rounded-t-lg">
        <div className="flex items-center gap-3">
          <ReceiptText className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">অর্ডারসমূহ</CardTitle>
            <CardDescription>সকল অর্ডার এবং তাদের বর্তমান অবস্থা দেখুন ও পরিচালনা করুন।</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-lg">অর্ডার লোড হচ্ছে...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 px-6">
            <PackageSearch className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="mt-4 text-xl font-semibold text-muted-foreground">এখনও কোনো অর্ডার পাওয়া যায়নি।</p>
            <p className="text-sm text-muted-foreground">নতুন অর্ডার আসলে এখানে দেখা যাবে।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12 px-2"></TableHead> {/* For expander button */}
                  <TableHead>অর্ডার আইডি</TableHead>
                  <TableHead>ক্রেতা</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead className="text-right">মোট টাকা (৳)</TableHead>
                  <TableHead className="text-center">স্ট্যাটাস</TableHead>
                  <TableHead className="text-center w-[180px]">স্ট্যাটাস পরিবর্তন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow className={cn("hover:bg-muted/30", expandedOrderIds[order.id] && "bg-muted/20")}>
                      <TableCell className="px-2">
                        <Button variant="ghost" size="icon" onClick={() => toggleOrderExpansion(order.id)} className="h-8 w-8 hover:bg-primary/10">
                          <ChevronDown className={cn("h-5 w-5 text-primary transition-transform", expandedOrderIds[order.id] && "rotate-180")} />
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-primary hover:underline cursor-pointer" onClick={() => toggleOrderExpansion(order.id)}>{order.orderNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                      </TableCell>
                      <TableCell className="text-xs">
                        {order.orderDate ? format(new Date(order.orderDate), 'dd MMM, yyyy', { locale: bn }) : 'N/A'}
                        <br/>
                        <span className="text-muted-foreground">{order.orderDate ? format(new Date(order.orderDate), 'hh:mm a', { locale: bn }) : ''}</span>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-md">৳{order.totalAmount.toLocaleString('bn-BD')}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={cn("border font-semibold text-xs px-2 py-1 rounded-full", getStatusBadgeVariant(order.status))}>
                          {orderStatusMap[order.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                        >
                            <SelectTrigger className="w-full md:w-[160px] h-9 mx-auto text-xs">
                                <SelectValue placeholder="স্ট্যাটাস" />
                            </SelectTrigger>
                            <SelectContent>
                            {(Object.keys(orderStatusMap) as OrderStatus[]).map(statusKey => (
                                <SelectItem key={statusKey} value={statusKey} className="text-xs">
                                {orderStatusMap[statusKey]}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                    {expandedOrderIds[order.id] && (
                      <TableRow className="bg-background hover:bg-background">
                        <TableCell colSpan={7} className="p-0">
                          <div className="p-4 md:p-6 space-y-6 border-t-2 border-primary/20">
                            <div className="grid md:grid-cols-5 gap-6">
                              <div className="md:col-span-3">
                                <h4 className="font-headline text-lg mb-3 flex items-center"><ShoppingBag className="w-5 h-5 mr-2 text-primary"/>অর্ডারকৃত পণ্যসমূহ</h4>
                                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 rounded-md border bg-muted/30 p-3">
                                  {order.items.length > 0 ? order.items.map((item: OrderItem, index: number) => (
                                    <Card key={index} className="flex items-start p-3 gap-3 shadow-sm bg-card">
                                      <Image
                                        src={item.imageUrl || "https://placehold.co/64x64.png"}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="rounded-md object-cover border shrink-0"
                                        data-ai-hint="ordered product item"
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
                                  )) : (
                                    <p className="text-sm text-muted-foreground py-4 text-center">এই অর্ডারে কোনো পণ্য পাওয়া যায়নি।</p>
                                  )}
                                </div>
                              </div>
                              <div className="md:col-span-2">
                                <h4 className="font-headline text-lg mb-3 flex items-center"><MapPin className="w-5 h-5 mr-2 text-primary"/>ডেলিভারির ঠিকানা</h4>
                                <Card className="p-4 shadow-sm space-y-2 text-sm bg-muted/30 border">
                                  <div className="flex items-center"><User className="w-4 h-4 mr-2 text-muted-foreground"/><strong>{order.shippingAddress.name}</strong></div>
                                  <div className="flex items-center"><Phone className="w-4 h-4 mr-2 text-muted-foreground"/><a href={`tel:${order.shippingAddress.phone}`} className="hover:underline">{order.shippingAddress.phone}</a></div>
                                  <div className="flex items-start"><HomeIcon className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground shrink-0"/>
                                    <div>
                                      {order.shippingAddress.address}, <br/>
                                      {order.shippingAddress.thana}, {order.shippingAddress.district}, <br/>
                                      {order.shippingAddress.division}
                                    </div>
                                  </div>
                                  {order.shippingAddress.notes && (
                                    <p className="mt-2 pt-2 border-t border-border text-xs">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}

