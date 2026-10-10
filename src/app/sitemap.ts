import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...products.map((p) => ({
      url: `${SITE_URL}/pharma/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.featured ? 0.9 : 0.8,
    })),
    { url: `${SITE_URL}/tech`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...["shipping-policy", "refund-policy", "privacy", "terms"].map((s) => ({
      url: `${SITE_URL}/${s}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
