import { CarouselApi } from "@/components/ui/carousel";
import { Skill } from "@/sanity/types";

export interface LinksProps {
  id: number;
  name: string;
  link: string;
  icon?: React.JSX.ElementType;
}

export interface FooterProps {
  title: string;
  links: LinksProps[];
}

export interface SkillsItemsProps {
  id: number;
  title: string;
  img: string;
  isDark: boolean;
}

export interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export interface SpotifyAccessTokenResponse {
  access_token: string;
}

export interface SpotifyNowPlayingResponse {
  currently_playing_type: string;
  status: number;
  is_playing: boolean;
  item: {
    name: string;
    artists: { name: string }[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  };
}

export interface NowPlayingItem {
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

export interface GitHubDataProps {
  githubFollowers: number;
  totalStars: number;
}

export interface StatCardProps {
  label: string;
  platform: string;
  value: number;
}

export interface SectionsProps {
  _key?: string;
  image: string;
  text: string;
  subText: string;
}

export interface ProjectProps {
  _id?: string;
  _type?: "project";
  createdAt?: string;
  _createdAt?: string;
  _updatedAt?: string;
  id?: string;
  title: string;
  tagline: string;
  description: string;
  image: string | undefined;
  link: string;
  githubLink: string;
  skills: Skill[];
  sections: SectionsProps[];
}

export interface SkillProps {
  id?: string;
  title: string;
  image: string | undefined;
  isDark: boolean;
}

export interface SkillReference {
  _type: "reference";
  _ref: string;
  _key: string;
}

export interface TestimonialsProps {
  _type?: "testimonial";
  _id?: string;
  id?: string;
  username: string;
  job_title: string;
  user_message: string;
}

export interface ProjectsCarouselProps {
  projects: ProjectProps[] | [string, ProjectProps[]][];
  className?: string;
  mode?: "latest" | "yearly";
  title?: string;
  showExploreMore?: boolean;
  exploreMoreLink?: string;
}

export interface CarouselDotNavigationProps {
  projectsToRender: ProjectProps[];
  currentSlide: number;
  api: CarouselApi | null;
}

export interface CarouselMobileNavigationProps
  extends CarouselDotNavigationProps {
  mode: "latest" | "yearly";
}

export interface ProjectCarouselViewProps {
  projectsToRender: ProjectProps[];
  yearTitle?: string;
  mode?: "latest" | "yearly";
}

export interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  variant?: "primary" | "secondary" | "third";
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
}
