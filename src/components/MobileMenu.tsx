"use client";

import { useRef } from "react";

type Item = { href: string; label: string; external?: boolean };

// Phone/tablet menu. Links jump to sections on the same page, so the menu has
// to close itself after a tap (there is no page load to reset it).
export default function MobileMenu({ items, label }: { items: Item[]; label: string }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => menu.current?.removeAttribute("open");

  return (
    <details ref={menu} className="relative xl:hidden">
      <summary
        className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-gold-400/50 text-gold-300 transition hover:bg-gold-400/10 [&::-webkit-details-marker]:hidden"
        aria-label={label}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </summary>
      <div className="absolute right-0 mt-2 flex w-52 flex-col rounded-lg border border-gold-500/30 bg-ink-900 p-2 shadow-xl">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={close}
            {...(item.external && { target: "_blank", rel: "noopener" })}
            className="rounded px-3 py-2 text-gold-200 hover:bg-ink-800"
          >
            {item.label}
          </a>
        ))}
      </div>
    </details>
  );
}
