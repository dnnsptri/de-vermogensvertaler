import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

// Alberta's editor: outside app/(site), so no site footer, cookie bar or Analytics. Never indexed.
export const metadata: Metadata = { title: "Teksten bewerken", robots: { index: false, follow: false } };

export default function Layout() {
  return <KeystaticApp />;
}
