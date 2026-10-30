import type { Metadata } from "next";
import ContactButtons from "@/components/ContactButtons";
import { Missing, PageHeader, Section, showMissing } from "@/components/ui";
import { business } from "@/content/business";
import { faqs } from "@/content/faqs";
import { dict } from "@/lib/dictionary";
import { tx, type Locale } from "@/lib/i18n";

export function faqMetadata(lang: Locale): Metadata {
  const t = dict(lang).faq;
  return {
    title: `${t.metaTitle} | ${tx(business.fullName, lang)}`,
    description: t.metaDescription,
    alternates: { languages: { en: "/faq", ta: "/ta/faq" } },
  };
}

export default function Faq({ lang }: { lang: Locale }) {
  const t = dict(lang).faq;
  const items = faqs.map((f) => ({ q: tx(f.q, lang), a: tx(f.a, lang) }));
  const answered = items.filter((f) => f.a);
  const shown = showMissing ? items : answered;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: answered.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      {answered.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <PageHeader eyebrow={t.eyebrow} title={t.title} />

      <Section>
        <div className="max-w-3xl divide-y divide-gold-500/15 border-y border-gold-500/15">
          {shown.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-gold-300 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-gold-400 transition group-open:rotate-45">+</span>
              </summary>
              <div className="mt-3 leading-relaxed text-gold-200/80">{f.a || <Missing>answer</Missing>}</div>
            </details>
          ))}
        </div>
      </Section>

      <Section title={t.more} alt>
        <ContactButtons lang={lang} />
      </Section>
    </main>
  );
}
