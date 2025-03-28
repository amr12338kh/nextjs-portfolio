"use client";

import { footerLinks } from "@/data";
import Link from "next/link";
import { Spotify } from "../Spotify";
import Logo from "../Logo";
import { filterLinks, getCurrentYear } from "@/lib/utils";
import GitHubStars from "../GitHubStars";
import { Separator } from "../ui/separator";

const Footer = ({
  isTestimonials,
  githubStars,
}: {
  isTestimonials: boolean;
  githubStars: number;
}) => {
  return (
    <footer className="z-40">
      <div className="py-10 flex flex-col gap-14 bg-background/30 px-5 sm:px-10 saturate-100 shadow-sm backdrop-blur-[10px] rounded-2xl transition-colors">
        <div className="sm:flex sm:w-full sm:justify-between sm:items-center">
          <Spotify />
          <GitHubStars stars={githubStars} className="hidden sm:flex" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 space-y-10 sm:space-y-0">
          {footerLinks.map((links, id) => {
            return (
              <ul key={id} className="flex flex-col gap-y-3">
                <h1 className="font-semibold text-lg">{links.title}</h1>
                {filterLinks(links.links, isTestimonials).map(
                  ({ id, name, link }) => (
                    <li key={id}>
                      <Link
                        href={link}
                        className="text-muted-foreground hover:text-primary duration-200"
                      >
                        {name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            );
          })}
        </div>
        <div className="space-y-5 sm:space-y-0">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Logo />
            </Link>
            <p className="font-medium hidden sm:block">
              Copyrights © {getCurrentYear()} Amr
            </p>
            <GitHubStars stars={githubStars} className="sm:hidden" />
          </div>
          <Separator className="sm:hidden" />
          <div className="flex justify-center">
            <p className="sm:hidden text-sm">
              Copyrights © {getCurrentYear()} Amr. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
