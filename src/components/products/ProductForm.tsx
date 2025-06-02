
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
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

interface ProductFormProps {
  initialData?: Product | null;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "পণ্যের নাম কমপক্ষে ৩ অক্ষরের হতে হবে।" }),
  description: z.string().min(10, { message: "পণ্যের বিবরণ কমপক্ষে ১০ অক্ষরের হতে হবে।" }),
  price: z.coerce.number().min(0, { message: "মূল্য ০ বা তার বেশি হতে হবে।" }),
  category: z.string().optional(),
  image: z.any().optional(),
  dataAihint: z.string().optional(),
});

export default function ProductForm({ initialData }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || "",
      image: undefined,
      dataAihint: initialData?.dataAihint || "",
    },
  });
  
  useEffect(() => {
    if (initialData) {
        form.reset({
            name: initialData.name,
            description: initialData.description,
            price: initialData.price,
            category: initialData.category || "",
            image: undefined, 
            dataAihint: initialData.dataAihint || "",
        });
        setImagePreview(initialData.imageUrl);
    }
  }, [initialData, form]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("image", file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setUploadProgress(null);

    let imageUrl = initialData?.imageUrl || "";

    if (values.image && values.image instanceof File) {
      const file = values.image;
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Upload failed:", error);
              toast({ title: "ত্রুটি!", description: `ছবি আপলোড ব্যর্থ হয়েছে: ${error.message} (Code: ${error.code})`, variant: "destructive" });
              setLoading(false);
              reject(error);
            },
            async () => {
              try {
                imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve();
              } catch (getUrlError: any) {
                console.error("Getting download URL failed:", getUrlError);
                toast({ title: "ত্রুটি!", description: `ছবি URL পেতে সমস্যা: ${getUrlError.message} (Code: ${getUrlError.code})`, variant: "destructive" });
                setLoading(false);
                reject(getUrlError);
              }
            }
          );
        });
      } catch (uploadError) {
        // Error is already toasted and logged from the promise reject/catch
        return; // Stop execution if upload failed
      }
    } else if (!initialData && !values.image) { 
        toast({ title: "ত্রুটি!", description: "নতুন পণ্যের জন্য অনুগ্রহ করে একটি ছবি নির্বাচন করুন।", variant: "destructive" });
        setLoading(false);
        return;
    }


    const productData: Partial<Product> & {updatedAt: Timestamp, createdAt?: Timestamp} = {
      name: values.name,
      description: values.description,
      price: values.price,
      category: values.category || "",
      imageUrl: imageUrl,
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
      toast({ 
        title: "Firestore ত্রুটি!", 
        description: `পণ্য সংরক্ষণ করতে সমস্যা হয়েছে: ${error.message} (Code: ${error.code || 'N/A'})`, 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
      setUploadProgress(null);
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
        <div className="grid md:grid-cols-2 gap-6">
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => ( 
            <FormItem>
              <FormLabel>পণ্যের ছবি</FormLabel>
              <FormControl>
                <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {imagePreview && (
          <div className="w-48 h-48 relative border rounded-md overflow-hidden">
            <Image src={imagePreview} alt="পণ্যের ছবি প্রিভিউ" layout="fill" objectFit="cover" data-ai-hint="product preview"/>
          </div>
        )}
        {uploadProgress !== null && (
            <div className="space-y-1">
                <p className="text-sm">আপলোড হচ্ছে: {Math.round(uploadProgress)}%</p>
                <Progress value={uploadProgress} className="w-full h-2" />
            </div>
        )}

        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? (initialData ? "আপডেট হচ্ছে..." : "যোগ করা হচ্ছে...") : (initialData ? "পণ্য আপডেট করুন" : "পণ্য যোগ করুন")}
        </Button>
      </form>
    </Form>
  );
}

    