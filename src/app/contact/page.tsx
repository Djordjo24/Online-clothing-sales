import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — phone, email, and Instagram.`,
};

const channels = [
  {
    title: "Phone",
    body: site.phoneDisplay,
    href: `tel:${site.phoneTel}`,
    external: false,
  },
  {
    title: "Email",
    body: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    title: site.instagramLabel,
    body: site.instagramUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
    href: site.instagramUrl,
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <div className="mx-auto min-w-0 max-w-xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Contact
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted sm:text-base">
        Questions about an order, sizing, or a piece you love? Reach us by phone,
        email, or Instagram — we will get back to you as soon as we can.
      </p>

      <ul className="mt-12 divide-y divide-brand-border border-y border-brand-border">
        {channels.map((ch) => (
          <li key={ch.title} className="py-8 first:pt-6 last:pb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">
              {ch.title}
            </p>
            <a
              href={ch.href}
              className="mt-2 inline-block max-w-full break-words text-lg font-medium text-foreground underline-offset-4 transition hover:text-brand-deep hover:underline"
              {...(ch.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {ch.body}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
