import axios from "axios";
import querystring from "querystring";
import {
  SpotifyAccessTokenResponse,
  SpotifyNowPlayingResponse,
  NowPlayingItem,
} from "@/types";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const getAccessToken = async (): Promise<string> => {
  const basic = Buffer.from(
    `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const response = await axios.post<SpotifyAccessTokenResponse>(
      TOKEN_ENDPOINT,
      querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw new Error("Failed to get access token");
  }
};

export const getNowPlaying = async (): Promise<NowPlayingItem | null> => {
  try {
    const accessToken = await getAccessToken();
    spotifyApi.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    const response = await spotifyApi.get<SpotifyNowPlayingResponse>(
      NOW_PLAYING_ENDPOINT
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
