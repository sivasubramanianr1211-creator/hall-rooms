import Faq, { faqMetadata } from "@/views/Faq";

export const metadata = faqMetadata("ta");

export default function Page() {
  return <Faq lang="ta" />;
}
