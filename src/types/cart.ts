import type { ProductSize } from "@/types/product";

export type CartLine = {
  /** Stable id for list keys and removal: `${productId}::${size}` */
  lineId: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  size: ProductSize;
  quantity: number;
};
