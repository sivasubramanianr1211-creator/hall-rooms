"use client";

import { useState } from "react";

// Google Maps and YouTube set their own cookies, so their frames load only
// after the visitor asks for them.
export default function ClickToLoad({
  src,
  title,
  label,
  note,
  className,
}: {
  src: string;
  title: string;
  label: string;
  note: string;
  className: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        className={`w-full rounded-lg border-0 ${className}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-gold-500/30 bg-ink-900 text-gold-300 transition hover:border-gold-400 ${className}`}
    >
      <span className="font-semibold">{label}</span>
      <span className="text-xs text-gold-200/60">{note}</span>
    </button>
  );
}
