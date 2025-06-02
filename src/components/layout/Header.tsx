"use client";

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogIn, UserPlus, LogOut, ShieldCheck } from 'lucide-react';
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
        <nav className="flex items-center space-x-4 md:space-x-6">
          <Link href="/" className="hover:text-accent transition-colors font-medium">
            হোম
          </Link>
          <Link href="/cart" className="relative hover:text-accent transition-colors font-medium flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" />
            কার্ট
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-3 text-xs px-1.5 py-0.5 h-5 min-w-[20px] flex items-center justify-center">
                {itemCount}
              </Badge>
            )}
          </Link>
          {currentUser ? (
            <>
              <span className="hidden md:inline font-medium">স্বাগতম, {currentUser.displayName || currentUser.email?.split('@')[0]}</span>
              <Button variant="ghost" size="sm" onClick={logout} className="hover:bg-primary-foreground hover:text-primary text-primary-foreground">
                <LogOut className="h-4 w-4 mr-1" />
                লগআউট
              </Button>
              {/* Simple check for admin role, replace with actual role check */}
              {currentUser.email === 'admin@banglashop.com' && (
                 <Link href="/admin" className="hover:text-accent transition-colors font-medium flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-1" />
                    অ্যাডমিন
                 </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-accent transition-colors font-medium flex items-center">
                <LogIn className="h-5 w-5 mr-1" />
                লগইন
              </Link>
              <Link href="/register" className="hover:text-accent transition-colors font-medium flex items-center">
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
