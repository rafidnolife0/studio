import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="py-12">
      <AuthForm isRegister />
      <p className="mt-6 text-center text-sm">
        ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          এখানে লগইন করুন
        </Link>
      </p>
    </div>
  );
}
