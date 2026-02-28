// app/api/vault/route.ts
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

const TTL_SECONDS = 60 * 60 * 24; // 24 hours

/**
 * POST /api/vault
 * Body: { key: string, encrypted: string, iv: string }
 * Stores the encrypted message in Redis with 24h expiry.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key, encrypted, iv } = body;

    if (!key || !encrypted || !iv) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if a message already exists for this key
    const existing = await redis.get(key);
    if (existing) {
      return NextResponse.json(
        { error: "A message already exists for this password. Use a different password." },
        { status: 409 }
      );
    }

    await redis.set(key, JSON.stringify({ encrypted, iv }), { ex: TTL_SECONDS });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/vault error:", err);
    return NextResponse.json({ error: "Failed to store message" }, { status: 500 });
  }
}

/**
 * GET /api/vault?key=...
 * Retrieves and DELETES the encrypted message (burn after reading).
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 400 });
    }

    const raw = await redis.get<string>(key);

    if (!raw) {
      return NextResponse.json(
        { error: "No message found. It may have already been read or expired." },
        { status: 404 }
      );
    }

    // Burn after reading — delete immediately
    await redis.del(key);

    const { encrypted, iv } =
      typeof raw === "string" ? JSON.parse(raw) : raw;

    return NextResponse.json({ encrypted, iv });
  } catch (err) {
    console.error("GET /api/vault error:", err);
    return NextResponse.json({ error: "Failed to retrieve message" }, { status: 500 });
  }
}
