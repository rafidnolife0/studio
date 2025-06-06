
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { divisions } from "@/lib/bangladesh-geo-data";
import type { District, Thana, Order, OrderItem } from "@/lib/types";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(3, { message: "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।" }),
  phone: z.string().regex(/^01[3-9]\d{8}$/, { message: "সঠিক ১১ সংখ্যার ফোন নম্বর দিন (01...)।" }),
  address: z.string().min(5, { message: "ঠিকানা কমপক্ষে ৫ অক্ষরের হতে হবে।" }),
  division: z.string().min(1, { message: "বিভাগ নির্বাচন করুন।" }),
  district: z.string().min(1, { message: "জেলা নির্বাচন করুন।" }),
  thana: z.string().min(1, { message: "থানা নির্বাচন করুন।" }),
  notes: z.string().optional(),
});

export default function CheckoutForm() {
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [thanas, setThanas] = useState<Thana[]>([]);
  const [loading, setLoading] = useState(false);

  const { cartItems, cartTotal, clearCart, itemCount } = useCart();
  const { currentUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", address: "", division: "", district: "", thana: "", notes: "" },
  });

  const handleDivisionChange = (divisionId: string) => {
    setSelectedDivisionId(divisionId);
    const selectedDiv = divisions.find(div => div.id === divisionId);
    setDistricts(selectedDiv ? selectedDiv.districts : []);
    form.setValue("district", "");
    form.setValue("thana", "");
    setThanas([]);
  };

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrictId(districtId);
    const selectedDist = districts.find(dist => dist.id === districtId);
    setThanas(selectedDist ? selectedDist.thanas : []);
    form.setValue("thana", "");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (itemCount === 0) {
        toast({ title: "ত্রুটি", description: "আপনার কার্ট খালি। অর্ডার করার জন্য পণ্য যোগ করুন।", variant: "destructive" });
        return;
    }
    if (!currentUser) {
        toast({ title: "ত্রুটি", description: "অর্ডার করার জন্য অনুগ্রহ করে লগইন করুন।", variant: "destructive" });
        router.push('/login?redirect=/checkout');
        return;
    }

    setLoading(true);

    const orderItems: OrderItem[] = cartItems.map(item => ({
      productId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      imageUrl: item.imageUrl || "",
    }));

    const divisionName = divisions.find(d => d.id === values.division)?.name || values.division;
    const districtName = districts.find(d => d.id === values.district)?.name || values.district;
    const thanaName = thanas.find(t => t.id === values.thana)?.name || values.thana;

    const orderData: Omit<Order, 'id'> = {
      orderNumber: `BS-${Date.now().toString().slice(-7)}`,
      userId: currentUser.uid,
      customerName: values.name,
      customerEmail: currentUser.email || 'N/A',
      items: orderItems,
      totalAmount: cartTotal,
      status: 'Pending',
      orderDate: serverTimestamp(),
      shippingAddress: {
        name: values.name,
        phone: values.phone,
        address: values.address,
        division: divisionName,
        district: districtName,
        thana: thanaName,
        notes: values.notes || "",
      },
      paymentMethod: 'Cash on Delivery', // Default or allow selection
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Order placed with ID: ", docRef.id);
      toast({ title: "সফল!", description: "আপনার অর্ডার সফলভাবে প্লেস করা হয়েছে।" });
      clearCart();
      router.push(`/order-success?orderId=${docRef.id}&orderNumber=${orderData.orderNumber}`);
    } catch (error) {
      console.error("Error placing order: ", error);
      toast({ title: "ত্রুটি!", description: "অর্ডার প্লেস করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>আপনার নাম</FormLabel>
              <FormControl><Input placeholder="সম্পূর্ণ নাম" {...field} defaultValue={currentUser?.displayName || ""} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ফোন নম্বর</FormLabel>
              <FormControl><Input placeholder="01XXXXXXXXX" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>সম্পূর্ণ ঠিকানা</FormLabel>
              <FormControl><Textarea placeholder="বাসা/হোল্ডিং, রোড, এলাকা" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
            control={form.control}
            name="division"
            render={({ field }) => (
                <FormItem>
                <FormLabel>বিভাগ</FormLabel>
                <Select onValueChange={(value) => { field.onChange(value); handleDivisionChange(value); }} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="বিভাগ নির্বাচন করুন" /></SelectTrigger></FormControl>
                    <SelectContent>
                    {divisions.map(div => <SelectItem key={div.id} value={div.id}>{div.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
                <FormItem>
                <FormLabel>জেলা</FormLabel>
                <Select onValueChange={(value) => { field.onChange(value); handleDistrictChange(value); }} defaultValue={field.value} disabled={!selectedDivisionId || districts.length === 0}>
                    <FormControl><SelectTrigger><SelectValue placeholder="জেলা নির্বাচন করুন" /></SelectTrigger></FormControl>
                    <SelectContent>
                    {districts.map(dist => <SelectItem key={dist.id} value={dist.id}>{dist.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="thana"
            render={({ field }) => (
                <FormItem>
                <FormLabel>থানা/উপজেলা</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedDistrictId || thanas.length === 0}>
                    <FormControl><SelectTrigger><SelectValue placeholder="থানা নির্বাচন করুন" /></SelectTrigger></FormControl>
                    <SelectContent>
                    {thanas.map(th => <SelectItem key={th.id} value={th.id}>{th.name}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিশেষ নির্দেশনা (ঐচ্ছিক)</FormLabel>
              <FormControl><Textarea placeholder="ডেলিভারি সংক্রান্ত কোনো বিশেষ নির্দেশনা থাকলে লিখুন" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" size="lg" disabled={loading || itemCount === 0}>
          {loading ? "অর্ডার করা হচ্ছে..." : `অর্ডার কনফার্ম করুন (৳${cartTotal.toLocaleString('bn-BD')})`}
        </Button>
      </form>
    </Form>
  );
}

