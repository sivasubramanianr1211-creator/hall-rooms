import type { Metadata } from "next";
import ClickToLoad from "@/components/ClickToLoad";
import { anyFilled, Facts, Missing, PageHeader, Section, showMissing } from "@/components/ui";
import { business, fullAddress } from "@/content/business";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { telHref, whatsappHref } from "@/lib/site";

export function contactMetadata(lang: Locale): Metadata {
  const d = dict(lang);
  return pageMetadata(lang, "/contact", d.seo.contactTitle, d.contact.metaDescription);
}

const linkClass = "text-gold-200 underline-offset-4 hover:text-gold-300 hover:underline";

export default function Contact({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const c = t.contact;
  const b = business;
  const distances = b.distances.filter((d) => d.km != null || showMissing);
  const social = Object.entries(b.social).filter(([, url]) => url);

  return (
    <main>
      <PageHeader eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

      <Section>
        <Facts
          items={[
            [c.phone, b.phone && <a href={telHref(b.phone)} className={linkClass}>{b.phone}</a>],
            [
              c.whatsapp,
              b.whatsapp && (
                <a href={whatsappHref(b.whatsapp, t.whatsapp.general)} target="_blank" rel="noopener" className={linkClass}>
                  {c.chat}
                </a>
              ),
            ],
            [c.email, b.email && <a href={`mailto:${b.email}`} className={linkClass}>{b.email}</a>],
            [c.address, fullAddress(lang)],
          ]}
        />

        {(b.contacts.length > 0 || showMissing) && (
          <div className="mt-10">
            <h2 className="font-display text-2xl text-gold-300">{c.bookingContacts}</h2>
            {b.contacts.length > 0 ? (
              <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {b.contacts.map((p) => (
                  <li key={p.phone} className="rounded-lg border border-gold-500/25 bg-ink-900 p-4">
                    <p className="text-gold-300">{tx(p.name, lang)}</p>
                    <p className="text-sm text-gold-200/60">{tx(p.role, lang)}</p>
                    <a href={telHref(p.phone)} className={`mt-2 inline-block ${linkClass}`}>
                      {p.phone}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4">
                <Missing>names and numbers of booking / enquiry contacts</Missing>
              </p>
            )}
          </div>
        )}
      </Section>

      <Section title={c.reach} alt>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
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
                className="mt-6 inline-block rounded-md border border-gold-400/60 px-5 py-2.5 font-semibold text-gold-300 transition hover:bg-gold-400/10"
              >
                {c.openMaps}
              </a>
            )}
          </div>
          <div>
            {b.mapsEmbedUrl && (
              <ClickToLoad
                src={b.mapsEmbedUrl}
                title={`${c.mapTitle}: ${tx(b.fullName, lang)}`}
                label={t.common.showMap}
                note={t.common.loadsFromGoogle}
                className="h-80"
              />
            )}
          </div>
        </div>
      </Section>

      {(showMissing || social.length > 0 || anyFilled(b.googleBusinessUrl)) && (
        <Section title={c.follow}>
          <div className="flex flex-wrap gap-6">
            {social.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener" className={`capitalize ${linkClass}`}>
                {name}
              </a>
            ))}
            {b.googleBusinessUrl && (
              <a href={b.googleBusinessUrl} target="_blank" rel="noopener" className={linkClass}>
                {c.googleProfile}
              </a>
            )}
            {social.length === 0 && <Missing>Facebook / Instagram / YouTube links</Missing>}
            {!b.googleBusinessUrl && <Missing>Google Business Profile link</Missing>}
          </div>
        </Section>
      )}

      {(showMissing || anyFilled(b.legalName, b.gstin, b.licences)) && (
        <Section title={c.business} alt>
          <Facts
            items={[
              [c.legalName, b.legalName],
              [c.gstin, b.gstin],
              ...b.licences.map((l): [string, string] => [tx(l.name, lang), l.number]),
              ...(b.licences.length === 0 ? [[c.licences, null] as [string, null]] : []),
            ]}
          />
        </Section>
      )}
    </main>
  );
}
