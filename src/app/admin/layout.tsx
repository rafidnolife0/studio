"use client";
import type { ReactNode } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Basic Admin role check. For a real app, use custom claims or a roles system in Firestore.
const ADMIN_EMAIL = "admin@banglashop.com"; 

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push('/login?redirect=/admin');
      } else if (currentUser.email !== ADMIN_EMAIL) {
        // This is a simple check. For production, use custom claims or a more robust role system.
        router.push('/'); 
      }
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser || currentUser.email !== ADMIN_EMAIL) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">লোড হচ্ছে বা অ্যাক্সেস যাচাই করা হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar />
      <main className="flex-grow p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
}
