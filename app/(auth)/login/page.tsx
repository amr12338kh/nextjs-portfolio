import { LoginForm } from "@/components/auth/login-form";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams: { callbackUrl: string };
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const session = await auth();

  // If user is already logged in, redirect to home or callback URL
  if (session?.user) {
    // If there's a callback URL, use it, otherwise go to home
    const redirectUrl = searchParams?.callbackUrl || "/";
    redirect(redirectUrl);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm searchParams={{ callbackUrl: "/" }} />
      </div>
    </div>
  );
};

export default LoginPage;
