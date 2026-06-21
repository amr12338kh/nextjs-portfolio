import { motion } from "framer-motion";
import { Download, ExternalLink, Eye, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Resume = () => {
  const resumeUrl = "/Amr_Khaled_Salah_CV.pdf";

  return (
    <div className="relative flex flex-col justify-end mb-10 h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.5,
          type: "spring" as const,
          stiffness: 100,
        }}
      >
        <div className="z-10 flex flex-col gap-3">
          <Link
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn z-10"
          >
            <Button
              className="flex items-center justify-between gap-2 cursor-pointer w-full rounded-lg"
              variant="outline"
            >
              <div className="flex items-center gap-3">
                <Eye
                  size={16}
                  className="text-primary/70 group-hover/btn:text-primary transition-colors"
                />
                View Document
              </div>
              <ExternalLink
                size={14}
                className="opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0"
              />
            </Button>
          </Link>

          <Link
            href={resumeUrl}
            download="Amr_Resume.pdf"
            className="group/dl active:scale-[0.98] z-10"
          >
            <Button className="flex items-center justify-between cursor-pointer w-full rounded-lg">
              Download PDF
              <Download
                size={16}
                className="text-primary-foreground/70 group-hover/dl:text-primary-foreground transition-colors"
              />
            </Button>
          </Link>
        </div>
      </motion.div>

      <FileText
        size={200}
        strokeWidth={1}
        className="absolute transition-transform duration-500 -bottom-10 -right-8 text-zinc-800/30 group-hover:-translate-y-2 group-hover:-translate-x-2"
      />
    </div>
  );
};

export default Resume;
