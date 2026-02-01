import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { BASE_URL } from "@/lib/config";

export async function POST(req) {
  const { content, ttl_seconds, max_views } = await req.json();

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "Content required" },
      { status: 400 }
    );
  }

  const id = nanoid(8);

  const data = { content };

  // ONLY store if present
  if (ttl_seconds != null) {
    data.expiresAt = Date.now() + ttl_seconds * 1000;
  }

  if (max_views != null) {
    data.remainingViews = max_views;
  }

  await redis.hset(`paste:${id}`, data);
  await redis.lpush("all_pastes", id);

  return NextResponse.json({
    id,
    url: `${BASE_URL}/p/${id}`,
  });
}
