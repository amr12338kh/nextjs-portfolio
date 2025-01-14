"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft, RefreshCcw, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <section className="container mx-auto px-4 min-h-[80vh] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-center gap-10 lg:gap-24"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Image
            src="/404-tv.png"
            alt="404 Error Image"
            width={500}
            height={500}
            className="drop-shadow-2xl"
            priority
          />
        </motion.div>

        <div className="space-y-6 text-center sm:text-left">
          <div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              Page Not Found
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className=" text-sm lg:text-lg text-muted-foreground mt-3 max-w-[500px]"
            >
              We couldn&apos;t find the page you were looking for. It might have
              been moved or deleted.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center sm:justify-start"
          >
            <Button
              onClick={handleRefresh}
              size="sm"
              className="gap-2 hover:scale-105 transition-transform"
            >
              <RefreshCcw className="size-3" />
              Try Again
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:scale-105 transition-transform"
              >
                <Home className="size-3" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NotFound;
