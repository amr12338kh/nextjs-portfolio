"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Bug, Home, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/10 p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full space-y-6 text-center"
          >
            <div className="space-y-2">
              <div className="mx-auto w-fit rounded-full bg-destructive/10 p-4">
                <Bug className="size-12 text-destructive" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                Something went wrong!
              </h1>
              <p className="text-muted-foreground">
                An unexpected error has occurred.
              </p>
            </div>

            <Alert variant="destructive">
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className="mt-2 font-mono text-xs">
                {error.message || "Unknown error occurred"}
              </AlertDescription>
            </Alert>

            <div className="flex gap-4 justify-center">
              <Button variant="default" onClick={reset} className="gap-2">
                <RotateCcw className="size-4" />
                Try again
              </Button>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <Home className="size-4" />
                  Return home
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              If this error persists, please contact support.
              <br />
              Error ID: {error.digest}
            </p>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
