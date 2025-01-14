import { DataTable } from "@/components/dashboard/AllModelsTable";
import { Separator } from "@/components/ui/separator";
import { client } from "@/sanity/lib/client";
import { ALL_TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import React from "react";
import { NotAvailable } from "../page";

const page = async () => {
  const testimonials = await client.fetch(ALL_TESTIMONIALS_QUERY);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold">Testimonials</h1>
      <div>
        <Separator className="my-5" />
        {testimonials.length > 0 ? (
          <DataTable data={testimonials} pageSize={10} type="testimonial" />
        ) : (
          <NotAvailable value="Testimonials" />
        )}
      </div>
    </div>
  );
};

export default page;
