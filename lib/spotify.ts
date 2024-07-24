import {
  NowPlayingItem,
  SpotifyAccessTokenResponse,
  SpotifyNowPlayingResponse,
} from "@/types";
import querystring from "querystring";

// Define environment variables
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async (): Promise<SpotifyAccessTokenResponse> => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Failed to get access token: ${response.statusText}`, text);
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  return response.json();
};

const getNowPlaying = async (): Promise<SpotifyNowPlayingResponse | null> => {
  const { access_token } = await getAccessToken();
  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get now playing: ${response.statusText}`);
  }

  return response.status === 204 ? null : response.json();
};

export default async function getNowPlayingItem(): Promise<NowPlayingItem | null> {
  try {
    const response = await getNowPlaying();
    if (!response) return null;

    const albumImageUrl = response.item.album.images[0].url;
    const artist = response.item.artists
      .map((artist) => artist.name)
      .join(", ");
    const isPlaying = response.is_playing;
    const songUrl = response.item.external_urls.spotify;
    const title = response.item.name;

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    };
  } catch (error) {
    console.error("Error fetching now playing item:", error);
    return null;
  }
}
