// POST /api/reviews/sync
// Fetches reviews from Google Places API and upserts any new ones into the DB
// as "approved" (they came from Google, so no moderation needed).
//
// Call this on a schedule once you have a Google Business Profile.
// Until GOOGLE_PLACE_ID + GOOGLE_PLACES_API_KEY are set, this is a no-op.

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { fetchGoogleReviews } from "@/lib/googleReviews";

export async function POST(req: Request) {
  // Simple shared-secret guard so only you can trigger a sync.
  const secret = req.headers.get("x-sync-secret");
  if (!secret || secret !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const reviews = await fetchGoogleReviews();

    if (reviews.length === 0) {
      return NextResponse.json({ synced: 0, message: "Google Reviews not configured yet." });
    }

    let synced = 0;
    for (const r of reviews) {
      const existing = await db.review.findUnique({ where: { googleId: r.googleId } });
      if (!existing) {
        await db.review.create({
          data: {
            googleId: r.googleId,
            authorName: r.authorName,
            rating: r.rating,
            text: r.text,
            googleTime: r.googleTime,
            status: "approved",
          },
        });
        synced++;
      }
    }

    return NextResponse.json({ synced, total: reviews.length });
  } catch (error) {
    console.error("Google Reviews sync error:", error);
    return NextResponse.json({ error: "Sync failed." }, { status: 500 });
  }
}
