import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth";

interface LoginPageProps extends React.ComponentPropsWithRef<"div"> {
  searchParams: { callbackUrl: string | undefined };
}

export function LoginForm({
  searchParams,
  className,
  ...props
}: LoginPageProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-8 w-8 items-center justify-center">
              <GalleryVerticalEnd className="size-6 text-primary" />
            </div>
          </div>
          <h1 className="text-xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access the admin dashboard
          </p>
        </div>
      </div>

      {/* Admin Team Credentials Form */}
      <form
        action={async (formData: FormData) => {
          "use server";

          try {
            await signIn("credentials", {
              email: formData.get("email") as string,
              password: formData.get("password") as string,
              redirect: true,
              callbackUrl: "/",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              redirect(`/error?error=${error.type}`);
            }
            throw error;
          }
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Admin Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter admin email"
            className="bg-background"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Admin Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter admin password"
            className="bg-background"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign in with Email
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";

              try {
                await signIn(provider.id, {
                  redirect: true,
                  callbackUrl: "/",
                });
              } catch (error) {
                if (error instanceof AuthError) {
                  redirect(`/error?error=${error.type}`);
                }
                throw error;
              }
            }}
          >
            <Button variant="outline" className="w-full" type="submit">
              <svg
                className="mr-2 size-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with {provider.name}
            </Button>
          </form>
        ))}
      </div>
      <div className="text-balance text-center text-xs text-muted-foreground">
        <strong>Note:</strong> Team members use email login. Owner uses Google
        login.
      </div>
    </div>
  );
}
