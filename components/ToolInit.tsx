"use client";

import { useEffect } from "react";
import { initTools } from "@/lib/tools";

// Runs the framework-free tool script on the server-rendered form. The standalone export
// (scripts/export-tools.mjs) runs the very same initTools, so site and export behave identically.
export function ToolInit() {
  useEffect(() => initTools(), []);
  return null;
}
