import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Geist, Playfair_Display } from "next/font/google";
import ConsentBanner from "@/components/ConsentBanner";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import LanguageSwitch from "@/components/LanguageSwitch";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { business, fullAddress } from "@/content/business";
import { dict } from "@/lib/dictionary";
import { localePath, tx, type Locale } from "@/lib/i18n";
import { gaId, telHref } from "@/lib/site";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

type NavItem = { href: string; label: string; external?: boolean };

// Internal pages use Link; the map opens Google Maps in a new tab.
function NavLink({ item, className }: { item: NavItem; className: string }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener" className={className}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

// Root <html> for one language. Each language has its own root layout so the
// page carries the right lang attribute and fonts.
export default function SiteShell({
  lang,
  fontClassName = "",
  children,
}: {
  lang: Locale;
  fontClassName?: string;
  children: ReactNode;
}) {
  const t = dict(lang);
  const nav: NavItem[] = [
    { href: localePath(lang, "/hall"), label: t.nav.hall },
    { href: localePath(lang, "/rooms"), label: t.nav.rooms },
    { href: localePath(lang, "/gallery"), label: t.nav.gallery },
    { href: localePath(lang, "/about"), label: t.nav.about },
    { href: localePath(lang, "/faq"), label: t.nav.faq },
    ...(business.mapsUrl ? [{ href: business.mapsUrl, label: t.nav.location, external: true }] : []),
    { href: localePath(lang, "/contact"), label: t.nav.contact },
  ];
  const social = Object.entries(business.social).filter(([, url]) => url);
  const address = fullAddress(lang);
  const fullName = tx(business.fullName, lang);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      // Browser extensions (e.g. page rulers) add attributes to <html> before
      // React loads. This ignores them on this element only, not its children.
      suppressHydrationWarning
      className={`${geistSans.variable} ${playfair.variable} ${fontClassName} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <header className="absolute inset-x-0 top-0 z-30">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
            <Link href={localePath(lang, "/")} className="min-w-0 font-display text-xl tracking-wide text-gold-300">
              {business.logo ? (
                <Image
                  src={business.logo}
                  alt={fullName}
                  width={639}
                  height={128}
                  priority
                  // Phones: as large as fits beside the two header buttons.
                  className="h-10 w-auto max-w-[calc(100vw-8.5rem)] object-contain object-left sm:h-14 sm:max-w-none"
                />
              ) : (
                tx(business.brandName, lang)
              )}
            </Link>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3 xl:gap-6">
              <div className={`hidden text-sm text-gold-200/80 xl:flex ${lang === "ta" ? "gap-5" : "gap-7"}`}>
                {nav.map((item) => (
                  <NavLink key={item.href} item={item} className="hover:text-gold-300" />
                ))}
              </div>
              <LanguageSwitch lang={lang} />
              {/* Plain links so the menu closes on navigation without client JS */}
              <details className="relative xl:hidden">
                <summary
                  className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-gold-400/50 text-gold-300 transition hover:bg-gold-400/10 [&::-webkit-details-marker]:hidden"
                  aria-label={t.nav.menu}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </summary>
                <div className="absolute right-0 mt-2 flex w-52 flex-col rounded-lg border border-gold-500/30 bg-ink-900 p-2 shadow-xl">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      {...(item.external && { target: "_blank", rel: "noopener" })}
                      className="rounded px-3 py-2 text-gold-200 hover:bg-ink-800"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </details>
            </div>
          </nav>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-gold-500/20 bg-ink-950 text-sm text-gold-200/60">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-3">
            <div>
              <p className="font-display text-lg text-gold-300">{fullName}</p>
              {address && <p className="mt-2">{address}</p>}
              {business.phone && (
                <a href={telHref(business.phone)} className="mt-2 block hover:text-gold-300">
                  {business.phone}
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {nav.map((item) => (
                <NavLink key={item.href} item={item} className="hover:text-gold-300" />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {social.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener" className="capitalize hover:text-gold-300">
                  {name}
                </a>
              ))}
              <Link href={localePath(lang, "/privacy")} className="hover:text-gold-300">
                {t.nav.privacy}
              </Link>
              {gaId && <CookieSettingsButton label={t.nav.cookieSettings} />}
            </div>
          </div>
          <div className="border-t border-gold-500/10">
            <p className="mx-auto max-w-6xl px-6 py-4 text-xs">
              © {new Date().getFullYear()} {business.legalName || fullName}
              {business.gstin && <> · GSTIN {business.gstin}</>}
            </p>
          </div>
        </footer>

        <WhatsAppFloat lang={lang} />
        {/* Only needed once Google Analytics is set up (NEXT_PUBLIC_GA_ID). */}
        {gaId && <ConsentBanner lang={lang} />}
      </body>
    </html>
  );
}
