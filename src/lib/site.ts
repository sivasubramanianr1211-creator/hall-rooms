export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function inr(amount: number | null) {
  return amount == null ? null : `₹${amount.toLocaleString("en-IN")}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(number: string, message = "Hello, I'd like to enquire about a booking.") {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
