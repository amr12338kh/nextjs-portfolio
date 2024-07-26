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

export interface ProjectCardsProps {
  title: string;
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: string;
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
