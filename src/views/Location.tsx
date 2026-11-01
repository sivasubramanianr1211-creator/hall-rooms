import { Missing, SectionIntro, Section, showMissing } from "@/components/ui";
import { business, fullAddress } from "@/content/business";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";

export default function Location({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const b = business;
  const distances = b.distances.filter((d) => d.km != null || showMissing);
  const address = fullAddress(lang);

  return (
    <section id="location">
      <SectionIntro eyebrow={t.nav.location} title={t.home.nearTitle} intro={t.home.nearBody} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            {address && <p className="mb-6 text-lg text-gold-200">{address}</p>}
            <ul className="divide-y divide-gold-500/15 border-y border-gold-500/15">
              {distances.map((d) => (
                <li key={tx(d.place, "en")} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-gold-200">{tx(d.place, lang)}</span>
                  <span className="shrink-0 font-display text-lg text-gold-300">
                    {d.km != null ? `${d.km} ${t.common.km}` : <Missing>distance</Missing>}
                  </span>
                </li>
              ))}
            </ul>
            {b.landmarks.length > 0 ? (
              <ul className="mt-6 space-y-1 text-gold-200/80">
                {b.landmarks.map((l) => (
                  <li key={tx(l, "en")}>· {tx(l, lang)}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-6">
                <Missing>nearby landmarks</Missing>
              </p>
            )}
            {b.mapsUrl && (
              <a
                href={b.mapsUrl}
                target="_blank"
                rel="noopener"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold-400 px-6 py-3 font-semibold text-ink-950 transition hover:bg-gold-300"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                {t.contact.openMaps}
              </a>
            )}
          </div>
          {/* Shown straight away (satellite view); loads when scrolled near. */}
          {b.mapsEmbedUrl && (
            <iframe
              src={b.mapsEmbedUrl}
              title={`${t.contact.mapTitle}: ${tx(b.fullName, lang)}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="min-h-80 w-full rounded-lg border border-gold-500/30 lg:h-full"
            />
          )}
        </div>
      </Section>
    </section>
  );
}
