"use client";

import { useEffect, useState } from "react";
import { Arrow } from "@/components/ui";

// Appears once the visitor has scrolled past the first screen. Dissolves while it sits over a green
// area (sections marked data-green, plus the footer): a green disc on green would just disappear anyway.
export function BackToTop() {
  const [scrolled, setScrolled] = useState(false);
  const [overGreen, setOverGreen] = useState(false);
  const visible = scrolled && !overGreen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Watch only the bottom 15% of the screen, where the button lives
    const inside = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inside.add(e.target);
          else inside.delete(e.target);
        }
        setOverGreen(inside.size > 0);
      },
      { rootMargin: "-85% 0px 0px 0px" },
    );
    document.querySelectorAll("[data-green], footer").forEach((el) => observer.observe(el));

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
      // 56px target (above the 44px minimum). Mobile: clears the iPhone home indicator via safe-area insets;
      // press feedback replaces hover on touch. Hiding = dissolve: fade, slight blur and shrink.
      className={`group fixed bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-[max(1.5rem,calc(env(safe-area-inset-right)+0.75rem))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-forest shadow-[0_8px_24px_-8px_rgba(21,22,16,0.45)] transition-[opacity,scale,filter] duration-500 ease-out [-webkit-tap-highlight-color:transparent] active:scale-90 motion-reduce:transition-none ${
        visible ? "opacity-100" : "pointer-events-none scale-75 opacity-0 blur-sm"
      }`}
    >
      {/* Plain up arrow: the flower has no direction, an "up" button needs one. White on forest: 9:1 */}
      <Arrow className="h-6 w-6 -rotate-90 text-white transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none" />
    </a>
  );
}
