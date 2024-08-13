import { ContactForm } from "./ContactForm";
import Image from "next/image";

const Contact = () => {
  return (
    <div>
      <div className="relative text-center mb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wider">
          Contact
        </h1>
        <div className="absolute size-24 top-[50%] w-[300px] left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 blur-2xl opacity-25" />
      </div>
      <div className="flex gap-5 items-center justify-center h-full w-full">
        <div className=" hidden md:block max-w-3/6 h-full w-full ">
          <Image
            src="/svg/contact-bg.svg"
            alt="contact"
            width={500}
            height={500}
            priority={false}
            placeholder="blur"
            blurDataURL="/svg/contact-bg.svg"
          />
        </div>
        <div className="max-w-3/6 w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
