import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const token = new URL(req.url).searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/review-result?status=invalid", req.url)
      );
    }

    const review = await db.review.findUnique({
      where: { approvalToken: token },
    });

    if (!review) {
      return NextResponse.redirect(
        new URL("/review-result?status=invalid", req.url)
      );
    }

    if (review.status !== "pending") {
      return NextResponse.redirect(
        new URL("/review-result?status=already-used", req.url)
      );
    }

    await db.review.update({
      where: { approvalToken: token },
      data: {
        status: "rejected",
        approvalToken: null,
      },
    });

    return NextResponse.redirect(
      new URL("/review-result?status=rejected", req.url)
    );
  } catch (error) {
    console.error("Reject review error:", error);
    return NextResponse.redirect(
      new URL("/review-result?status=error", req.url)
    );
  }
}