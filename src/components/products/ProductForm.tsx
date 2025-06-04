
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
import type { Product } from "@/lib/types";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductFormProps {
  initialData?: Product | null;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "পণ্যের নাম কমপক্ষে ৩ অক্ষরের হতে হবে।" }),
  description: z.string().min(10, { message: "পণ্যের বিবরণ কমপক্ষে ১০ অক্ষরের হতে হবে।" }),
  price: z.coerce.number().min(0, { message: "মূল্য ০ বা তার বেশি হতে হবে।" }),
  stockQuantity: z.coerce.number().min(0, {message: "স্টকের পরিমাণ ০ বা তার বেশি হতে হবে।"}).optional(),
  category: z.string().optional(),
  imageUrl: z.string().url({ message: "সঠিক ছবির URL প্রদান করুন।" }).or(z.literal("")).optional(), // Accepts valid URL or empty string
  dataAihint: z.string().optional(),
});

export default function ProductForm({ initialData }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      stockQuantity: initialData?.stockQuantity || 0,
      category: initialData?.category || "",
      imageUrl: initialData?.imageUrl || "",
      dataAihint: initialData?.dataAihint || "",
    },
  });
  
  useEffect(() => {
    if (initialData) {
        form.reset({
            name: initialData.name,
            description: initialData.description,
            price: initialData.price,
            stockQuantity: initialData.stockQuantity || 0,
            category: initialData.category || "",
            imageUrl: initialData.imageUrl || "",
            dataAihint: initialData.dataAihint || "",
        });
        setImagePreview(initialData.imageUrl);
    }
  }, [initialData, form]);

  // Watch imageUrl field for live preview
  const watchedImageUrl = form.watch("imageUrl");
  useEffect(() => {
    if (watchedImageUrl && watchedImageUrl.startsWith('http')) {
      setImagePreview(watchedImageUrl);
    } else if (!watchedImageUrl && initialData?.imageUrl) {
        setImagePreview(initialData.imageUrl);
    } else if (!watchedImageUrl) {
        setImagePreview(null);
    }
  }, [watchedImageUrl, initialData?.imageUrl]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    if (!values.imageUrl && !initialData?.imageUrl) {
        toast({ title: "ত্রুটি!", description: "অনুগ্রহ করে পণ্যের ছবির একটি URL দিন অথবা নিশ্চিত করুন আগে থেকে একটি ছবি আছে।", variant: "destructive" });
        setLoading(false);
        return;
    }
    
    const productData: Partial<Product> & {updatedAt: Timestamp, createdAt?: Timestamp} = {
      name: values.name,
      description: values.description,
      price: values.price,
      stockQuantity: values.stockQuantity || 0,
      category: values.category || "",
      imageUrl: values.imageUrl || initialData?.imageUrl || "https://placehold.co/400x400.png", // Fallback placeholder
      dataAihint: values.dataAihint || "product item",
      updatedAt: serverTimestamp() as Timestamp,
    };

    try {
      if (initialData?.id) {
        const productRef = doc(db, "products", initialData.id);
        await updateDoc(productRef, productData);
        toast({ title: "সফল!", description: "পণ্য সফলভাবে আপডেট করা হয়েছে।" });
      } else {
        productData.createdAt = serverTimestamp() as Timestamp;
        await addDoc(collection(db, "products"), productData);
        toast({ title: "সফল!", description: "পণ্য সফলভাবে যোগ করা হয়েছে।" });
      }
      router.push("/admin/products");
      router.refresh(); 
    } catch (error: any) {
      console.error("Error saving product to Firestore:", error);
      let firebaseErrorCode = error.code || 'N/A';
      let firebaseErrorMessage = error.message || 'অজানা ত্রুটি';
      toast({ 
        title: "Firestore ত্রুটি!", 
        description: `পণ্য সংরক্ষণ করতে সমস্যা হয়েছে: ${firebaseErrorMessage} (Code: ${firebaseErrorCode})`, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পণ্যের নাম (বাংলায়)</FormLabel>
              <FormControl><Input placeholder="যেমনঃ সুতির পাঞ্জাবি" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পণ্যের বিবরণ (বাংলায়)</FormLabel>
              <FormControl><Textarea placeholder="পণ্যের বিস্তারিত বিবরণ লিখুন..." {...field} rows={5} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-3 gap-6">
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>মূল্য (৳)</FormLabel>
                <FormControl><Input type="number" step="any" placeholder="যেমনঃ ১২০০" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
                <FormItem>
                <FormLabel>স্টকের পরিমাণ</FormLabel>
                <FormControl><Input type="number" placeholder="যেমনঃ ৫০" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>ক্যাটাগরি (বাংলায়, ঐচ্ছিক)</FormLabel>
                <FormControl><Input placeholder="যেমনঃ পোশাক" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>পণ্যের ছবির URL</FormLabel>
              <FormControl><Input placeholder="https://example.com/image.jpg" {...field} /></FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">আপনার পণ্যের ছবির একটি সরাসরি URL দিন।</p>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="dataAihint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ছবির জন্য AI Hint (ঐচ্ছিক, ইংরেজি, ১-২ শব্দ)</FormLabel>
              <FormControl><Input placeholder="যেমন: product fashion" {...field} /></FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">প্লেসহোল্ডার ছবির জন্য Unsplash থেকে ছবি খুঁজতে এটি ব্যবহৃত হতে পারে। যেমনঃ `tshirt fashion`</p>
            </FormItem>
          )}
        />
        
        {imagePreview && (
          <div className="w-48 h-48 relative border rounded-md overflow-hidden">
            <Image 
                src={imagePreview} 
                alt="পণ্যের ছবি প্রিভিউ" 
                layout="fill" 
                objectFit="cover" 
                data-ai-hint="product preview"
                onError={() => {
                    // If URL is invalid or image fails to load, clear preview or show placeholder icon
                    setImagePreview("https://placehold.co/400x400.png?text=Invalid+URL"); 
                }}
            />
          </div>
        )}

        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? (initialData ? "আপডেট হচ্ছে..." : "যোগ করা হচ্ছে...") : (initialData ? "পণ্য আপডেট করুন" : "পণ্য যোগ করুন")}
        </Button>
      </form>
    </Form>
  );
}

