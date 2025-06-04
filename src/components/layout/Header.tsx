
"use client";

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogIn, UserPlus, LogOut, ShieldCheck, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-headline font-bold hover:opacity-80 transition-opacity">
          বাংলা শপ
        </Link>
        <nav className="flex items-center space-x-3 md:space-x-4">
          <Link href="/" className="hover:text-accent transition-colors font-medium text-sm md:text-base">
            হোম
          </Link>
          <Link href="/cart" className="relative hover:text-accent transition-colors font-medium flex items-center text-sm md:text-base">
            <ShoppingCart className="h-5 w-5 mr-1" />
            কার্ট
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-3 text-xs px-1.5 py-0.5 h-5 min-w-[20px] flex items-center justify-center">
                {itemCount.toLocaleString('bn-BD')}
              </Badge>
            )}
          </Link>
          {currentUser ? (
            <>
              <Link href="/profile" className="hover:text-accent transition-colors font-medium flex items-center text-sm md:text-base">
                 <UserCircle className="h-5 w-5 mr-1 md:mr-2" />
                 <span className="hidden md:inline">প্রোফাইল</span>
              </Link>
             
              {currentUser.email?.toLowerCase() === 'admin@banglashop.com' && (
                 <Link href="/admin" className="hover:text-accent transition-colors font-medium flex items-center text-sm md:text-base">
                    <ShieldCheck className="h-5 w-5 mr-1 md:mr-2" />
                    <span className="hidden md:inline">অ্যাডমিন</span>
                 </Link>
              )}
               <Button variant="ghost" size="sm" onClick={logout} className="hover:bg-primary-foreground/20 hover:text-accent text-primary-foreground text-sm md:text-base px-2 md:px-3">
                <LogOut className="h-4 w-4 md:mr-1" />
                <span className="hidden md:inline">লগআউট</span>
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-accent transition-colors font-medium flex items-center text-sm md:text-base">
                <LogIn className="h-5 w-5 mr-1" />
                লগইন
              </Link>
              <Link href="/register" className="hover:text-accent transition-colors font-medium flex items-center text-sm md:text-base">
                <UserPlus className="h-5 w-5 mr-1" />
                রেজিস্টার
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

    