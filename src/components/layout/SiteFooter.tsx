import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-border bg-gradient-to-b from-brand-surface via-brand-highlight/50 to-brand-highlight dark:from-brand-surface dark:via-brand-highlight/30 dark:to-brand-highlight">
      <div className="mx-auto grid min-w-0 max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6">
        <div>
          <p className="font-serif text-xl font-semibold tracking-wide text-brand-deep">
            {site.name}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-muted">
            {site.tagline}
          </p>
          <p className="mt-4 text-xs text-brand-muted/90">
            Secure checkout, careful packaging, and support when you need it.
          </p>
          <p className="mt-6 text-xs font-medium uppercase tracking-wider text-brand-accent">
            Shop
          </p>
          <Link
            href="/shop"
            className="mt-2 inline-block text-sm font-medium text-brand-deep underline-offset-4 hover:underline"
          >
            View collection →
          </Link>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-foreground/90">
            <li>
              <span className="block text-xs uppercase tracking-wide text-brand-muted">
                Email
              </span>
              <a
                href={`mailto:${site.email}`}
                className="break-words text-brand-deep hover:underline"
              >
                {site.email}
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wide text-brand-muted">
                Phone
              </span>
              <a
                href={`tel:${site.phoneTel}`}
                className="break-words text-brand-deep hover:underline"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wide text-brand-muted">
                Location
              </span>
              <span>{site.addressLine}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-border py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] text-center text-xs text-brand-muted">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
