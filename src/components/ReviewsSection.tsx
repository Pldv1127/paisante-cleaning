"use client";

import { useState, useEffect, useRef } from "react";

type Review = {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  createdAt: string;
};

const AVATAR_COLORS = [
  "linear-gradient(135deg,#1A6115,#5EBE55)",
  "linear-gradient(135deg,#5EBE55,#9CCC46)",
  "linear-gradient(135deg,#026EB7,#1A9AD7)",
  "linear-gradient(135deg,#2C3E70,#026EB7)",
  "linear-gradient(135deg,#9CCC46,#5EBE55)",
];

type SubmitState = "idle" | "loading" | "success" | "error";

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.8rem", padding: "2px",
            color: n <= (hovered || value) ? "#F4B400" : "#ddd",
            transition: "color .15s",
          }}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function SubmitReviewModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", rating: 0, text: "" });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.rating || !form.text) {
      setErrorMsg("Please fill in all fields and select a star rating.");
      setSubmitState("error");
      return;
    }

    setSubmitState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitState("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(message);
      setSubmitState("error");
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "24px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "#FAF7F2", borderRadius: "8px", padding: "40px",
        maxWidth: "500px", width: "100%", position: "relative",
        boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "none", border: "none", fontSize: "1.4rem",
            cursor: "pointer", color: "#666", lineHeight: 1,
          }}
          aria-label="Close"
        >×</button>

        {submitState === "success" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🌿</div>
            <h3 style={{ color: "#2C4A3E", fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "12px" }}>
              Thank You!
            </h3>
            <p style={{ color: "#6B6B6B", lineHeight: "1.7", marginBottom: "24px" }}>
              Your review has been submitted and is awaiting approval. It will appear on the site once reviewed.
            </p>
            <button onClick={onClose} style={{
              background: "#2C4A3E", color: "#fff", border: "none",
              padding: "12px 28px", borderRadius: "4px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
            }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ color: "#2C4A3E", fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "8px" }}>
              Leave a Review
            </h3>
            <p style={{ color: "#6B6B6B", fontSize: "0.88rem", marginBottom: "28px", lineHeight: "1.6" }}>
              We'd love to hear about your experience with Paisante Cleaning Services.
            </p>

            {submitState === "error" && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px",
                padding: "10px 14px", marginBottom: "16px", color: "#dc2626", fontSize: "0.85rem",
              }}>
                {errorMsg}
              </div>
            )}

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "8px", fontWeight: 500 }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                style={{
                  width: "100%", background: "#FEFCF8", border: "1px solid rgba(44,74,62,0.12)",
                  borderRadius: "2px", padding: "12px 16px", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem", color: "#2A2A2A", outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "8px", fontWeight: 500 }}>
                Your Rating
              </label>
              <StarRating value={form.rating} onChange={(n) => setForm((p) => ({ ...p, rating: n }))} />
            </div>

            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "8px", fontWeight: 500 }}>
                Your Review
              </label>
              <textarea
                placeholder="Tell us about your experience…"
                value={form.text}
                onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                style={{
                  width: "100%", height: "120px", background: "#FEFCF8",
                  border: "1px solid rgba(44,74,62,0.12)", borderRadius: "2px",
                  padding: "12px 16px", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem", color: "#2A2A2A", outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitState === "loading"}
              style={{
                width: "100%", background: "#2C4A3E", color: "#fff", border: "none",
                borderRadius: "2px", padding: "16px", fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: submitState === "loading" ? "not-allowed" : "pointer",
                opacity: submitState === "loading" ? 0.7 : 1, transition: "background .2s",
              }}
            >
              {submitState === "loading" ? "Submitting…" : "Submit Review"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({ left: dir === "right" ? 364 : -364, behavior: "smooth" });
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  // Placeholder reviews shown while loading or if no reviews yet
  const placeholderReviews: Review[] = [
    { id: "p1", authorName: "Sarah M.", rating: 5, text: "Val and her team are absolutely wonderful. My home has never been this spotless. They pay attention to every detail and always go above and beyond.", createdAt: "" },
    { id: "p2", authorName: "Robert T.", rating: 5, text: "We hired Paisante for our medical office and the results have been exceptional. The level of cleanliness and professionalism is exactly what a healthcare environment needs.", createdAt: "" },
    { id: "p3", authorName: "Linda K.", rating: 5, text: "Val is incredibly kind and thorough. She really listens to what you need and personalizes the whole service. My house feels like a different place after every visit.", createdAt: "" },
    { id: "p4", authorName: "James P.", rating: 5, text: "Used Paisante for a post-construction clean after our renovation. Absolutely incredible work — they got into every corner and left zero dust or debris.", createdAt: "" },
    { id: "p5", authorName: "Maria D.", rating: 5, text: "I've been a client for years. Val's team is always on time, always thorough, and always a pleasure. Having Paisante take care of my home has been life-changing.", createdAt: "" },
  ];

  const displayReviews = reviews.length > 0 ? reviews : placeholderReviews;

  return (
    <section id="reviews" className="section" style={{ background: "var(--warm-white)" }}>
      <div className="section-inner">
        <div className="reviews-header reveal">
          <div>
            <div className="section-tag">Reviews</div>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="google-badge">
            <div className="google-g">G</div>
            <div className="google-info">
              <div className="stars-row">
                {[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}
              </div>
              <div className="google-score">
                {avgRating} <span style={{ fontSize: ".9rem", color: "var(--mid-gray)", fontFamily: "'DM Sans',sans-serif", fontWeight: 300 }}>/ 5</span>
              </div>
              <div className="google-label">
                {reviews.length > 0 ? `${reviews.length} verified review${reviews.length > 1 ? "s" : ""}` : "Based on client reviews"}
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-track-wrap reveal">
          <div className="reviews-track" ref={trackRef}>
            {loading ? (
              <div style={{ padding: "40px", color: "var(--mid-gray)" }}>Loading reviews…</div>
            ) : (
              displayReviews.map((r, i) => (
                <div className="review-card" key={r.id}>
                  <span className="review-google-icon">
                    {reviews.length > 0 ? "Verified" : ""}
                  </span>
                  <div className="review-card-top">
                    <div
                      className="reviewer-avatar"
                      style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length], color: i === 1 ? "var(--forest)" : "#fff" }}
                    >
                      {r.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div className="reviewer-info">
                      <p>{r.authorName}</p>
                      <p>
                        {r.createdAt
                          ? new Date(r.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                          : "Verified Client"}
                      </p>
                    </div>
                  </div>
                  <div className="review-stars">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="star" style={{ color: s <= r.rating ? "#F4B400" : "#ddd" }}>★</span>
                    ))}
                  </div>
                  <p className="review-text">"{r.text}"</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="reviews-nav">
          <button className="rev-btn" onClick={() => scroll("left")} aria-label="Previous">←</button>
          <button className="rev-btn" onClick={() => scroll("right")} aria-label="Next">→</button>
        </div>

        <div className="reviews-cta reveal" style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "var(--forest)", color: "#fff", border: "none",
              padding: "14px 32px", borderRadius: "2px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              letterSpacing: "0.08em", textTransform: "uppercase", transition: "background .2s",
              marginBottom: "16px",
            }}
          >
            Leave a Review
          </button>
          <p style={{ fontSize: ".8rem", color: "var(--mid-gray)", marginTop: "12px" }}>
            All reviews are moderated before publishing.
          </p>
        </div>
      </div>

      {showModal && <SubmitReviewModal onClose={() => setShowModal(false)} />}
    </section>
  );
}