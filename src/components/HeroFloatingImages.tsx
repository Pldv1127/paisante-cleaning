"use client";

import { useEffect, useRef } from "react";

interface FImg {
  src: string;
  cls: string;   // positions the wrapper via CSS
  w: number;
  h: number;
  speed: number; // parallax rate; sign sets direction
}

const IMGS: FImg[] = [
  { src: "/cleaning1.jpg", cls: "fi-w1", w: 275, h: 204, speed:  0.13 },
  { src: "/cleaning2.png", cls: "fi-w2", w: 218, h: 282, speed: -0.09 },
  { src: "/cleaning3.png", cls: "fi-w3", w: 252, h: 189, speed:  0.19 },
  { src: "/cleaning4.png", cls: "fi-w4", w: 228, h: 296, speed: -0.14 },
];

export default function HeroFloatingImages() {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function onScroll() {
      const s = window.scrollY;
      wrapRefs.current.forEach((el, i) => {
        if (!el) return;
        // --py cascades into .fi-img's transform without touching the wrapper's animation
        el.style.setProperty("--py", `${s * IMGS[i].speed}px`);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating-images" aria-hidden="true">
      {IMGS.map((img, i) => (
        <div
          key={img.src}
          ref={(el) => { wrapRefs.current[i] = el; }}
          className={`fi-wrap ${img.cls}`}
        >
          <img
            src={img.src}
            className="fi-img"
            style={{ width: img.w, height: img.h }}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
