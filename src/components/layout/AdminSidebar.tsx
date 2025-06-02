
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, Users, Settings, LogOut, ReceiptText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'ড্যাশবোর্ড', icon: Home },
  { href: '/admin/products', label: 'পণ্যসমূহ', icon: Package },
  { href: '/admin/orders', label: 'অর্ডারসমূহ', icon: ReceiptText },
  { href: '/admin/users', label: 'ব্যবহারকারীগণ', icon: Users },
  // { href: '/admin/settings', label: 'সেটিংস', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-4 space-y-6 flex flex-col h-full shadow-lg">
      <div className="text-2xl font-headline font-bold text-sidebar-primary text-center py-4 border-b border-sidebar-border">
        অ্যাডমিন প্যানেল
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>
                <Button
                  variant={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) ? 'secondary' : 'ghost'}
                  className={cn(
                    "w-full justify-start text-base py-3 h-auto",
                    (pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))) 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90" 
                    : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto border-t border-sidebar-border pt-4">
        <Link href="/" passHref>
            <Button variant="outline" className="w-full justify-start text-base py-3 h-auto mb-2 border-sidebar-border hover:bg-sidebar-accent/30">
                সাইট দেখুন
            </Button>
        </Link>
        <Button variant="destructive" className="w-full justify-start text-base py-3 h-auto bg-red-600 hover:bg-red-700 text-white" onClick={logout}>
          <LogOut className="mr-3 h-5 w-5" />
          লগআউট
        </Button>
      </div>
    </aside>
  );
}
