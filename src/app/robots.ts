import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Search engines and AI assistants are welcome everywhere except the cart,
// checkout and APIs.
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/cart", "/checkout"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"].map(
        (userAgent) => ({ userAgent, allow: "/", disallow }),
      ),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
