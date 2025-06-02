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
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isRegister?: boolean;
}

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "সঠিক ইমেইল প্রদান করুন।" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" }),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.name !== undefined) { // This implies it's a registration form
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "পাসওয়ার্ড দুটি মিলেনি।",
  path: ["confirmPassword"],
}).refine((data) => {
    if (data.name !== undefined) { // This implies it's a registration form
        return !!data.name && data.name.length >= 3;
    }
    return true;
}, {
    message: "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।",
    path: ["name"],
});


export default function AuthForm({ isRegister = false }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

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
        if (!values.name) {
            setError("অনুগ্রহ করে আপনার নাম লিখুন।");
            setLoading(false);
            return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(userCredential.user, { displayName: values.name });
        toast({ title: "সফল!", description: "আপনার অ্যাকাউন্ট তৈরি হয়েছে। অনুগ্রহ করে লগইন করুন।" });
        router.push("/login");
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({ title: "স্বাগতম!", description: "সফলভাবে লগইন করেছেন।" });
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message === "Firebase: Error (auth/email-already-in-use)." ? "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে।" : 
             err.message === "Firebase: Error (auth/invalid-credential)." ? "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।" : 
             "একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      console.error(err);
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
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? (isRegister ? "তৈরি হচ্ছে..." : "লগইন হচ্ছে...") : (isRegister ? "অ্যাকাউন্ট তৈরি করুন" : "লগইন")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
