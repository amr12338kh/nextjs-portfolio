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

export interface ExpandableCardProps {
  items: ProjectsProps[];
}

export interface ExpandableCardItemProps {
  id: string;
  item: ProjectsProps;
  setActive: (item: any) => void;
}

export interface ExpandedCardContentProps {
  id: string;
  active: ProjectsProps;
  setActive: (item: any) => void;
}
export interface ProjectsProps {
  id: number;
  title: string;
  tagline: string;
  image: string;
  btnText: string;
  link: string;
  description: string;
  tech: SkillsItemsProps[];
  githubLink: string;
}

export interface TestimonialsProps {
  id: number;
  img: string;
  quote: string;
  name: string;
  title: string;
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
