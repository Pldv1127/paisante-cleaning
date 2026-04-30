import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: { status: "approved" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        authorName: true,
        rating: true,
        text: true,
        createdAt: true,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json(
      { error: "Could not load reviews." },
      { status: 500 }
    );
  }
}