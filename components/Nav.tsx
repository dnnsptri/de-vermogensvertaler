"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Button, Logo } from "@/components/ui";

// Main menu, always on the green header (homepage hero and PageHero). Inline links from md up; below that
// a hamburger that opens a full-width green panel. Restored from tag decorated-v1, restyled for the brand.
export function Nav() {
  // Remember on which page the menu was opened: navigating elsewhere closes it without an effect
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  // While open, the page underneath doesn't scroll
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav aria-label="Hoofdmenu" className="hidden gap-x-8 md:flex">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className="py-1 text-base font-semibold text-white underline-offset-8 hover:underline aria-[current=page]:text-mustard"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile: the button is fixed in its header spot so it stays reachable while scrolling; mustard with a
          forest icon (like the buttons), so it shows on the green hero and on white sections alike. The spacer
          keeps the header layout intact. */}
      <span aria-hidden className="h-11 w-24 md:hidden" />
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Menu sluiten" : "Menu openen"}
        onClick={() => setOpen(!open)}
        className="fixed right-4 top-5 z-50 flex items-center gap-2 text-sm font-semibold text-mustard md:hidden"
      >
        <span aria-hidden>{open ? "Sluit" : "Menu"}</span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mustard text-forest">
          <svg viewBox="0 0 24 24" className={`h-5 w-5 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </span>
      </button>

      {/* Panel and backdrop stay mounted so they can animate out as well as in: the panel slides down from the
          top, the backdrop fades. Closed = invisible (after the slide) and inert, so it can't be tapped or tabbed. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-forest-deep/50 transition-[opacity,visibility] duration-300 motion-reduce:transition-none md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <nav
        id="mobile-menu"
        aria-label="Hoofdmenu"
        inert={!open}
        className={`fixed inset-x-0 top-0 z-40 max-h-dvh overflow-y-auto bg-forest-deep px-4 pb-12 pt-20 text-white shadow-2xl transition-[translate,visibility] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none md:hidden ${
          open ? "visible translate-y-0" : "invisible -translate-y-full"
        }`}
      >
        <ul>
          {[{ label: "Home", href: "/" }, ...site.nav].map((item, i) => (
            <li
              key={item.href}
              // Items follow the panel in one by one; on close they go with it at once
              style={{ transitionDelay: open ? `${150 + i * 50}ms` : "0ms" }}
              className={`border-b border-white/15 transition-[opacity,translate] duration-500 ease-out last:border-b-0 motion-reduce:transition-none ${
                open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              {/* Anchor links on the same page don't change the route, so close explicitly */}
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block py-4 font-serif text-3xl aria-[current=page]:text-mustard"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Same booking action as the hero; closes the panel because the anchor doesn't change the route */}
        <div className="mt-6" onClick={() => setOpen(false)}>
          <Button href={`/${site.booking.href}`}>{site.booking.label}</Button>
        </div>
        {/* Sign-off: logo centred, with the same space above as below it */}
        <div className="mt-12 flex justify-center">
          <Logo name={site.name} dark />
        </div>
      </nav>
    </>
  );
}
