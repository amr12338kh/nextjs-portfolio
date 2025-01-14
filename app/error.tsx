"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bug, RefreshCcw, AlertCircle, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyErrorDetails = () => {
    if (!error.digest) return;
    navigator.clipboard.writeText(
      `Error ID: ${error.digest}\nMessage: ${error.message}`
    );
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Error details have been copied",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container mx-auto px-4 min-h-[80vh] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center gap-10 lg:gap-24"
      >
        <div className="relative">
          <Image
            src="/404-tv.png"
            alt="Error Image"
            width={500}
            height={500}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        <div className="space-y-6 text-center sm:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground">
              We&apos;re working on fixing it.
            </p>
          </div>

          {error.digest && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="size-4" />
                      <AlertDescription className="font-medium">
                        An error occurred
                      </AlertDescription>
                    </div>
                    <AlertDescription className="font-mono text-xs opacity-80">
                      Error ID: {error.digest}
                    </AlertDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyErrorDetails}
                    className="size-6 hover:bg-destructive/20"
                  >
                    {copied ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="size-4" />
                      </motion.div>
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </Alert>

              <p className="text-sm text-muted-foreground">
                {error.message || "An unexpected error occurred"}
              </p>
            </div>
          )}

          <div className="flex gap-2 justify-center sm:justify-start">
            <Button
              onClick={reset}
              className="gap-2 hover:scale-105 transition-transform"
              size="sm"
            >
              <RefreshCcw className="size-4" />
              Try again
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hover:scale-105 transition-transform"
                >
                  <Bug className="size-4" />
                  Report issue
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Error Details</DialogTitle>
                  <DialogDescription>
                    Please include these details when reporting:
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <pre className="bg-muted p-3 rounded-lg text-xs text-wrap">
                    {JSON.stringify(
                      { error: error.message, id: error.digest },
                      null,
                      2
                    )}
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    Contact us with these details for assistance.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Error;
