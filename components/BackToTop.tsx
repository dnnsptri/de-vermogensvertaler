"use client";

import { useEffect, useState } from "react";

// Appears once the visitor has scrolled past the first screen, fades out again when the footer
// comes into view (it would sit on top of the footer content otherwise).
export function BackToTop() {
  const [scrolled, setScrolled] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const visible = scrolled && !atFooter;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const footer = document.querySelector("footer");
    const observer = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting));
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <a
      href="#top"
      aria-label="Terug naar boven"
      // Hidden buttons stay out of the tab order and can't be clicked
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-opacity duration-300 hover:bg-neutral-800 motion-reduce:transition-none ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}
