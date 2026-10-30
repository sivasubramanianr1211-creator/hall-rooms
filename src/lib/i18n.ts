// English pages live at /, /rooms, ...; Tamil copies at /ta, /ta/rooms, ...

export const locales = ["en", "ta"] as const;
export type Locale = (typeof locales)[number];

// Content text: a plain string (same in both languages) or a translation pair.
// An empty Tamil value falls back to English.
export type Text = string | { en: string; ta: string };

export function tx(text: Text, lang: Locale): string {
  if (typeof text === "string") return text;
  return (lang === "ta" && text.ta) || text.en;
}

export function localePath(lang: Locale, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/ta" : `/ta${path}`;
}

// Same page in the other language.
export function switchPath(pathname: string, to: Locale) {
  const base = pathname === "/ta" ? "/" : pathname.startsWith("/ta/") ? pathname.slice(3) : pathname;
  return localePath(to, base.replace(/\.html$/, ""));
}
