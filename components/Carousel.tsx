"use client";

import { useEffect, useRef, useState } from "react";

// Horizontal card row with hand-drawn prev/next buttons. Each button greys out at its end.
export function Carousel({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    // ResizeObserver also fires once on observe, which sets the initial state
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  // Scroll one card (card width + gap) at a time
  const go = (dir: -1 | 1) => {
    const el = ref.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <ul ref={ref} aria-label={label} className={className}>
        {children}
      </ul>
      <div className="mt-6 flex justify-center gap-4">
        <ArrowButton dir={-1} disabled={atStart} onClick={() => go(-1)} />
        <ArrowButton dir={1} disabled={atEnd} onClick={() => go(1)} />
      </div>
    </>
  );
}

function ArrowButton({ dir, disabled, onClick }: { dir: -1 | 1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Volgende" : "Vorige"}
      className="h-12 w-12 transition-opacity enabled:hover:scale-105 disabled:opacity-25 motion-reduce:transition-none"
    >
      {/* Wobbly circle and arrow to match the illustrations; the left one is the right one mirrored */}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={dir === -1 ? "-scale-x-100" : ""}
      >
        <path d="M24 3.5c11-.4 20.6 8.4 20.3 20.6-.3 10.8-9.3 20.3-20.8 20.1C12 44 3.2 35.3 3.6 23.6 4 12.6 12.4 3.9 24.8 4.4" />
        <path d="M14.5 24.3c6.2-.4 12.4-.5 18.6-.2M27 17.6c2.3 2.1 4.3 4.3 6.2 6.6-2.1 2.2-4.1 4.5-6 6.9" />
      </svg>
    </button>
  );
}
