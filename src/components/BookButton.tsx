"use client";

import { sendGAEvent } from "@next/third-parties/google";

// "Book a visit" link that also records a GA event, so colour versions can be
// compared by how many visitors click it. Silent when GA isn't loaded.
export default function BookButton({ href, label, className }: { href: string; label: string; className?: string }) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        if (window.dataLayer) sendGAEvent("event", "book_visit_click");
      }}
    >
      {label}
    </a>
  );
}
