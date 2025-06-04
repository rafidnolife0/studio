
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Package, Users, DollarSign, Loader2, AlertTriangle, ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, Timestamp, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Order, User, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
}

const orderStatusMap: Record<Order['status'], string> = {
  Pending: 'অপেক্ষারত',
  Processing: 'প্রসেসিং চলছে',
  Shipped: 'শিপড',
  Delivered: 'ডেলিভারি হয়েছে',
  Cancelled: 'বাতিল হয়েছে',
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingStats(true);
      setError(null);
      try {
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        let totalSales = 0;
        ordersSnapshot.forEach(doc => {
          const order = doc.data() as Order;
          totalSales += order.totalAmount;
        });
        const totalOrders = ordersSnapshot.size;

        const usersSnapshot = await getDocs(collection(db, "users"));
        const totalUsers = usersSnapshot.size;

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
        setLoadingStats(false);
      }
    };

    fetchDashboardData();

    const ordersQuery = query(collection(db, "orders"), orderBy("orderDate", "desc"), limit(5));
    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          orderDate: data.orderDate instanceof Timestamp ? data.orderDate.toDate().toISOString() : data.orderDate,
        } as Order;
      });
      setRecentOrders(fetchedOrders);
      setLoadingOrders(false);
    }, (err) => {
      console.error("Error fetching recent orders: ", err);
      toast({ title: "ত্রুটি!", description: "সাম্প্রতিক অর্ডার আনতে সমস্যা হয়েছে।", variant: "destructive" });
      setLoadingOrders(false);
    });

    return () => {
      unsubscribeOrders();
    };

  }, [toast]);

  if (loadingStats) {
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
         <Button onClick={() => window.location.reload()} variant="outline" className="border-primary text-primary hover:bg-primary/10">পুনরায় চেষ্টা করুন</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold text-primary">অ্যাডমিন ড্যাশবোর্ড</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট বিক্রয়</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{stats.totalSales.toLocaleString('bn-BD')}</div>
            {/* <p className="text-xs text-muted-foreground">গত মাসের চেয়ে +২০.১% বেশি</p> */}
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট অর্ডার</CardTitle>
            <ReceiptText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString('bn-BD')} টি</div>
            {/* <p className="text-xs text-muted-foreground">গত মাসের চেয়ে +১৮.১% বেশি</p> */}
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">নিবন্ধিত ব্যবহারকারী</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString('bn-BD')} জন</div>
            {/* <p className="text-xs text-muted-foreground">নতুন ৩০ জন এই সপ্তাহে</p> */}
          </CardContent>
        </Card>
         <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট পণ্য</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString('bn-BD')} টি</div>
            {/* <p className="text-xs text-muted-foreground">৫ টি পণ্যের স্টক কম</p> */}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="font-headline text-xl">সাম্প্রতিক অর্ডারসমূহ</CardTitle>
            <CardDescription>সবশেষ ৫টি অর্ডার এখানে দেখানো হচ্ছে।</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingOrders ? (
             <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">সাম্প্রতিক অর্ডার লোড হচ্ছে...</p>
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">এখনও কোনো অর্ডার পাওয়া যায়নি।</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>অর্ডার আইডি</TableHead>
                  <TableHead>ক্রেতা</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead className="text-right">মোট টাকা (৳)</TableHead>
                  <TableHead className="text-center">স্ট্যাটাস</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono">
                      <Link href={`/admin/orders`} className="hover:underline text-primary">
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.orderDate ? format(new Date(order.orderDate), 'dd MMM, yyyy hh:mm a', { locale: bn }) : 'N/A'}</TableCell>
                    <TableCell className="text-right font-medium">{order.totalAmount.toLocaleString('bn-BD')}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={order.status === 'Delivered' ? 'default' : (order.status === 'Cancelled' ? 'destructive' : 'secondary')} 
                             className={
                               order.status === 'Pending' ? 'bg-yellow-500/80 hover:bg-yellow-500' :
                               order.status === 'Processing' ? 'bg-blue-500/80 hover:bg-blue-500' :
                               order.status === 'Shipped' ? 'bg-indigo-500/80 hover:bg-indigo-500' :
                               order.status === 'Delivered' ? 'bg-green-500/80 hover:bg-green-500' :
                               order.status === 'Cancelled' ? 'bg-red-500/80 hover:bg-red-500' :
                               'text-white' // Ensure text is white for custom bg colors
                             }>
                        {orderStatusMap[order.status]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {recentOrders.length > 0 && (
             <div className="mt-4 text-center">
                <Button asChild variant="link">
                    <Link href="/admin/orders">সকল অর্ডার দেখুন</Link>
                </Button>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


    
