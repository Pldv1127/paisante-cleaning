"use client";

import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.email || !form.message) {
      setErrorMsg("Please fill in your name, email, and message.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setState("success");
      setForm({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "" });
      window.gtag?.("event", "conversion", {
        send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/quote_request`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(message);
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="contact-form-wrap">
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🌿</div>
          <h3 style={{ color: "var(--forest)", fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", marginBottom: "12px" }}>
            Message Received!
          </h3>
          <p style={{ color: "var(--mid-gray)", lineHeight: "1.7", marginBottom: "24px" }}>
            Thank you for reaching out. Val will be in touch with you shortly to discuss your needs.
          </p>
          <button
            onClick={() => setState("idle")}
            style={{
              background: "var(--forest)", color: "#fff", border: "none",
              padding: "12px 28px", borderRadius: "2px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-wrap">
      <p className="form-title">Request a Free Quote</p>

      {state === "error" && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "4px",
          padding: "12px 16px", marginBottom: "20px", color: "#dc2626", fontSize: "0.9rem",
        }}>
          {errorMsg}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label>First Name</label>
          <input name="firstName" type="text" placeholder="Jane" value={form.firstName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input name="lastName" type="text" placeholder="Smith" value={form.lastName} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input name="phone" type="tel" placeholder="(XXX) XXX-XXXX" value={form.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Service Type</label>
        <select name="service" value={form.service} onChange={handleChange}>
          <option value="">Select a service…</option>
          <option>Residential Cleaning</option>
          <option>Commercial Cleaning</option>
          <option>Office Cleaning</option>
          <option>Medical Office Cleaning</option>
          <option>Post Construction</option>
          <option>Janitorial Services</option>
        </select>
      </div>
      <div className="form-group">
        <label>Tell Us About Your Space</label>
        <textarea
          name="message"
          placeholder="Describe your home or business, any special requirements, preferred schedule…"
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <button
        className="form-submit"
        onClick={handleSubmit}
        disabled={state === "loading"}
        style={{ opacity: state === "loading" ? 0.7 : 1, cursor: state === "loading" ? "not-allowed" : "pointer" }}
      >
        {state === "loading" ? "Sending…" : "Send My Request"}
      </button>
    </div>
  );
}