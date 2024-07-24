"use client";
import { useEffect, useState } from "react";
import getNowPlayingItem from "@/lib/spotify";
import Image from "next/image";
import Link from "next/link";
import { NowPlayingData } from "@/types";

export const Spotify = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<NowPlayingData | null>(null);
  const [error, setError] = useState<Error | null>(null); // State for error handling

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const nowPlayingItem = await getNowPlayingItem();
        setResult(nowPlayingItem);
      } catch (error) {
        console.error("Error fetching now playing item:", error);
        if (error instanceof Error) {
          setError(error); // Set error state
        } else {
          console.error("Unexpected error type:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying(); // Fetch initially
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval);
  }, [result?.isPlaying]); // Re-fetch only on isPlaying change

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div className="error">
        {/* Display user-friendly error message here */}
        <p>An error occurred while fetching data.</p>
      </div>
    );
  }

  if (result?.isPlaying) {
    return (
      <div className="rounded-lg">
        <div className="flex gap-2 items-center">
          <Image src="/svg/spotify.svg" alt="spotify" width={22} height={22} />
          <span className="font-semibold text-sm">Now playing:</span>
        </div>
        <Link
          className="flex gap-2 flex-wrap items-center mt-4"
          href={`${result.songUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {result.albumImageUrl && (
            <Image
              src={result.albumImageUrl}
              alt={`${result.title} album art`}
              width={32}
              height={32}
              className="rounded-md"
            />
          )}
          <p>{result.title}</p>
          <span>—</span>
          <p>{result.artist}</p>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-center">
      <Image src="/svg/spotify.svg" alt="spotify" width={22} height={22} />
      <span className="font-semibold">Currently offline</span>
    </div>
  );
};
