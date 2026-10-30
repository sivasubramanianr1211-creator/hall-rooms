"use client";

import { openSettings } from "./consent";

export default function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={openSettings} className="text-left hover:text-gold-300">
      {label}
    </button>
  );
}
