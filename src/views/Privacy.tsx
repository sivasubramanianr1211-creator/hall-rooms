import type { Metadata } from "next";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { Missing } from "@/components/ui";
import { business } from "@/content/business";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { gaId } from "@/lib/site";

export function privacyMetadata(lang: Locale): Metadata {
  const d = dict(lang);
  return pageMetadata(lang, "/privacy", `${d.privacy.metaTitle} | ${d.seo.suffix}`, undefined);
}

export default function Privacy({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const p = t.privacy;

  return (
    <main className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <h1 className="font-display text-4xl text-gold-300">{p.title}</h1>
      <p className="mt-2 text-sm text-gold-200/50">{p.updated}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-gold-200/80 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-gold-300">
        <section>
          <h2>{p.whoTitle}</h2>
          <p>
            {p.who(business.legalName || tx(business.fullName, lang))}{" "}
            {business.email ? (
              <a href={`mailto:${business.email}`} className="text-gold-300 underline underline-offset-2">
                {business.email}
              </a>
            ) : (
              <Missing>email for privacy requests</Missing>
            )}
            .
          </p>
        </section>

        <section>
          <h2>{p.collectTitle}</h2>
          <p>{p.collect1}</p>
          <p className="mt-3">{p.collect2}</p>
          <p className="mt-3">{p.collect3}</p>
        </section>

        <section>
          <h2>{p.whyTitle}</h2>
          <p>{p.why}</p>
        </section>

        <section>
          <h2>{p.processorTitle}</h2>
          <p>{p.processor}</p>
        </section>

        <section>
          <h2>{p.rightsTitle}</h2>
          <p>
            {gaId && (
              <>
                {p.rights1} <CookieSettingsButton label={t.nav.cookieSettings} />
              </>
            )}
            {gaId ? p.rights2 : p.rights2.replace(/^\.\s*/, "")}
          </p>
        </section>
      </div>
    </main>
  );
}
