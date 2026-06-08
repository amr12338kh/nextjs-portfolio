"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { NowPlayingItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

export const Spotify = ({ className }: { className?: string }) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const etagRef = useRef<string | null>(null);
  const POLLING_INTERVAL = 10000; // 10 seconds

  const fetchNowPlaying = useCallback(async () => {
    try {
      const headers: Record<string, string> = etagRef.current
        ? { "If-None-Match": etagRef.current }
        : {};

      const response = await axios.get("/api/spotify", { headers });

      if (response.status === 304) {
        return; // Song hasn't changed, skip update
      }

      const data = response.data;

      if (!data || !data.isPlaying) {
        setNowPlaying(null); // No song playing or it's an ad
      } else {
        setNowPlaying(data as NowPlayingItem);
      }

      // Store etag for next request to avoid unnecessary updates
      const etag = response.headers["etag"];
      if (etag) etagRef.current = etag;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 304) {
        return; // Song hasn't changed, skip update
      }
      console.error("Error fetching now playing:", error);
      setNowPlaying(null);
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