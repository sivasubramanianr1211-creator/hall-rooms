import type { ReactNode } from "react";
import SiteShell from "@/components/SiteShell";
import { siteMetadata } from "@/lib/seo";

export const metadata = siteMetadata("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
