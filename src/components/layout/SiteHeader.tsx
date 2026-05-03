"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { headerNav } from "@/lib/navigation";
import { site } from "@/lib/site";

export function SiteHeader() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-surface/90 pt-[env(safe-area-inset-top,0px)] shadow-sm shadow-rose-100/40 backdrop-blur-md dark:bg-brand-surface/92 dark:shadow-none">
      <div className="mx-auto flex h-14 max-w-6xl min-w-0 items-center justify-between gap-2 px-4 sm:h-[4.5rem] sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-brand-accent/55 ring-offset-2 ring-offset-brand-surface sm:h-12 sm:w-12 dark:ring-brand-accent/50 dark:ring-offset-brand-surface">
            <Image
              src="/images/damed-logo.png"
              alt={`${site.name} — logo`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 40px, 48px"
              priority
            />
          </span>
          <span className="truncate font-serif text-lg font-semibold tracking-wide text-brand-deep sm:text-xl">
            {site.name}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main"
        >
          {headerNav.map((item) => (
            <NavItemLink
              key={item.href}
              href={item.href}
              label={item.label}
              badgeCount={item.href === "/cart" ? itemCount : 0}
            />
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-brand-border text-brand-deep transition hover:bg-brand-highlight md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-[2px] md:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            id="mobile-nav"
            className="fixed inset-x-0 top-14 z-[70] max-h-[min(70vh,calc(100dvh-3.5rem))] overflow-y-auto border-b border-brand-border bg-brand-surface/98 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] shadow-lg shadow-rose-200/30 dark:shadow-none md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
          >
            <nav className="flex flex-col gap-1" aria-label="Main">
              {headerNav.map((item) => (
                <NavItemLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  badgeCount={item.href === "/cart" ? itemCount : 0}
                  className="min-h-[48px] items-center rounded-xl px-4 py-3 text-base text-foreground"
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}

function NavItemLink({
  href,
  label,
  badgeCount,
  className,
  onNavigate,
}: {
  href: string;
  label: string;
  badgeCount: number;
  className?: string;
  onNavigate?: () => void;
}) {
  const base =
    "relative inline-flex items-center gap-1.5 font-medium text-brand-muted transition-colors hover:bg-brand-highlight hover:text-brand-deep dark:hover:text-foreground";
  const desktop = "rounded-full px-3 py-2 text-sm";
  const merged = className ? `${base} ${className}` : `${base} ${desktop}`;

  return (
    <Link href={href} className={merged} onClick={onNavigate}>
      <span>{label}</span>
      {badgeCount > 0 ? (
        <span className="min-w-[1.125rem] rounded-full bg-brand-accent px-1.5 py-0.5 text-center text-[10px] font-semibold leading-none text-white">
          {badgeCount > 99 ? "99+" : badgeCount}
        </span>
      ) : null}
    </Link>
  );
}

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path
        fill="currentColor"
        d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path
        fill="currentColor"
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  );
}
