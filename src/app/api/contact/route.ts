import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Save to database
    await db.contactSubmission.create({
      data: { name, email, phone: phone || "", service: service || "", message },
    });

    // Email to Val
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.VAL_EMAIL!,
      subject: `New Quote Request — ${service || "General Inquiry"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
          <h2 style="color:#2C4A3E;margin-bottom:24px;">New Quote Request 🧹</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:120px;">Name</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:500;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;">
                  <a href="mailto:${email}" style="color:#2C4A3E;">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;">
                  ${phone ? `<a href="tel:${phone}" style="color:#2C4A3E;">${phone}</a>` : "Not provided"}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;">Service</td>
                <td style="padding:10px 0;border-bottom:1px solid #eee;">${service || "Not specified"}</td></tr>
            <tr><td style="padding:10px 0;color:#666;vertical-align:top;padding-top:16px;">Message</td>
                <td style="padding:10px 0;padding-top:16px;">${message}</td></tr>
          </table>
          <div style="margin-top:32px;padding:20px;background:#f5f5f5;border-radius:4px;">
            <p style="margin:0;color:#666;font-size:14px;">
              Reply directly to this email to respond to ${name}, or call 
              ${phone ? `<a href="tel:${phone}">${phone}</a>` : "them"}.
            </p>
          </div>
        </div>
      `,
      // So Val can reply directly to the customer
      replyTo: email,
    });

    // Confirmation email to customer (best-effort — fails silently with test sender)
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: email,
        subject: "We received your request — Paisante Cleaning Services",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
            <h2 style="color:#2C4A3E;">Thank you, ${name}! 🌿</h2>
            <p style="color:#555;line-height:1.7;">
              We've received your request for <strong>${service || "cleaning services"}</strong>
              and will be in touch with you shortly to discuss your needs and provide a personalized quote.
            </p>
            <p style="color:#555;line-height:1.7;">
              If you need to reach us in the meantime, you can reply to this email or call us directly.
            </p>
            <p style="color:#555;line-height:1.7;margin-top:32px;">
              Warm regards,<br/>
              <strong style="color:#2C4A3E;">Val & the Paisante Cleaning Team</strong>
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Customer confirmation email failed:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}