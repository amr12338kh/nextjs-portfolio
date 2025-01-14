import { LogOut, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SignOutPage = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <Avatar className="h-20 w-20">
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback className="font-semibold text-xl">
                {/* <User className="h-10 w-10" /> */}
                {session.user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Sign Out Confirmation
            </h1>
            <p className="text-lg text-muted-foreground">
              Are you sure you want to sign out?
            </p>
            <p className="text-sm text-muted-foreground border rounded-lg p-3 bg-secondary/20">
              Signed in as{" "}
              <span className="font-medium">{session.user.email}</span>
            </p>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              type="submit"
              variant="destructive"
              className="w-full sm:w-auto"
            >
              <LogOut className="mr-2 size-4" />
              Sign Out
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 size-4" />
                Cancel
              </Button>
            </Link>
          </div>
        </form>

        <p className="text-xs text-muted-foreground">
          You will be redirected to the home page after signing out
        </p>
      </div>
    </div>
  );
};

export default SignOutPage;
