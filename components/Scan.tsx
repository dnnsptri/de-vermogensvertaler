"use client";

import { useState } from "react";
import Link from "next/link";
import type { ScanTool } from "@/content/site";
import { site } from "@/content/site";

// Dummy scan: one dropdown, one result. Alberta's real scoring logic replaces this.
export function Scan({ question, options }: ScanTool) {
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="border border-black bg-white p-6 md:p-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(options.find((o) => o.label === choice)?.result ?? null);
        }}
      >
        <label htmlFor="scan-q" className="block font-semibold">
          {question}
        </label>
        <select
          id="scan-q"
          required
          value={choice}
          onChange={(e) => {
            setChoice(e.target.value);
            setResult(null);
          }}
          className="mt-3 w-full border border-black bg-white px-5 py-3"
        >
          <option value="" disabled>
            Kies een antwoord
          </option>
          {options.map((o) => (
            <option key={o.label}>{o.label}</option>
          ))}
        </select>
        <button type="submit" className="mt-6 w-full bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800">
          Bekijk mijn uitkomst
        </button>
      </form>

      <div aria-live="polite">
        {result && (
          <div className="mt-8 border-t border-black pt-6">
            <p className="text-lg">{result}</p>
            <Link href={site.bookingCta.href} className="mt-4 inline-block underline underline-offset-4">
              {site.bookingCta.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
