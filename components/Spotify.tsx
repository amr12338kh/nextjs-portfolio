"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  spotifyApi,
  getSpotifyAccessToken,
  SPOTIFY_NOW_PLAYING_ENDPOINT,
} from "@/lib/spotify";
import { NowPlayingItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Spotify = ({ className }: { className?: string }) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const etagRef = useRef<string | null>(null);
  const POLLING_INTERVAL = 10000; // 10 seconds

  const fetchNowPlaying = useCallback(async () => {
    try {
      setError(null);
      const accessToken = await getSpotifyAccessToken();
      spotifyApi.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;

      const headers: Record<string, string> = etagRef.current
        ? { "If-None-Match": etagRef.current }
        : {};

      const response = await spotifyApi.get(SPOTIFY_NOW_PLAYING_ENDPOINT, {
        headers,
      });

      if (response.status === 304) {
        return; // Song hasn't changed, skip update
      }

      if (response.data) {
        etagRef.current = response.headers.etag;

        // Check if the response corresponds to an ad
        if (
          !response.data.item ||
          response.data.currently_playing_type === "ad"
        ) {
          setNowPlaying(null); // No song playing or it's an ad
        } else {
          const { item, is_playing } = response.data;
          setNowPlaying({
            albumImageUrl: item.album.images[0]?.url ?? "",
            artist: item.artists
              .map((artist: { name: string }) => artist.name)
              .join(", "),
            isPlaying: is_playing,
            songUrl: item.external_urls.spotify,
            title: item.name,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching now playing:", error);
      setError(
        error instanceof Error
          ? error
          : new Error("Failed to fetch now playing data")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  if (loading) {
    return (
      <p className="flex items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting to
        Spotify...
      </p>
    );
  }

  if (error) {
    return <p>Error loading Spotify: {error.message}</p>;
  }

  if (!nowPlaying || !nowPlaying.isPlaying) {
    return (
      <div className="flex gap-2 items-center">
        <Image src="/svg/spotify.svg" alt="spotify" width={22} height={22} />
        <span className="font-semibold">Currently offline</span>
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <div className="flex gap-2 items-center">
        <Image src="/svg/spotify.svg" alt="spotify" width={22} height={22} />
        <span className="font-semibold text-sm">Now playing:</span>
      </div>
      <div className="flex mt-4">
        <Link
          className="flex gap-2 items-center flex-wrap"
          href={nowPlaying.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {nowPlaying.albumImageUrl && (
            <Image
              src={nowPlaying.albumImageUrl}
              alt={`${nowPlaying.title} album art`}
              width={32}
              height={32}
              className="rounded-md"
            />
          )}
          <p>{nowPlaying.title}</p>
          <span>—</span>
          <p className="line-clamp-1">{nowPlaying.artist}</p>
        </Link>
      </div>
    </div>
  );
};
