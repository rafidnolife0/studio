
"use client";
import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, Loader2, AlertTriangle, ShoppingBag, Filter, Tags, Grip, Search as SearchIcon } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Script from 'next/script';


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const ADMIN_EMAIL = "admin@banglashop.com";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    return Array.from(categories).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    if (selectedCategory !== "all") {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(lowercasedSearchTerm) ||
        (product.description && product.description.toLowerCase().includes(lowercasedSearchTerm))
      );
    }
    return tempProducts;
  }, [products, selectedCategory, searchTerm]);

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
  
  const getEmptyStateMessage = () => {
    if (searchTerm && selectedCategory !== "all") {
      return `দুঃখিত, "${searchTerm}" অনুসন্ধান এবং "${selectedCategory}" ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।`;
    } else if (searchTerm) {
      return `দুঃখিত, "${searchTerm}" অনুসন্ধানে কোনো পণ্য পাওয়া যায়নি।`;
    } else if (selectedCategory !== "all") {
      return `দুঃখিত, "${selectedCategory}" ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।`;
    }
    return "এখনও কোনো পণ্য যোগ করা হয়নি।";
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-28 rounded-xl shadow-xl mb-16 overflow-hidden border border-primary/20">
        <div className="absolute inset-0 opacity-[0.03]">
            <Image 
                src="https://placehold.co/1200x400.png" 
                alt="Hero Background Abstract" 
                layout="fill" 
                objectFit="cover" 
                className="pointer-events-none"
                data-ai-hint="colorful abstract pattern" 
            />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-primary mb-6">
            স্বাগতম <span className="text-accent">বাংলা শপে</span>!
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-3xl mx-auto leading-relaxed">
            আপনার বিশ্বস্ত অনলাইন শপিং হাব – সেরা সব পণ্য, আকর্ষণীয় মূল্যে! এখানে পাবেন গুণগত মানসম্পন্ন পোশাক, ইলেকট্রনিকস, গৃহস্থালী সামগ্রী এবং আরও অনেক কিছু।
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3.5 px-10 shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-accent/50">
            <Link href="#products-section" className="flex items-center">
              <ShoppingBag className="mr-2.5 h-6 w-6" />
              এখনি কেনাকাটা করুন
            </Link>
          </Button>
        </div>
      </section>

      {/* Ad Slot 2: Homepage Mid-Section */}
      <section className="my-12 flex justify-center ad-container-homepage-mid min-h-[50px] bg-muted/10">
         <Script
            src="https://fpyf8.com/88/tag.min.js"
            strategy="afterInteractive"
            data-zone="150831"
            data-cfasync="false"
          />
      </section>
      
      <div id="products-section" className="mb-10">
        <Card className="shadow-lg border-t-4 border-primary rounded-xl">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <CardTitle className="text-3xl md:text-4xl font-headline font-bold text-primary flex items-center">
                    <Grip className="mr-3 h-8 w-8 text-accent" />
                    আমাদের পণ্যসমূহ
                </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 pb-6 space-y-6">
            <div className="relative">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="পণ্য খুঁজুন (যেমন: শার্ট, মোবাইল...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-base rounded-lg border-2 border-border focus:border-primary shadow-sm transition-colors focus:ring-1 focus:ring-primary"
              />
            </div>

            {uniqueCategories.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Filter className="h-5 w-5" />
                    <span>ক্যাটাগরি অনুযায়ী ফিল্টার করুন:</span>
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className={cn(
                      "font-medium rounded-full px-4 py-1.5 text-sm transition-all",
                      selectedCategory === "all" ? "bg-primary text-primary-foreground shadow-md" : "text-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    <Tags className="mr-2 h-4 w-4" />
                    সকল ক্যাটাগরি
                  </Button>
                  {uniqueCategories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "font-medium rounded-full px-4 py-1.5 text-sm transition-all",
                        selectedCategory === category ? "bg-primary text-primary-foreground shadow-md" : "text-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {filteredProducts.length === 0 && !loadingProducts ? (
        <Card className="text-center py-16 px-6 shadow-lg rounded-xl bg-card">
          <CardContent className="flex flex-col items-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-semibold mb-3 text-primary">
              {getEmptyStateMessage()}
            </h3>
            {currentUser?.email === ADMIN_EMAIL && products.length === 0 && ( // Only show if no products at all
              <p className="mt-1 text-sm text-muted-foreground">অ্যাডমিন প্যানেল থেকে নতুন পণ্য যোগ করুন।</p>
            )}
            {(selectedCategory !== "all" || searchTerm) && ( // Show if any filter is active
               <Button variant="link" onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }} className="text-accent text-base">
                 সকল ফিল্টার পরিষ্কার করুন
               </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!authLoading && currentUser && currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
        <div className="mt-16 mb-8 text-center">
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 hover:text-primary-foreground hover:border-primary/80 py-3 px-8 text-base rounded-lg shadow-md hover:shadow-lg transition-all">
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

