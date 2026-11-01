import Link from "next/link";
import { business } from "@/content/business";
import { dict } from "@/lib/dictionary";
import { localePath, type Locale } from "@/lib/i18n";
import { telHref, whatsappHref } from "@/lib/site";
import { buttonPrimary, buttonSecondary, Missing } from "./ui";

export default function ContactButtons({ lang, message }: { lang: Locale; message?: string }) {
  const t = dict(lang);
  const { phone, whatsapp } = business;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {phone ? (
        <a href={telHref(phone)} className={buttonPrimary}>
          {t.common.call(phone)}
        </a>
      ) : (
        <Missing>phone number</Missing>
      )}
      {whatsapp ? (
        <a
          href={whatsappHref(whatsapp, message ?? t.whatsapp.general)}
          className={buttonSecondary}
          target="_blank"
          rel="noopener"
        >
          {t.common.whatsappUs}
        </a>
      ) : (
        <Missing>WhatsApp number</Missing>
      )}
      <Link href={`${localePath(lang, "/")}#contact`} className={buttonSecondary}>
        {t.common.allContact}
      </Link>
    </div>
  );
}
