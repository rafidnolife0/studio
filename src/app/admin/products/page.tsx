
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import { PlusCircle, Edit, Trash2, Loader2, Package, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, QuerySnapshot, DocumentData, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const productsCollectionRef = collection(db, "products");
    
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const productsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
          updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
        } as Product;
      });
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products: ", error);
      toast({ title: "ত্রুটি!", description: "পণ্য আনতে সমস্যা হয়েছে।", variant: "destructive" });
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [toast]);

  const handleDeleteProduct = async (productId: string) => {
    setDeletingId(productId);
    try {
      await deleteDoc(doc(db, "products", productId));
      toast({ title: "সফল!", description: "পণ্য সফলভাবে মুছে ফেলা হয়েছে।" });
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast({ title: "ত্রুটি!", description: "পণ্য মুছতে সমস্যা হয়েছে।", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string | Timestamp | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString.toDate();
      return format(date, 'dd MMM, yy hh:mm a', { locale: bn });
    } catch (e) {
      return 'অবৈধ তারিখ';
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Package className="mr-2 h-7 w-7 text-primary"/> পণ্য তালিকা
          </CardTitle>
          <CardDescription>এখানে সকল পণ্য দেখুন, যোগ করুন, সম্পাদনা করুন অথবা মুছুন।</CardDescription>
        </div>
        <Link href="/admin/products/add">
          <Button className="bg-primary hover:bg-primary/90 w-full md:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" /> নতুন পণ্য যোগ করুন
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="ml-3 text-lg">পণ্য লোড হচ্ছে...</p>
          </div>
        ) : products.length === 0 ? (
           <div className="text-center py-16 px-6">
             <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
             <p className="mt-4 text-xl font-semibold text-muted-foreground">এখনও কোনো পণ্য যোগ করা হয়নি।</p>
             <Link href="/admin/products/add" className="mt-2 inline-block text-primary hover:underline">
                প্রথম পণ্য যোগ করুন
             </Link>
           </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[60px] px-2">ছবি</TableHead>
                  <TableHead>নাম</TableHead>
                  <TableHead>ক্যাটাগরি</TableHead>
                  <TableHead className="text-right">মূল্য (৳)</TableHead>
                  <TableHead className="text-center">স্টক</TableHead>
                  <TableHead className="hidden md:table-cell">তৈরি</TableHead>
                  <TableHead className="hidden lg:table-cell">আপডেট</TableHead>
                  <TableHead className="text-center w-[100px]">ক্রিয়াকলাপ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/30">
                    <TableCell className="px-2 py-2">
                      <div className="w-12 h-12 relative rounded-md overflow-hidden border">
                        <Image src={product.imageUrl || "https://placehold.co/50x50.png"} alt={product.name} layout="fill" objectFit="cover" data-ai-hint="product item thumbnail"/>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium py-2">{product.name}</TableCell>
                    <TableCell className="py-2"><Badge variant="secondary" className="text-xs">{product.category || 'N/A'}</Badge></TableCell>
                    <TableCell className="text-right py-2">{product.price.toLocaleString('bn-BD')}</TableCell>
                    <TableCell className="text-center py-2">
                        {typeof product.stockQuantity === 'number' ? product.stockQuantity.toLocaleString('bn-BD') : <Badge variant="outline" className="text-xs">N/A</Badge>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden md:table-cell py-2">{formatDate(product.createdAt)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden lg:table-cell py-2">{formatDate(product.updatedAt)}</TableCell>
                    <TableCell className="text-center py-2">
                      <div className="flex justify-center space-x-1.5">
                        <Link href={`/admin/products/edit/${product.id}`}>
                          <Button variant="outline" size="icon" className="h-8 w-8 hover:text-primary hover:border-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                             <Button variant="outline" size="icon" className="h-8 w-8 hover:text-destructive hover:border-destructive" disabled={deletingId === product.id}>
                               {deletingId === product.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                             </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
                              <AlertDialogDescription>
                                এই পণ্যটি মুছে ফেলা হলে তা আর পুনরুদ্ধার করা যাবে না। আপনি কি "{product.name}" পণ্যটি মুছতে চান?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>বাতিল করুন</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProduct(product.id)} className="bg-destructive hover:bg-destructive/90">
                                হ্যাঁ, মুছুন
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

