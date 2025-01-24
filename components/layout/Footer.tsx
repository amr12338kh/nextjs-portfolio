import { footerLinks } from "@/data";
import Link from "next/link";
import { Spotify } from "../Spotify";
import Logo from "../Logo";
import { filterLinks } from "@/lib/utils";

const Footer = ({ isTestimonials }: { isTestimonials: boolean }) => {
  const date = Date.now();
  const currentDate = new Date(date);
  const year = currentDate.getFullYear();

  return (
    <footer className="z-40">
      <div className="max-w-7xl py-10 flex flex-col gap-14 bg-background/30 px-5 md:px-10 saturate-100 shadow-sm backdrop-blur-[10px] rounded-2xl transition-colors">
        <div>
          <Spotify />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 space-y-10 sm:space-y-0">
          {footerLinks.map((links, id) => {
            return (
              <ul key={id} className=" flex flex-col gap-y-3">
                <h1 className="font-semibold text-lg">{links.title}</h1>
                {filterLinks(links.links, isTestimonials).map(
                  ({ id, name, link }) => (
                    <Link
                      key={id}
                      href={link}
                      className=" text-muted-foreground hover:text-primary duration-200"
                    >
                      <li>{name}</li>
                    </Link>
                  )
                )}
              </ul>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <p className=" font-semibold">© {year} Amr</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
