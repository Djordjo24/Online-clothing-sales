"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { ProductSize } from "@/types/product";

type Props = {
  productId: string;
  productName: string;
  image: string;
  price: number;
  sizes: readonly ProductSize[];
};

export function ProductPurchasePanel({
  productId,
  productName,
  image,
  price,
  sizes,
}: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const canAdd = selectedSize !== null && sizes.length > 0;

  function handleAddToCart() {
    if (!selectedSize) return;
    addItem({
      productId,
      name: productName,
      image,
      price,
      size: selectedSize,
      quantity: 1,
    });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  if (sizes.length === 0) {
    return (
      <div className="mt-8">
        <p className="text-sm text-brand-muted">This product has no sizes in stock.</p>
        <button
          type="button"
          disabled
          className="mt-4 w-full max-w-sm cursor-not-allowed rounded-full border border-brand-border bg-brand-highlight/50 px-6 py-3.5 text-sm font-medium text-brand-muted sm:w-auto"
        >
          Add to cart
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div>
        <p
          id="size-label"
          className="text-sm font-medium text-foreground"
        >
          Size
        </p>
        <div
          className="mt-2 flex flex-wrap gap-2"
          role="radiogroup"
          aria-labelledby="size-label"
        >
          {sizes.map((size) => {
            const selected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[2.75rem] rounded-full border px-4 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  selected
                    ? "border-brand-accent bg-brand-highlight text-brand-deep ring-1 ring-brand-accent/40"
                    : "border-brand-border bg-brand-surface text-foreground hover:border-brand-accent/50 hover:bg-brand-highlight/70"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!canAdd}
          className="w-full max-w-sm rounded-full bg-brand-accent px-6 py-3.5 text-sm font-medium text-white transition hover:bg-brand-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-accent sm:w-auto"
        >
          {justAdded ? "Added to cart" : "Add to cart"}
        </button>
        <p className="mt-2 text-xs text-brand-muted">
          {!selectedSize
            ? "Select a size to add this item to your cart."
            : `Size ${selectedSize} · €${price.toFixed(2)} — saved on this device.`}
        </p>
      </div>
    </div>
  );
}
