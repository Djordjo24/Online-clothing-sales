import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { featuredProducts } from "@/lib/mock-products";
import { site } from "@/lib/site";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2400&q=85";

export const metadata: Metadata = {
  title: "Home",
  description: `${site.name} — ${site.tagline}`,
};

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[min(100dvh,900px)] w-full overflow-hidden sm:min-h-[min(92vh,880px)]">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/35 to-neutral-950/20"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[min(100dvh,900px)] max-w-6xl min-w-0 flex-col justify-end px-4 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-24 sm:min-h-[min(92vh,880px)] sm:px-6 sm:pb-20 sm:pt-32">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/75">
            {site.name}
          </p>
          <h1 className="mt-5 max-w-xl text-balance font-serif text-3xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
            Quiet luxury for every day.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
            {site.tagline}
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/shop"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-neutral-950 transition hover:bg-white/90 sm:h-auto sm:w-auto sm:py-3.5"
            >
              Shop collection
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 w-full items-center justify-center text-sm font-medium text-white/90 underline-offset-4 transition hover:text-white hover:underline sm:h-auto sm:w-auto"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-brand-border/60 bg-background">
        <div className="mx-auto min-w-0 max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brand-muted">
                Featured
              </p>
              <h2 className="mt-3 font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                New in
              </h2>
            </div>
            <Link
              href="/shop"
              className="shrink-0 text-sm font-medium text-foreground underline-offset-4 transition hover:text-brand-deep hover:underline"
            >
              View all products →
            </Link>
          </div>

          <ul className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-highlight">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-brand-muted">
                        {product.brand}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-medium text-foreground">
                        {product.name}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium tabular-nums text-brand-deep">
                      €{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex justify-center border-t border-brand-border/60 pt-14">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-transparent px-8 py-3.5 text-sm font-medium text-foreground transition hover:border-brand-accent/50 hover:bg-brand-highlight/50"
            >
              Browse the full shop
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
