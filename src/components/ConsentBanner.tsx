"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { dict } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";
import { gaId } from "@/lib/site";
import { getChoice, isSettingsOpen, setChoice, subscribe } from "./consent";

export default function ConsentBanner({ lang }: { lang: Locale }) {
  // "pending" during the static build, so nothing renders until the browser
  // knows the visitor's stored choice.
  const choice = useSyncExternalStore(subscribe, getChoice, () => "pending");
  const settingsOpen = useSyncExternalStore(subscribe, isSettingsOpen, () => false);

  if (choice === "pending") return null;

  const t = dict(lang).consent;
  const showBanner = choice === "unset" || settingsOpen;

  return (
    <>
      {choice === "granted" && gaId && <GoogleAnalytics gaId={gaId} />}
      {showBanner && (
        <div
          role="dialog"
          aria-labelledby="consent-title"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-lg border border-gold-500/40 bg-ink-900/95 p-5 text-sm shadow-2xl backdrop-blur sm:p-6"
        >
          <h2 id="consent-title" className="font-display text-lg text-gold-300">
            {t.title}
          </h2>
          <p className="mt-2 leading-relaxed text-gold-200/85">
            {t.body}{" "}
            <Link href={localePath(lang, "/privacy")} className="text-gold-300 underline underline-offset-2">
              {t.link}
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setChoice("granted")}
              className="rounded-md bg-gold-400 px-5 py-2 font-semibold text-ink-950 transition hover:bg-gold-300"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => setChoice("denied")}
              className="rounded-md border border-gold-400/60 px-5 py-2 font-semibold text-gold-300 transition hover:bg-gold-400/10"
            >
              {t.decline}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
