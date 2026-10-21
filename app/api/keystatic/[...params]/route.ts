import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "@/keystatic.config";

// Server side of the editor: reads and saves the content files (locally) or talks to GitHub (Keystatic Cloud)
export const { POST, GET } = makeRouteHandler({ config });
