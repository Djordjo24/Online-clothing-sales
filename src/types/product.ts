export type ProductSize = "S" | "M" | "L";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  /** Absolute URL or path under `public/` (e.g. `/images/photo.jpg`). */
  image: string;
  sizes: readonly ProductSize[];
  description: string;
};
