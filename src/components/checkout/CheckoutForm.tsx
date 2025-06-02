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
import type { District, Thana } from "@/lib/types";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

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

  const { cartTotal, clearCart, itemCount } = useCart();
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
    setLoading(true);
    console.log("Checkout Data:", { ...values, totalAmount: cartTotal });
    // Here, you would typically send this data to your backend (e.g., Firebase Functions)
    // to create an order in Firestore, process payment, etc.
    // For this scaffold, we'll simulate success.
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    
    toast({ title: "সফল!", description: "আপনার অর্ডার সফলভাবে প্লেস করা হয়েছে।" });
    clearCart();
    router.push("/order-success"); // Redirect to an order success page (to be created)
    setLoading(false);
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
              <FormControl><Input placeholder="সম্পূর্ণ নাম" {...field} /></FormControl>
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
