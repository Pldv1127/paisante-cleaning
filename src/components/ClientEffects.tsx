"use client";

import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    // ── Nav scroll shadow ──────────────────────────────────
    const nav = document.getElementById("mainNav");
    const handleScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── Scroll reveal ──────────────────────────────────────
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

    // ── FAQ accordion ──────────────────────────────────────
    const faqButtons = document.querySelectorAll<HTMLButtonElement>(".faq-question");

    const handleFAQClick = (btn: HTMLButtonElement) => {
      const item = btn.closest<HTMLElement>(".faq-item");
      if (!item) return;
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      if (!answer) return;

      const isOpen = item.classList.contains("open");

      // Close all open items
      document.querySelectorAll<HTMLElement>(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        const openAnswer = openItem.querySelector<HTMLElement>(".faq-answer");
        if (openAnswer) openAnswer.style.maxHeight = "0";
        openItem
          .querySelector<HTMLButtonElement>(".faq-question")
          ?.setAttribute("aria-expanded", "false");
      });

      // Open the clicked one if it was closed
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    };

    faqButtons.forEach((btn) => {
      btn.addEventListener("click", () => handleFAQClick(btn));
    });

    // ── Cleanup on unmount ─────────────────────────────────
    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      faqButtons.forEach((btn) => {
        btn.removeEventListener("click", () => handleFAQClick(btn));
      });
    };
  }, []); // empty array = runs once after first render, never on server

  return null; // renders nothing, just runs effects
}