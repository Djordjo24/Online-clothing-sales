import type { Product, ProductSize } from "@/types/product";

export type ShopFilters = {
  size?: string;
  min?: string;
  max?: string;
  brand?: string;
};

function parsePriceBound(raw: string | undefined): number | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  const n = Number.parseFloat(raw.replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

function isProductSize(v: string): v is ProductSize {
  return v === "S" || v === "M" || v === "L";
}

export function filterProducts(
  list: readonly Product[],
  filters: ShopFilters,
): Product[] {
  const size = filters.size?.trim();
  const brand = filters.brand?.trim();
  const min = parsePriceBound(filters.min);
  const max = parsePriceBound(filters.max);

  return list.filter((p) => {
    if (
      size &&
      size !== "all" &&
      isProductSize(size) &&
      !p.sizes.includes(size)
    ) {
      return false;
    }
    if (brand && brand !== "all" && p.brand !== brand) return false;
    if (min !== undefined && p.price < min) return false;
    if (max !== undefined && p.price > max) return false;
    return true;
  });
}

export function uniqueBrands(list: readonly Product[]): string[] {
  return Array.from(new Set(list.map((p) => p.brand))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
}
