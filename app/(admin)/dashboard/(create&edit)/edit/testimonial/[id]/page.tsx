import TestimonialsForm from "@/components/dashboard/TestimonialsFrom";
import { client } from "@/sanity/lib/client";
import { TESTIMONIAL_QUERY } from "@/sanity/lib/queries";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const testimonial = await client.fetch(TESTIMONIAL_QUERY, { id });

  return (
    <div>
      <TestimonialsForm
        mode="edit"
        testimonialId={id}
        initialData={testimonial}
      />
    </div>
  );
};

export default page;
