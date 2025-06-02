import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Package, Users, DollarSign } from "lucide-react";

export default function AdminDashboardPage() {
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
            <div className="text-2xl font-bold">৳১২,৩৪৫</div>
            <p className="text-xs text-muted-foreground">গত মাসের চেয়ে +২০.১% বেশি</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট অর্ডার</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+২৩০</div>
            <p className="text-xs text-muted-foreground">গত মাসের চেয়ে +১৮.১% বেশি</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">নিবন্ধিত ব্যবহারকারী</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+১২৩</div>
            <p className="text-xs text-muted-foreground">নতুন ৩০ জন এই সপ্তাহে</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">স্টকে থাকা পণ্য</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৭৮৯ টি</div>
            <p className="text-xs text-muted-foreground">৫ টি পণ্যের স্টক কম</p>
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
            {/* Add more dashboard widgets or summaries here */}
        </CardContent>
      </Card>
    </div>
  );
}
