
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Package, Users, DollarSign, Loader2, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Order, User, Product } from "@/lib/types"; // Make sure Product type is imported
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  // activeSubscriptions: number; // Example for future
  // lowStockItems: number; // Example for future
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch Orders
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        let totalSales = 0;
        ordersSnapshot.forEach(doc => {
          const order = doc.data() as Order;
          totalSales += order.totalAmount;
        });
        const totalOrders = ordersSnapshot.size;

        // Fetch Users
        const usersSnapshot = await getDocs(collection(db, "users"));
        const totalUsers = usersSnapshot.size;

        // Fetch Products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const totalProducts = productsSnapshot.size;

        setStats({
          totalSales,
          totalOrders,
          totalUsers,
          totalProducts,
        });

      } catch (err) {
        console.error("Error fetching dashboard data: ", err);
        setError("ড্যাশবোর্ডের তথ্য আনতে সমস্যা হয়েছে।");
        toast({ title: "ত্রুটি!", description: "ড্যাশবোর্ডের তথ্য আনতে সমস্যা হয়েছে।", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-lg text-muted-foreground">ড্যাশবোর্ডের তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-xl font-semibold text-destructive mb-2">একটি সমস্যা হয়েছে</h2>
        <p className="text-muted-foreground mb-6">{error || "কোনো তথ্য পাওয়া যায়নি।"}</p>
         <button onClick={() => window.location.reload()} className="px-4 py-2 border rounded-md hover:bg-muted">পুনরায় চেষ্টা করুন</button>
      </div>
    );
  }


  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-8 text-primary">অ্যাডমিন ড্যাশবোর্ড</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট বিক্রয়</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{stats.totalSales.toLocaleString('bn-BD')}</div>
            {/* <p className="text-xs text-muted-foreground">গত মাসের চেয়ে +২০.১% বেশি</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট অর্ডার</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString('bn-BD')} টি</div>
            {/* <p className="text-xs text-muted-foreground">গত মাসের চেয়ে +১৮.১% বেশি</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">নিবন্ধিত ব্যবহারকারী</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString('bn-BD')} জন</div>
            {/* <p className="text-xs text-muted-foreground">নতুন ৩০ জন এই সপ্তাহে</p> */}
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট পণ্য</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString('bn-BD')} টি</div>
            {/* <p className="text-xs text-muted-foreground">৫ টি পণ্যের স্টক কম</p> */}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="font-headline">স্বাগতম, অ্যাডমিন!</CardTitle>
            <CardDescription>এখান থেকে আপনি সাইটের বিভিন্ন কার্যক্রম পরিচালনা করতে পারবেন।</CardDescription>
        </CardHeader>
        <CardContent>
            <p>বাম পাশের মেনু থেকে পণ্য পরিচালনা, অর্ডার দেখা, ব্যবহারকারীদের তথ্য এবং অন্যান্য সেটিংস পরিবর্তন করুন।</p>
        </CardContent>
      </Card>
    </div>
  );
}
