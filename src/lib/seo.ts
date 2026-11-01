import type { Metadata } from "next";
import { business } from "@/content/business";
import { localePath, tx, type Locale } from "./i18n";

// The live address of the site, used for canonical links, the sitemap and
// social previews. Set NEXT_PUBLIC_SITE_URL in Netlify when you move to your
// own domain (or rename the Netlify site).
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://raja-valamburi.netlify.app").replace(/\/$/, "");

export const shareImage = { url: "/images/exterior.jpg", width: 1600, height: 900 };

// Shared by both languages' root layouts.
export function siteMetadata(lang: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: tx(business.fullName, lang),
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    // Google Search Console → Add property → HTML tag → the content="..." value.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
    }),
  };
}

// Title, description, canonical URL, English/Tamil alternates and the social
// preview for one page. `path` is the English path, e.g. "/rooms".
export function pageMetadata(lang: Locale, path: string, title: string, description?: string): Metadata {
  const url = localePath(lang, path);
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: path, ta: localePath("ta", path), "x-default": path },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: tx(business.fullName, lang),
      locale: lang === "ta" ? "ta_IN" : "en_IN",
      alternateLocale: lang === "ta" ? "en_IN" : "ta_IN",
      images: [{ ...shareImage, alt: tx(business.fullName, lang) }],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  };
}
