"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const messages: Record<string, { icon: string; title: string; body: string; color: string }> = {
  approved: {
    icon: "✅",
    title: "Review Published!",
    body: "The review has been approved and is now live on your website.",
    color: "#2C4A3E",
  },
  rejected: {
    icon: "🗑️",
    title: "Review Rejected",
    body: "The review has been rejected and will not appear on your website.",
    color: "#c0392b",
  },
  "already-used": {
    icon: "⚠️",
    title: "Link Already Used",
    body: "This approval link has already been used. The review status was already updated.",
    color: "#C9963A",
  },
  invalid: {
    icon: "❌",
    title: "Invalid Link",
    body: "This link is invalid or has expired. Please check your email for the correct link.",
    color: "#c0392b",
  },
  error: {
    icon: "⚠️",
    title: "Something went wrong",
    body: "There was an error processing your request. Please try again or contact your developer.",
    color: "#c0392b",
  },
};

function ReviewResultContent() {
  const params = useSearchParams();
  const status = params.get("status") || "error";
  const msg = messages[status] || messages.error;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAF7F2",
        fontFamily: "sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "1px solid #e0ddd8",
          borderRadius: "8px",
          padding: "48px 40px",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{msg.icon}</div>
        <h1 style={{ color: msg.color, marginBottom: "16px", fontSize: "1.5rem" }}>
          {msg.title}
        </h1>
        <p style={{ color: "#666", lineHeight: "1.7", marginBottom: "32px" }}>
          {msg.body}
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            background: "#2C4A3E",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "0.9rem",
          }}
        >
          Back to Website
        </a>
      </div>
    </div>
  );
}

export default function ReviewResultPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#FAF7F2" }} />}>
      <ReviewResultContent />
    </Suspense>
  );
}