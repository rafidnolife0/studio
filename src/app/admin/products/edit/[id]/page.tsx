"use client";

import ProductForm from "@/components/products/ProductForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/lib/types";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const productDocRef = doc(db, "products", productId);
          const productDocSnap = await getDoc(productDocRef);
          if (productDocSnap.exists()) {
            setProduct({ id: productDocSnap.id, ...productDocSnap.data() } as Product);
          } else {
            toast({ title: "ত্রুটি!", description: "পণ্যটি খুঁজে পাওয়া যায়নি।", variant: "destructive" });
            router.push("/admin/products");
          }
        } catch (error) {
          console.error("Error fetching product for edit: ", error);
          toast({ title: "ত্রুটি!", description: "পণ্যটি আনতে সমস্যা হয়েছে।", variant: "destructive" });
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, router, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-3 text-lg">পণ্যের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    // This case should ideally be handled by the redirect in useEffect, but as a fallback:
    return (
        <div className="text-center py-10">
            <h1 className="text-xl">পণ্যটি খুঁজে পাওয়া যায়নি।</h1>
            <Link href="/admin/products" className="text-primary hover:underline mt-4 inline-block">
                পণ্য তালিকায় ফিরে যান
            </Link>
        </div>
    );
  }

  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        পণ্য তালিকায় ফিরে যান
      </Link>
      <Card className="shadow-xl max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">পণ্য সম্পাদনা করুন</CardTitle>
          <CardDescription>"{product.name}" পণ্যের তথ্য আপডেট করুন।</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm initialData={product} />
        </CardContent>
      </Card>
    </div>
  );
}
