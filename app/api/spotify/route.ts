import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getNowPlaying();
    return NextResponse.json(data ?? { isPlaying: false });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
