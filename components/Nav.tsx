"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { label: string; href: string };

// Inline links from md up; below that a hamburger that opens a full-width panel.
export function Nav({ items }: { items: Item[] }) {
  // Remember on which page the menu was opened: navigating elsewhere closes it without an effect
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav aria-label="Hoofdmenu" className="hidden gap-x-5 text-sm md:flex">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="underline-offset-4 hover:underline">
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: the button is fixed in its header spot so it stays reachable while scrolling;
          this spacer keeps the header layout intact */}
      <span aria-hidden className="h-11 w-11 md:hidden" />
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center border border-black bg-white md:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav id="mobile-menu" aria-label="Hoofdmenu" className="fixed inset-x-0 top-0 z-40 border-b border-black bg-white px-4 pt-20 pb-6 md:hidden">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                {/* Anchor links on the same page don't change the route, so close explicitly */}
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-3 text-lg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
