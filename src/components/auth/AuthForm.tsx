
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // Added db
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // Added Firestore functions
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isRegister?: boolean;
}

// Define the base schema
const baseSchema = z.object({
  name: z.string().optional(), 
  email: z.string().email({ message: "সঠিক ইমেইল প্রদান করুন।" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" }),
  confirmPassword: z.string().optional(), 
});

// Function to create schema based on whether it's registration or login
const createAuthFormSchema = (isRegister: boolean) => {
  return baseSchema.superRefine((data, ctx) => {
    if (isRegister) {
      if (!data.name || data.name.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।",
          path: ["name"],
        });
      }
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "পাসওয়ার্ড দুটি মিলেনি।",
          path: ["confirmPassword"],
        });
      }
      if (!data.confirmPassword || data.confirmPassword.length === 0) {
         ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "অনুগ্রহ করে পাসওয়ার্ড নিশ্চিত করুন।",
          path: ["confirmPassword"],
        });
      }
    }
  });
};


export default function AuthForm({ isRegister = false }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Keep for general errors if needed, but toast is primary
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = createAuthFormSchema(isRegister);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    try {
      if (isRegister) {
        if (!values.name) { // This check is still useful before calling Firebase
            setError("অনুগ্রহ করে আপনার নাম লিখুন।");
            toast({ title: "ত্রুটি!", description: "অনুগ্রহ করে আপনার নাম লিখুন।", variant: "destructive" });
            setLoading(false);
            return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(userCredential.user, { displayName: values.name });

        // Store user details in Firestore 'users' collection
        const userDocRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: values.name,
          registrationDate: serverTimestamp(),
        });

        toast({ title: "সফল!", description: "আপনার অ্যাকাউন্ট তৈরি হয়েছে। অনুগ্রহ করে লগইন করুন।" });
        router.push("/login");
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({ title: "স্বাগতম!", description: "সফলভাবে লগইন করেছেন।" });
        const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
        const redirectUrl = searchParams.get('redirect') || '/';
        router.push(redirectUrl);
      }
    } catch (err: any) {
      let errorMessage = "একটি অপ্রত্যাশিত সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      if (err.code) {
        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage = "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে।";
            break;
          case "auth/invalid-credential":
          case "auth/wrong-password": 
          case "auth/user-not-found": 
          case "auth/invalid-email": 
            errorMessage = "আপনার দেওয়া ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।";
            break;
          case "auth/user-disabled":
            errorMessage = "আপনার অ্যাকাউন্টটি নিষ্ক্রিয় করা হয়েছে।";
            break;
          case "auth/too-many-requests":
            errorMessage = "অনেকবার চেষ্টা করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
            break;
          case "auth/network-request-failed":
            errorMessage = "নেটওয়ার্ক সমস্যা। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।";
            break;
          default:
            console.error("Firebase Auth Error Code:", err.code, "Message:", err.message); // Log unhandled errors
            break; 
        }
      } else {
        console.error("Auth Error:", err); // Log non-Firebase errors
      }
      setError(errorMessage); // Keep this if you want to display an error message also in the form, apart from toast
      toast({ title: "ত্রুটি!", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center text-primary">
          {isRegister ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "লগইন করুন"}
        </CardTitle>
        <CardDescription className="text-center">
          {isRegister ? "আপনার তথ্য দিয়ে ফর্মটি পূরণ করুন।" : "আপনার ইমেইল ও পাসওয়ার্ড দিন।"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isRegister && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>আপনার নাম</FormLabel>
                    <FormControl>
                      <Input placeholder="পুরো নাম" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ইমেইল অ্যাড্রেস</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>পাসওয়ার্ড</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="পাসওয়ার্ড" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isRegister && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>পাসওয়ার্ড নিশ্চিত করুন</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="পুনরায় পাসওয়ার্ড" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* General error message display, use sparingly as toasts are primary */}
            {/* {error && <p className="text-sm font-medium text-destructive">{error}</p>} */}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? (isRegister ? "তৈরি হচ্ছে..." : "লগইন হচ্ছে...") : (isRegister ? "অ্যাকাউন্ট তৈরি করুন" : "লগইন")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
