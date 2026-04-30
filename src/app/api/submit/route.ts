import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, rating, text } = await req.json();

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: "Name, rating, and review text are required." },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 }
      );
    }

    if (text.length < 10) {
      return NextResponse.json(
        { error: "Please write a bit more in your review." },
        { status: 400 }
      );
    }

    // Generate a unique one-time approval token
    const approvalToken = crypto.randomBytes(32).toString("hex");

    // Save review as pending
    const review = await db.review.create({
      data: {
        googleId: `manual_${crypto.randomBytes(16).toString("hex")}`,
        authorName: name,
        rating: parseInt(rating),
        text,
        googleTime: new Date(),
        status: "pending",
        approvalToken,
      },
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const approveUrl = `${siteUrl}/api/approve?token=${approvalToken}`;
    const rejectUrl = `${siteUrl}/api/reject?token=${approvalToken}`;
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

    // Send approval email to Val — non-blocking so a mail failure doesn't fail the submission
    resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.VAL_EMAIL!,
      subject: `New Review from ${name} — ${stars}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h2 style="color:#2C4A3E;">New Review Awaiting Approval</h2>
          
          <div style="background:#FAF7F2;border:1px solid #e0ddd8;border-radius:8px;padding:24px;margin:24px 0;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
              <div style="width:44px;height:44px;border-radius:50%;background:#2C4A3E;color:#fff;
                          display:flex;align-items:center;justify-content:center;
                          font-size:18px;font-weight:bold;text-align:center;line-height:44px;">
                ${name.charAt(0).toUpperCase()}
              </div>
              <div>
                <strong style="color:#2C4A3E;">${name}</strong><br/>
                <span style="color:#F4B400;font-size:18px;">${stars}</span>
                <span style="color:#666;font-size:14px;"> (${review.rating}/5)</span>
              </div>
            </div>
            <p style="color:#444;line-height:1.7;font-style:italic;margin:0;">"${text}"</p>
          </div>

          <p style="color:#666;font-size:14px;margin-bottom:24px;">
            Choose what to do with this review:
          </p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding-right:12px;">
                <a href="${approveUrl}" 
                   style="display:block;background:#2C4A3E;color:#fff;text-align:center;
                          padding:16px 24px;border-radius:4px;text-decoration:none;
                          font-weight:600;font-size:16px;">
                  ✅ Approve &amp; Publish
                </a>
              </td>
              <td>
                <a href="${rejectUrl}"
                   style="display:block;background:#c0392b;color:#fff;text-align:center;
                          padding:16px 24px;border-radius:4px;text-decoration:none;
                          font-weight:600;font-size:16px;">
                  ❌ Reject
                </a>
              </td>
            </tr>
          </table>

          <p style="color:#999;font-size:12px;margin-top:32px;border-top:1px solid #eee;padding-top:16px;">
            This review will remain pending until you take action. 
            These links can only be used once.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been submitted and is awaiting approval.",
    });
  } catch (error) {
    console.error("Submit review error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}