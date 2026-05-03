import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { filterProducts, uniqueBrands } from "@/lib/filter-products";
import { products } from "@/lib/mock-products";

export const metadata: Metadata = {
  title: "Shop",
};

function first(
  param: string | string[] | undefined,
): string | undefined {
  if (param === undefined) return undefined;
  return Array.isArray(param) ? param[0] : param;
}

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function ShopPage({ searchParams }: PageProps) {
  const filters = {
    size: first(searchParams.size),
    min: first(searchParams.min),
    max: first(searchParams.max),
    brand: first(searchParams.brand),
  };

  const filtered = filterProducts(products, filters);
  const brands = uniqueBrands(products);

  const hasActiveFilters = Boolean(
    (filters.size && filters.size !== "all") ||
      (filters.brand && filters.brand !== "all") ||
      (filters.min && filters.min.trim() !== "") ||
      (filters.max && filters.max.trim() !== ""),
  );

  return (
    <div className="mx-auto min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Shop
        </h1>
        <p className="mt-2 text-sm text-brand-muted sm:text-base">
          Filter by size, price, or brand. Filters use the URL so you can share
          or bookmark results.
        </p>
      </header>

      <form
        method="get"
        action="/shop"
        className="mt-8 rounded-2xl border border-brand-border bg-brand-surface/80 p-4 shadow-sm sm:p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-brand-muted">
              Size
            </span>
            <select
              name="size"
              defaultValue={filters.size ?? "all"}
              className="w-full rounded-xl border border-brand-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-brand-accent/0 transition focus:ring-2 focus:ring-brand-accent"
            >
              <option value="all">All sizes</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-brand-muted">
              Brand
            </span>
            <select
              name="brand"
              defaultValue={filters.brand ?? "all"}
              className="w-full rounded-xl border border-brand-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-brand-accent/0 transition focus:ring-2 focus:ring-brand-accent"
            >
              <option value="all">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2 lg:col-span-1">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-brand-muted">
              Price (€)
            </span>
            <div className="flex gap-2">
              <input
                name="min"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                placeholder="Min"
                defaultValue={filters.min ?? ""}
                className="min-w-0 flex-1 rounded-xl border border-brand-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-brand-muted/70 focus:ring-2 focus:ring-brand-accent"
              />
              <input
                name="max"
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                placeholder="Max"
                defaultValue={filters.max ?? ""}
                className="min-w-0 flex-1 rounded-xl border border-brand-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-brand-muted/70 focus:ring-2 focus:ring-brand-accent"
              />
            </div>
          </label>

          <div className="flex flex-wrap items-center gap-2 sm:col-span-2 lg:col-span-1 lg:justify-end">
            <button
              type="submit"
              className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-accent-hover"
            >
              Apply filters
            </button>
            {hasActiveFilters ? (
              <Link
                href="/shop"
                className="rounded-full border border-brand-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-brand-highlight"
              >
                Clear
              </Link>
            ) : null}
          </div>
        </div>
      </form>

      <p className="mt-6 text-sm text-brand-muted">
        {filtered.length} of {products.length} products
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-brand-border bg-brand-highlight/40 px-4 py-10 text-center text-sm text-brand-muted">
          No products match these filters.{" "}
          <Link href="/shop" className="font-medium text-brand-deep underline">
            Reset filters
          </Link>
        </p>
      ) : (
        <ul
          className="mt-8 grid grid-cols-1 items-stretch gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
        >
          {filtered.map((product) => (
            <li key={product.id} className="flex min-h-0 min-w-0">
              <Link
                href={`/product/${product.id}`}
                className="group flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/80 shadow-sm shadow-rose-100/25 outline-none ring-brand-accent/0 transition hover:border-brand-accent/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:shadow-none"
              >
                <div className="relative aspect-[3/4] shrink-0 bg-brand-highlight">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="truncate text-xs font-medium uppercase tracking-wide text-brand-muted">
                    {product.brand}
                  </p>
                  <div className="mt-1 flex flex-1 items-start justify-between gap-3">
                    <h2 className="min-h-[2.75rem] min-w-0 flex-1 text-base font-medium leading-snug text-foreground sm:min-h-[3.25rem] sm:text-lg">
                      <span className="line-clamp-2 block">{product.name}</span>
                    </h2>
                    <p className="shrink-0 pt-0.5 text-base font-semibold tabular-nums text-brand-deep sm:text-lg">
                      €{product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
