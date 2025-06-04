
"use client";
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, Loader2, AlertTriangle, ShoppingBag, Filter } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const ADMIN_EMAIL = "admin@banglashop.com";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    setLoadingProducts(true);
    const productsCollectionRef = collection(db, "products");
    const q = query(productsCollectionRef, orderBy("createdAt", "desc"));

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

    return () => unsubscribe();
  }, [toast]);

  const uniqueCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach(product => {
      if (product.category) {
        categories.add(product.category);
      }
    });
    return Array.from(categories);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  if (loadingProducts) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">পণ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-xl font-semibold text-destructive mb-2">একটি সমস্যা হয়েছে</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="border-primary text-primary hover:bg-primary/10">পুনরায় চেষ্টা করুন</Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-background to-accent/10 py-16 md:py-24 rounded-lg shadow-lg mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
            <Image 
                src="https://placehold.co/1200x400.png" 
                alt="Hero Background" 
                layout="fill" 
                objectFit="cover" 
                className="pointer-events-none"
                data-ai-hint="shopping abstract background" 
            />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
            স্বাগতম বাংলা শপে!
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto">
            আপনার বিশ্বস্ত অনলাইন শপিং হাব – সেরা সব পণ্য, সেরা দামে!
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3 px-8 shadow-md transition-transform hover:scale-105">
            <Link href="#products-section" className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              পণ্য দেখুন
            </Link>
          </Button>
        </div>
      </section>
      
      <div id="products-section" className="mb-8">
        <Card className="shadow-md">
          <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary m-0">
              আমাদের পণ্যসমূহ
            </h1>
            {uniqueCategories.length > 0 && (
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="ক্যাটাগরি বাছাই করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সকল ক্যাটাগরি</SelectItem>
                    {uniqueCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {filteredProducts.length === 0 && !loadingProducts ? (
        <div className="text-center py-10 bg-card p-6 rounded-lg shadow">
          <p className="text-xl text-muted-foreground mb-2">
            {selectedCategory === "all" ? "এখনও কোনো পণ্য যোগ করা হয়নি।" : `দুঃখিত, "${selectedCategory}" ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।`}
          </p>
          {currentUser?.email === ADMIN_EMAIL && selectedCategory === "all" && (
            <p className="mt-1 text-sm">অ্যাডমিন প্যানেল থেকে নতুন পণ্য যোগ করুন।</p>
          )}
          {selectedCategory !== "all" && (
             <Button variant="link" onClick={() => setSelectedCategory("all")}>সকল ক্যাটাগরি দেখুন</Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!authLoading && currentUser && currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
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

    