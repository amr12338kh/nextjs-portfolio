import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/auth";
import { checkAdminStatus } from "@/lib/actions";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { ALL_LATEST_ITEMS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect("/login");

  const isAdmin = await checkAdminStatus();

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-background to-secondary/10 p-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <Shield className="size-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this area
          </p>
        </div>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            Return to Home
          </Button>
        </Link>
      </div>
    );
  }

  const latestModels = await client.fetch(ALL_LATEST_ITEMS_QUERY);

  return (
    <SidebarProvider>
      {session?.user && (
        <DashboardSidebar latestModels={latestModels} user={session.user} />
      )}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
        </header>
        <main className="px-10 py-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
