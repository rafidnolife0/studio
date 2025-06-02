import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="py-12">
      <AuthForm />
      <p className="mt-6 text-center text-sm">
        অ্যাকাউন্ট নেই?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          এখানে রেজিস্টার করুন
        </Link>
      </p>
    </div>
  );
}
