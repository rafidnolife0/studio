
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Users, UserX } from "lucide-react";
import type { User } from "@/lib/types";
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";


export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    // Ensure you have a 'users' collection in Firestore where user data is stored
    // This typically happens on user registration or first login
    const usersCollectionRef = collection(db, "users"); 
    
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const usersData = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamp to Date object then to ISO string if it's a Timestamp
        let regDateStr = data.registrationDate;
        if (data.registrationDate instanceof Timestamp) {
            regDateStr = data.registrationDate.toDate().toISOString();
        }
        return { 
          uid: doc.id, 
          ...data,
          registrationDate: regDateStr, // Ensure registrationDate is a string
        } as User;
      });
      setUsers(usersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching users: ", error);
      toast({ title: "ত্রুটি!", description: "ব্যবহারকারীদের আনতে সমস্যা হয়েছে।", variant: "destructive" });
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [toast]);
  
  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
        const names = name.split(' ');
        if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
    if (email) {
        return email.substring(0, 2).toUpperCase();
    }
    return '??';
  };


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">ব্যবহারকারীগণ</CardTitle>
            <CardDescription>নিবন্ধিত সকল ব্যবহারকারীর তালিকা দেখুন।</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">ব্যবহারকারীদের তথ্য লোড হচ্ছে...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10">
            <UserX className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg">কোনো নিবন্ধিত ব্যবহারকারী পাওয়া যায়নি।</p>
            <p className="text-sm text-muted-foreground mt-2">ব্যবহারকারী রেজিস্ট্রেশন করলে এখানে তাদের তথ্য দেখা যাবে।</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">অবতার</TableHead>
                <TableHead>নাম</TableHead>
                <TableHead>ইমেইল</TableHead>
                <TableHead>নিবন্ধনের তারিখ</TableHead>
                {/* <TableHead className="text-center">ক্রিয়াকলাপ</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png?text=${getInitials(user.displayName, user.email)}`} alt={user.displayName || user.email || 'User'}  data-ai-hint="user avatar" />
                      <AvatarFallback>{getInitials(user.displayName, user.email)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.displayName || 'N/A'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.registrationDate ? format(new Date(user.registrationDate), 'dd MMM, yyyy', { locale: bn }) : 'N/A'}</TableCell>
                  {/* <TableCell className="text-center">
                    <Button variant="outline" size="sm">বিস্তারিত</Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
