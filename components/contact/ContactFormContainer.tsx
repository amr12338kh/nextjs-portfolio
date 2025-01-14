import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function ContactFormContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col border-none", className)} {...props}>
      <Card className="overflow-hidden border-none shadow-none">
        <CardContent className="grid gap-5 p-0 md:grid-cols-2">
          <div className="sm:px-8 py-6 space-y-10">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl mb-1 font-bold">Contact us</h1>
              <p className="text-balance text-xs sm:text-sm text-muted-foreground">
                We'd love to hear from you!
              </p>
            </div>
            {children}
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/contact.jpeg"
              alt="Contact Image"
              width={1000}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover brightness-[0.9] dark:brightness-[0.7] contrast-[1.3]"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground mt-4">
        <p>Thank you for reaching out! We will respond as soon as possible.</p>
      </div>
    </div>
  );
}
