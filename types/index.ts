import { CarouselApi } from "@/components/ui/carousel";
import { Sidebar } from "@/components/ui/sidebar";
import { Project, Skill, Testimonial } from "@/sanity/types";
import { User } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

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

export interface InstagramStatsProps {
  followers: number;
}

export interface SocialMediaStatsProps extends GitHubDataProps {
  instagramFollowers?: number;
}

export interface TableDataProps extends CommonProps {
  projectType: Project["_type"];
  skillType: Skill["_type"];
  testimonialType: Testimonial["_type"];
  _type: string;
  username?: string;
  _id?: string;
  isDark?: boolean;
}

interface CommonProps {
  id: string;
  title: string;
  description: string;
}

export interface SectionsProps {
  _key?: string;
  image: string;
  text: string;
  subText: string;
}

export interface ProjectFormProps {
  initialData?: ProjectProps;
  skills: Skill[];
  mode: "create" | "edit";
  projectId?: string;
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

export interface SelectSkillsProps {
  skills: Skill[];
  setFormData: Dispatch<SetStateAction<ProjectProps>>;
  initialSkills?: Skill[];
  resetKey?: number;
}

export interface SkillFormProps {
  initialData?: SkillProps;
  mode: "create" | "edit";
  skillId?: string;
}

export interface SkillReference {
  _type: "reference";
  _ref: string;
  _key: string;
}

export type NewProjectFormSchema =
  | {
      link?: string;
      title?: string;
      image: string;
      tagline?: string;
      description?: string;
      githubLink?: string;
      skills?: Array<{
        title: string;
        image: string;
        _id: string;
        isDark: boolean | null;
      }>;
      sections?: Array<{
        text: string;
        subText: string;
        image: string;
      }>;
    }
  | {
      text: string;
      subText: string;
      image: string;
    };

export interface AddImageProps {
  size: "big" | "small" | "big-skill";
  form: UseFormReturn<any>;
  counter?: number;
  mainImage?: string;
  setMainImage?: (value: string) => void;
  sectionImage?: string;
  setSectionImage?: (value: string) => void;
  setSkillFormData?: Dispatch<SetStateAction<SkillProps>>;
  setFormData?: Dispatch<SetStateAction<ProjectProps>>;
}

export interface ImagePreviewProps {
  imageUrl?: string;
  onRemove: () => void;
  size: "big" | "small" | "big-skill";
}

export interface AddSectionsProps {
  sectionImage: string;
  setSectionImage: (e: string) => void;
  open: boolean;
  setOpen: (e: boolean) => void;
  setFormData: Dispatch<SetStateAction<ProjectProps>>;
}

export interface TestimonialsProps {
  _type?: "testimonial";
  _id?: string;
  id?: string;
  username: string;
  job_title: string;
  user_message: string;
}

export interface TestimonialsFormProps {
  initialData?: TestimonialsProps;
  mode: "create" | "edit";
  testimonialId?: string;
}

export interface DashboardSidebarProps
  extends React.ComponentProps<typeof Sidebar> {
  user?: User;
  latestModels?: LatestModelsProps;
}

export interface LatestModelsProps {
  latestProject: Project;
  latestSkill: Skill;
  latestTestimonial: TestimonialsProps;
}

export interface DeleteAlertProps {
  modelId?: string;
  modelName?: string;
  isSingle: boolean;
  ids?: string[];
  open?: boolean;
  setOpen: (value: boolean) => void;
  onDeleteComplete?: () => void;
}

export interface ItemDropdownMenuProps {
  _id: string;
  type: string;
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  className?: string;
  isSidebar?: boolean;
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
