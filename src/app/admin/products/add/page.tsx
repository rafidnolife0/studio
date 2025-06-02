import ProductForm from "@/components/products/ProductForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AddProductPage() {
  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        পণ্য তালিকায় ফিরে যান
      </Link>
      <Card className="shadow-xl max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">নতুন পণ্য যোগ করুন</CardTitle>
          <CardDescription>পণ্যের সকল তথ্য সঠিকভাবে পূরণ করুন।</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
