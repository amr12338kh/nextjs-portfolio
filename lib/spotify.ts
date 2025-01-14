import {
  NowPlayingItem,
  SpotifyAccessTokenResponse,
  SpotifyNowPlayingResponse,
} from "@/types";
import querystring from "querystring";
import axios from "axios";

const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
export const SPOTIFY_NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

export const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const getSpotifyAccessToken = async (): Promise<string> => {
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  // Check if environment variables are defined
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Missing required Spotify environment variables");
  }

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const maxRetries = 3;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.post<SpotifyAccessTokenResponse>(
        SPOTIFY_TOKEN_ENDPOINT,
        querystring.stringify({
          grant_type: "refresh_token",
          refresh_token: SPOTIFY_REFRESH_TOKEN,
        }),
        {
          headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (!response.data.access_token) {
        throw new Error("No access token received in response");
      }

      return response.data.access_token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Spotify API Error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
      if (attempt < maxRetries) {
        console.warn(
          `Retrying access token request (${attempt}/${maxRetries})...`
        );
        await new Promise((res) => setTimeout(res, 1000)); // wait 1 second before retrying
      } else {
        throw new Error(
          `Failed to get Spotify access token after ${maxRetries} attempts`
        );
      }
    }
  }
  throw new Error("Unexpected error during access token retrieval");
};

export const getNowPlaying = async (): Promise<NowPlayingItem | null> => {
  try {
    const accessToken = await getSpotifyAccessToken();
    spotifyApi.defaults.headers.common["Authorization"] =
      `Bearer ${accessToken}`;

    const response = await spotifyApi.get<SpotifyNowPlayingResponse>(
      SPOTIFY_NOW_PLAYING_ENDPOINT
    );

    if (response.status === 204 || !response.data) {
      return null;
    }

    const { item, is_playing } = response.data;

    return {
      albumImageUrl: item.album.images[0].url,
      artist: item.artists.map((artist) => artist.name).join(", "),
      isPlaying: is_playing,
      songUrl: item.external_urls.spotify,
      title: item.name,
    };
  } catch (error) {
    console.error("Error fetching now playing:", error);
    return null;
  }
};
