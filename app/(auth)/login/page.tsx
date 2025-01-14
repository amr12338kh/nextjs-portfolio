import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async ({ searchParams }: any) => {
  const session = await auth();

  if (session?.user) {
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
