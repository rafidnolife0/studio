"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import { PlusCircle, Edit, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const productsCollectionRef = collection(db, "products");
    
    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot: QuerySnapshot<DocumentData>) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products: ", error);
      toast({ title: "ত্রুটি!", description: "পণ্য আনতে সমস্যা হয়েছে।", variant: "destructive" });
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [toast]);

  const handleDeleteProduct = async (productId: string) => {
    setDeletingId(productId);
    try {
      await deleteDoc(doc(db, "products", productId));
      toast({ title: "সফল!", description: "পণ্য সফলভাবে মুছে ফেলা হয়েছে।" });
      // Real-time listener will update the list automatically
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast({ title: "ত্রুটি!", description: "পণ্য মুছতে সমস্যা হয়েছে।", variant: "destructive" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl font-headline">পণ্য তালিকা</CardTitle>
          <CardDescription>এখানে সকল পণ্য দেখুন, যোগ করুন, সম্পাদনা করুন অথবা মুছুন।</CardDescription>
        </div>
        <Link href="/admin/products/add">
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> নতুন পণ্য যোগ করুন
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">পণ্য লোড হচ্ছে...</p>
          </div>
        ) : products.length === 0 ? (
           <div className="text-center py-10">
             <Package className="mx-auto h-12 w-12 text-muted-foreground" />
             <p className="mt-4 text-lg">এখনও কোনো পণ্য যোগ করা হয়নি।</p>
             <Link href="/admin/products/add" className="mt-2 inline-block text-primary hover:underline">
                প্রথম পণ্য যোগ করুন
             </Link>
           </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ছবি</TableHead>
                <TableHead>নাম</TableHead>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead className="text-right">মূল্য (৳)</TableHead>
                <TableHead className="text-center">ক্রিয়াকলাপ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 relative rounded-md overflow-hidden">
                      <Image src={product.imageUrl || "https://placehold.co/50x50.png"} alt={product.name} layout="fill" objectFit="cover" data-ai-hint="product item thumbnail"/>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell><Badge variant="outline">{product.category || 'N/A'}</Badge></TableCell>
                  <TableCell className="text-right">{product.price.toLocaleString('bn-BD')}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <Button variant="outline" size="icon" className="hover:text-primary hover:border-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button variant="outline" size="icon" className="hover:text-destructive hover:border-destructive" disabled={deletingId === product.id}>
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
        )}
      </CardContent>
    </Card>
  );
}
