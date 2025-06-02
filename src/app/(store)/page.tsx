
"use client";
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const ADMIN_EMAIL = "admin@banglashop.com";

  useEffect(() => {
    setLoadingProducts(true);
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, orderBy("createdAt", "desc")); // Assuming you have a createdAt field

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(productsData);
      setLoadingProducts(false);
      setError(null);
    }, (err) => {
      console.error("Error fetching products: ", err);
      setError("পণ্য আনতে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
      toast({ title: "ত্রুটি!", description: "পণ্য আনতে সমস্যা হয়েছে।", variant: "destructive" });
      setLoadingProducts(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [toast]);

  if (loadingProducts) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">পণ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-xl font-semibold text-destructive mb-2">একটি সমস্যা হয়েছে</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">পুনরায় চেষ্টা করুন</Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-8 text-center text-primary">আমাদের পণ্যসমূহ</h1>
      {products.length === 0 && !loadingProducts ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">এখনও কোনো পণ্য যোগ করা হয়নি।</p>
          {currentUser?.email === ADMIN_EMAIL && (
            <p className="mt-2">অ্যাডমিন প্যানেল থেকে নতুন পণ্য যোগ করুন।</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!authLoading && currentUser && currentUser.email === ADMIN_EMAIL && (
        <div className="mt-12 mb-8 text-center">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/admin" className="flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5" />
              অ্যাডমিন প্যানেল
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
