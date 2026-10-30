import type { Metadata } from "next";
import { Geist, Noto_Sans_Tamil, Playfair_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const tamilSans = Noto_Sans_Tamil({ variable: "--font-tamil-sans", subsets: ["tamil"], preload: false });

export const metadata: Metadata = {
  title: "Page not found | Raja Valamburi Hall & Rooms",
};

// Shared by both languages, so it says everything in English and Tamil.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} ${tamilSans.variable} h-full antialiased`}>
      <body className="flex min-h-full items-center justify-center bg-ink-950 px-6 font-sans">
        <main className="max-w-md py-24 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- static asset, no layout shift to avoid */}
          <img src="/brand/logo-horizontal.svg" alt="Raja Valamburi Hall & Rooms" className="mx-auto h-12 w-auto" />
          <p className="mt-10 font-display text-6xl text-gold-400">404</p>
          <h1 className="mt-4 font-display text-2xl text-gold-300">This page doesn&apos;t exist.</h1>
          <p lang="ta" className="mt-2 text-gold-200/80">
            இந்தப் பக்கம் இல்லை.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-md bg-gold-400 px-6 py-3 font-semibold text-ink-950 transition hover:bg-gold-300"
            >
              Home
            </Link>
            <Link
              href="/ta"
              lang="ta"
              className="rounded-md border border-gold-400/60 px-6 py-3 font-semibold text-gold-300 transition hover:bg-gold-400/10"
            >
              முகப்பு
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
