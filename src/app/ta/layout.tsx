import type { ReactNode } from "react";
import { Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import SiteShell from "@/components/SiteShell";

// Loaded only on Tamil pages; globals.css puts them after the Latin fonts.
const tamilSans = Noto_Sans_Tamil({
  variable: "--font-tamil-sans",
  subsets: ["tamil"],
});

const tamilSerif = Noto_Serif_Tamil({
  variable: "--font-tamil-serif",
  subsets: ["tamil"],
});

export default function TamilLayout({ children }: { children: ReactNode }) {
  return (
    <SiteShell lang="ta" fontClassName={`${tamilSans.variable} ${tamilSerif.variable}`}>
      {children}
    </SiteShell>
  );
}
