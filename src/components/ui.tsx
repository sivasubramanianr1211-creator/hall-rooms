import Image from "next/image";
import type { ReactNode } from "react";
import type { Photo } from "@/content/media";

// In `npm run dev`, missing content and draft entries are shown so they can be
// filled in. The live build (`npm run build`) hides them.
export const showMissing = process.env.NODE_ENV !== "production";

export function isFilled(value: unknown): boolean {
  // Translation pairs count as filled when the English text is.
  if (value && typeof value === "object" && "en" in value) return isFilled((value as { en: string }).en);
  return value != null && value !== "" && !(Array.isArray(value) && value.length === 0);
}

export function anyFilled(...values: unknown[]) {
  return values.some(isFilled);
}

export function published<T extends { draft?: boolean }>(items: T[]) {
  return items.filter((item) => showMissing || !item.draft);
}

export function Missing({ children }: { children: ReactNode }) {
  if (!showMissing) return null;
  return (
    <span className="inline-block rounded border border-dashed border-maroon-700 bg-maroon-800/40 px-2 py-0.5 text-xs text-gold-200/80">
      To add: {children}
    </span>
  );
}

export function DraftBadge({ draft }: { draft?: boolean }) {
  if (!draft || !showMissing) return null;
  return (
    <span className="ml-2 rounded border border-dashed border-maroon-700 px-1.5 py-0.5 align-middle font-sans text-[10px] tracking-wider text-gold-200/70 uppercase">
      Draft: confirm
    </span>
  );
}

// Heading block that opens each home-page section (the hero holds the h1).
export function SectionIntro({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-20 pb-2">
      {eyebrow && <p className="text-sm tracking-[0.25em] text-gold-400 uppercase">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl text-gold-300 sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gold-200/75">{intro}</p>}
    </header>
  );
}

export function Section({
  id,
  title,
  intro,
  alt,
  children,
}: {
  id?: string;
  title?: string;
  intro?: string;
  alt?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`py-16 ${alt ? "bg-ink-900" : "bg-ink-950"}`}>
      <div className="mx-auto max-w-6xl px-6">
        {title && <h2 className="font-display text-3xl text-gold-300">{title}</h2>}
        {intro && <p className="mt-3 max-w-2xl leading-relaxed text-gold-200/70">{intro}</p>}
        <div className={title || intro ? "mt-8" : undefined}>{children}</div>
      </div>
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-gold-500/25 bg-ink-900 p-6 ${className}`}>{children}</div>
  );
}

// Label/value rows. Empty values are dropped on the live site.
export function Facts({ items }: { items: [string, ReactNode][] }) {
  const rows = items.filter(([, value]) => isFilled(value) || showMissing);
  if (rows.length === 0) return null;
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="border-b border-gold-500/15 pb-3">
          <dt className="text-xs tracking-widest text-gold-400 uppercase">{label}</dt>
          <dd className="mt-1 text-gold-200">{isFilled(value) ? value : <Missing>{label.toLowerCase()}</Missing>}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Chips({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li key={i} className="rounded-full border border-gold-500/30 px-3 py-1 text-sm text-gold-200/85">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="relative aspect-4/3 overflow-hidden rounded-lg border border-gold-500/25"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}

export const buttonPrimary =
  "inline-block rounded-md bg-gold-400 px-6 py-3 font-semibold text-ink-950 transition hover:bg-gold-300";
export const buttonSecondary =
  "inline-block rounded-md border border-gold-400/60 px-6 py-3 font-semibold text-gold-300 transition hover:bg-gold-400/10";
