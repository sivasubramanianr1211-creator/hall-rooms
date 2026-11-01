import type { MetadataRoute } from "next";
import { localePath, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// Every page in both languages, each listing its other-language version.
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/rooms", priority: 0.9 },
  { path: "/hall", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/gallery", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/about", priority: 0.5 },
  { path: "/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap(({ path, priority }) =>
    locales.map((lang) => ({
      url: siteUrl + localePath(lang, path).replace(/^\/$/, ""),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, siteUrl + localePath(l, path).replace(/^\/$/, "")])),
      },
    })),
  );
}
