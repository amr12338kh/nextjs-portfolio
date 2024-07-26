"use client";

import { useEffect, useState } from "react";
import { getNowPlaying } from "@/lib/spotify";
import Image from "next/image";
import Link from "next/link";
import { NowPlayingItem } from "@/types";
import { Loader2 } from "lucide-react";

export const Spotify = () => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const item = await getNowPlaying();
        setNowPlaying(item);
        setError(null);
      } catch (err) {
        console.error("Error fetching now playing item:", err);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval);
  }, [nowPlaying?.isPlaying]);

  if (loading)
    return (
      <p className="flex items-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
      </p>
    );

  if (error) {
    return <p>Error: {error.message}</p>;
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
    <div className="rounded-lg">
      <div className="flex gap-2 items-center">
        <Image src="/svg/spotify.svg" alt="spotify" width={22} height={22} />
        <span className="font-semibold text-sm">Now playing:</span>
      </div>
      <Link
        className="flex gap-2 flex-wrap items-center mt-4"
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
        <p>{nowPlaying.artist}</p>
      </Link>
    </div>
  );
};
