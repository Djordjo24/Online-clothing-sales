"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function CartView() {
  const { items, totalPrice, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Cart
        </h1>
        <p className="mt-4 text-brand-muted">
          Your cart is empty.{" "}
          <Link
            href="/shop"
            className="font-medium text-brand-deep underline-offset-4 hover:underline"
          >
            Continue shopping
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto min-w-0 max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Cart
      </h1>

      <ul className="mt-8 divide-y divide-brand-border border-y border-brand-border">
        {items.map((line) => (
          <li
            key={line.lineId}
            className="flex flex-col gap-3 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:gap-5"
          >
            <div className="flex min-w-0 flex-1 gap-4 sm:gap-5">
              <Link
                href={`/product/${line.productId}`}
                className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-brand-border bg-brand-highlight sm:h-28 sm:w-24"
              >
                <Image
                  src={line.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/product/${line.productId}`}
                  className="font-medium text-foreground hover:text-brand-deep"
                >
                  <span className="line-clamp-2 sm:line-clamp-none">{line.name}</span>
                </Link>
                <p className="mt-1 text-sm text-brand-muted">
                  Size {line.size}
                  {line.quantity > 1 ? ` · Qty ${line.quantity}` : null}
                </p>
                <p className="mt-2 text-sm font-semibold tabular-nums text-brand-deep">
                  €{(line.price * line.quantity).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeItem(line.lineId)}
              className="h-11 min-h-[44px] shrink-0 self-stretch rounded-full border border-brand-border px-4 text-xs font-medium text-brand-muted transition hover:border-brand-deep hover:bg-brand-highlight hover:text-foreground sm:self-start sm:px-3 sm:py-1.5"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 border-t border-brand-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg font-semibold text-foreground">
          Total{" "}
          <span className="tabular-nums text-brand-deep">
            €{totalPrice.toFixed(2)}
          </span>
        </p>
        <Link
          href="/checkout"
          className="inline-flex justify-center rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-accent-hover sm:w-auto"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
