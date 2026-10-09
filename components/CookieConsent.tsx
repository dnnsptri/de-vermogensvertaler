"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { site } from "@/content/site";

// Google Analytics only loads AFTER the visitor clicks "Akkoord" (AP guidance: GA needs consent).
// The choice is stored in this browser; the footer link "Cookie-instellingen" reopens the bar,
// and withdrawing consent removes the GA cookies.
const KEY = "vv-cookie-consent"; // "granted" | "denied"
const OPEN_EVENT = "vv:cookie-settings";
const CHANGE_EVENT = "vv:cookie-change";

type Choice = "granted" | "denied" | null;

function readChoice(): Choice {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function clearGaCookies() {
  // GA4 sets _ga and _ga_<id> on the registrable domain; expire them on both host and domain
  const domain = location.hostname.replace(/^www\./, "");
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
}

// Stored choice as an external store: stays in sync across tabs (storage event) and after a decision
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function CookieConsent() {
  // undefined on the server (unknown), so the bar never flashes in the server-rendered HTML
  const choice = useSyncExternalStore<Choice | undefined>(subscribe, readChoice, () => undefined);
  const [reopened, setReopened] = useState(false);
  const open = reopened || choice === null;

  // Declined: remove any GA cookies left over from an earlier visit
  useEffect(() => {
    if (choice === "denied") clearGaCookies();
  }, [choice]);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = (next: "granted" | "denied") => {
    const wasGranted = choice === "granted";
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    setReopened(false);
    if (next === "denied" && wasGranted) {
      // GA is already running in this page: switch it off first (Google's own opt-out flag),
      // otherwise it rewrites its cookie on unload; then remove the cookies and reload without GA
      (window as unknown as Record<string, boolean>)[`ga-disable-${site.gaId}`] = true;
      clearGaCookies();
      location.reload();
      return;
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return (
    <>
      {choice === "granted" && site.gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookies"
          className="fixed inset-x-4 bottom-4 z-[60] rounded-2xl bg-cream p-5 text-ink shadow-[0_12px_40px_-12px_rgba(21,22,16,0.45)] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-sm"
        >
          <div className="flex gap-4">
            <CookieIcon className="h-8 w-8 shrink-0 text-forest" />
            <div>
              <p className="text-sm">
                {/* OURS: short consent text, for Alberta to approve */}
                Ik gebruik analytische cookies (Google Analytics) om te zien hoe de site wordt gebruikt. Alleen als
                jij dat goed vindt.{" "}
                <Link href={site.privacyHref} className="underline underline-offset-2">
                  Privacyverklaring
                </Link>
              </p>
              {/* Equal weight for both choices: no nudging towards "Akkoord" */}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => decide("granted")}
                  className="flex-1 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-deep"
                >
                  Akkoord
                </button>
                <button
                  type="button"
                  onClick={() => decide("denied")}
                  className="flex-1 rounded-full border border-forest px-4 py-2.5 text-sm font-semibold text-forest hover:bg-forest hover:text-white"
                >
                  Weigeren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Footer link that reopens the bar, so consent can be withdrawn as easily as it was given
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Cookie-instellingen
    </button>
  );
}

function CookieIcon({ className = "" }: { className?: string }) {
  // Round cookie with a bite and chocolate chips, line style to match the arrows and logo
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M21 12.5A9 9 0 1 1 11.5 3a3 3 0 0 0 3.5 3.5 3 3 0 0 0 3.5 3.5 3 3 0 0 0 2.5 2.5z" />
      <circle cx="8.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="14" cy="15" r="1" fill="currentColor" />
      <circle cx="9" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}
