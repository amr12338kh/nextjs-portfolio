// app/api/rebuild-studio/route.ts
import { NextResponse } from "next/server";

const VERCEL_BUILD_HOOK = process.env.VERCEL_BUILD_HOOK;

export async function POST() {
  try {
    if (!VERCEL_BUILD_HOOK) {
      throw new Error("VERCEL_BUILD_HOOK environment variable is not set");
    }

    const response = await fetch(VERCEL_BUILD_HOOK, { method: "POST" });

    if (!response.ok) {
      throw new Error(`Failed to trigger rebuild: ${response.statusText}`);
    }

    return NextResponse.json({ message: "Rebuild triggered successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error triggering rebuild", error },
      { status: 500 }
    );
  }
}
