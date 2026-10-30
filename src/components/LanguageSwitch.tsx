"use client";

import { usePathname } from "next/navigation";
import { switchPath, type Locale } from "@/lib/i18n";

const options: { lang: Locale; label: string; title: string }[] = [
  { lang: "en", label: "EN", title: "English" },
  { lang: "ta", label: "தமிழ்", title: "தமிழ்" },
];

// Links to the same page in the other language. Plain <a> because the two
// languages use separate root layouts, which needs a full page load anyway.
// Phones get a single button for the other language to leave room for the logo.
export default function LanguageSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const other = options.find((o) => o.lang !== lang)!;

  return (
    <>
      <a
        href={switchPath(pathname, other.lang)}
        hrefLang={other.lang}
        lang={other.lang}
        title={other.title}
        className="flex h-9 items-center rounded-md border border-gold-400/50 px-2.5 text-sm leading-none text-gold-300 transition hover:bg-gold-400/10 sm:hidden"
      >
        {other.label}
      </a>
      <div
        className="hidden h-9 overflow-hidden rounded-md border border-gold-400/50 text-sm sm:flex"
        role="group"
        aria-label="Language / மொழி"
      >
        {options.map((o) => {
          const active = o.lang === lang;
          return (
            <a
              key={o.lang}
              href={switchPath(pathname, o.lang)}
              hrefLang={o.lang}
              lang={o.lang}
              title={o.title}
              aria-current={active ? "true" : undefined}
              className={`flex items-center px-2.5 leading-none transition ${
                active ? "bg-gold-400 font-semibold text-ink-950" : "text-gold-300 hover:bg-gold-400/10"
              }`}
            >
              {o.label}
            </a>
          );
        })}
      </div>
    </>
  );
}
