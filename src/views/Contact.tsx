import { anyFilled, Facts, Missing, SectionIntro, Section, showMissing } from "@/components/ui";
import { business, fullAddress } from "@/content/business";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";
import { telHref, whatsappHref } from "@/lib/site";

const linkClass = "text-gold-200 underline-offset-4 hover:text-gold-300 hover:underline";

export default function Contact({ lang }: { lang: Locale }) {
  const t = dict(lang);
  const c = t.contact;
  const b = business;
  const social = Object.entries(b.social).filter(([, url]) => url);

  return (
    <section id="contact">
      <SectionIntro eyebrow={c.eyebrow} title={c.title} intro={c.intro} />

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
    </section>
  );
}
