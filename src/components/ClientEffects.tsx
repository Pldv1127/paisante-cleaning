"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {

    // ── Scroll progress bar (squeegee across the top) ────────
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.prepend(progressBar);

    // ── Nav scroll shadow ────────────────────────────────────
    const nav = document.getElementById("mainNav");

    const handleScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 40);
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = Math.min((scrolled / total) * 100, 100) + "%";
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── Squeegee wipe reveal for section titles ──────────────
    // Applied below-the-fold only — hero title is visible on load so skip it
    const wipeTitles = document.querySelectorAll<HTMLElement>(".section-title");
    wipeTitles.forEach((el) => el.classList.add("wipe-init"));

    // We observe the unclipped .reveal ancestor rather than the title element
    // itself. clip-path:inset(0 100% 0 0) reduces the element's visual area to
    // zero, so Chrome's IntersectionObserver reports ratio=0 and never fires
    // isIntersecting:true — keeping the title hidden forever.
    const wipeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const container = entry.target as HTMLElement;
          wipeObserver.unobserve(container);
          const el = container.querySelector<HTMLElement>(".section-title");
          if (!el) return;

          // Wait for the parent .reveal to start fading in (700ms transition)
          // before triggering the clip-path animation so it's actually visible.
          setTimeout(() => {
            el.classList.add("wipe-play");

            const r = el.getBoundingClientRect();
            const glove = document.createElement("span");
            glove.className = "wipe-glove";
            document.body.appendChild(glove);

            // All positioning is in the keyframe transforms (not top/left CSS props).
            // body has overflow-x:hidden which makes Chrome treat it as a scroll
            // container — position:fixed elements then drift vertically during scroll.
            // Compositor-driven transforms are immune to this.
            const gloveH = 90;
            const y = r.top + r.height / 2 - gloveH / 2;
            glove.animate(
              [
                { transform: `translate(${r.left - 30}px, ${y}px)`, opacity: 1 },
                { transform: `translate(${r.left + r.width * 0.8}px, ${y}px)`, opacity: 1, offset: 0.8 },
                { transform: `translate(${r.left + r.width + 30}px, ${y}px)`, opacity: 0 },
              ],
              { duration: 850, easing: "cubic-bezier(.22,.61,.36,1)" }
            ).onfinish = () => glove.remove();

            // Spark burst at the four title corners when the wipe finishes
            setTimeout(() => {
              el.style.position = "relative";
              const sparks = [
                { l: "-14px", t: "-14px" },
                { l: "calc(100% + 6px)", t: "-10px" },
                { l: "calc(100% + 10px)", t: "calc(100% + 6px)" },
                { l: "-10px", t: "calc(100% + 8px)" },
              ];
              sparks.forEach(({ l, t }, i) => {
                const spark = document.createElement("span");
                spark.className = "section-spark";
                spark.style.left = l;
                spark.style.top  = t;
                spark.style.animationDelay = i * 0.1 + "s";
                el.appendChild(spark);
                setTimeout(() => spark.remove(), 1000 + i * 100);
              });
            }, 850);
          }, 380);
        });
      },
      { threshold: 0.25 }
    );
    wipeTitles.forEach((el) => {
      const reveal = el.closest<HTMLElement>(".reveal");
      wipeObserver.observe(reveal ?? el);
    });

    // ── Scroll reveal (fade + lift for non-title elements) ───
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => (entry.target as HTMLElement).classList.add("visible"),
              i * 80
            );
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    // ── Stat counter animation ───────────────────────────────
    const counters = document.querySelectorAll<HTMLElement>(".stat-num");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const raw = el.textContent ?? "0";
          const numeric = parseInt(raw.replace(/\D/g, ""), 10);
          const suffix = raw.replace(/[0-9]/g, "");
          const steps = 48;
          const interval = 1100 / steps;
          let current = 0;
          const inc = numeric / steps;
          const timer = setInterval(() => {
            current = Math.min(current + inc, numeric);
            el.textContent = Math.floor(current) + suffix;
            if (current >= numeric) clearInterval(timer);
          }, interval);
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));

    // ── Water ripple on button clicks ────────────────────────
    const rippleTargets = document.querySelectorAll<HTMLElement>(
      ".btn-primary, .nav-cta, .form-submit, .rev-btn, .mission-cta"
    );
    const handleRipple = (e: MouseEvent) => {
      const btn = e.currentTarget as HTMLElement;
      btn.querySelector(".btn-ripple")?.remove();
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 750);
    };
    rippleTargets.forEach((btn) =>
      btn.addEventListener("click", handleRipple as EventListener)
    );

    // ── Steam wisps on the standards section ─────────────────
    const standards = document.getElementById("standards");
    if (standards) {
      standards.style.position = "relative";
      standards.style.overflow = "hidden";
      for (let i = 0; i < 7; i++) {
        const wisp = document.createElement("div");
        wisp.className = "steam-wisp";
        wisp.style.left = 6 + i * 13 + "%";
        wisp.style.animationDelay = i * 0.65 + "s";
        wisp.style.animationDuration = 3.2 + (i % 3) * 0.9 + "s";
        standards.appendChild(wisp);
      }
    }

    // ── FAQ accordion ─────────────────────────────────────────
    const faqButtons = document.querySelectorAll<HTMLButtonElement>(".faq-question");
    const handleFAQ = (btn: HTMLButtonElement) => {
      const item = btn.closest<HTMLElement>(".faq-item");
      if (!item) return;
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      if (!answer) return;
      const isOpen = item.classList.contains("open");
      document.querySelectorAll<HTMLElement>(".faq-item.open").forEach((open) => {
        open.classList.remove("open");
        const a = open.querySelector<HTMLElement>(".faq-answer");
        if (a) a.style.maxHeight = "0";
        open.querySelector<HTMLButtonElement>(".faq-question")?.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    };
    faqButtons.forEach((btn) =>
      btn.addEventListener("click", () => handleFAQ(btn))
    );

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      window.removeEventListener("scroll", handleScroll);
      progressBar.remove();
      revealObserver.disconnect();
      wipeObserver.disconnect();
      counterObserver.disconnect();
      rippleTargets.forEach((btn) =>
        btn.removeEventListener("click", handleRipple as EventListener)
      );
    };
  }, []);

  return null;
}
