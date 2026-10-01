"use client";

import { useEffect, useRef, useState } from "react";

// Horizontal card row with prev/next buttons. Each button greys out at its end.
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
      className="flex h-11 w-11 items-center justify-center border border-black transition-opacity enabled:hover:bg-neutral-100 disabled:opacity-25 motion-reduce:transition-none"
    >
      {/* Left arrow is the right one mirrored */}
      <svg viewBox="0 0 24 24" className={`h-5 w-5 ${dir === -1 ? "-scale-x-100" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
