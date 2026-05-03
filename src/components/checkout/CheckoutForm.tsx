"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { validateCheckout } from "@/lib/checkout-validation";

export function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    total: number;
    placedAt: string;
    itemCount: number;
  } | null>(null);

  useEffect(() => {
    if (!submitted) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  if (items.length === 0 && !submitted) {
    return (
      <div className="mx-auto max-w-lg">
        <p className="text-brand-muted">
          Your cart is empty. Add something before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block font-medium text-brand-deep underline-offset-4 hover:underline"
        >
          Go to shop
        </Link>
      </div>
    );
  }

  if (submitted && successInfo) {
    const placed = new Date(successInfo.placedAt);
    const dateStr = placed.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

    return (
      <div
        className="mx-auto max-w-lg rounded-2xl border-2 border-brand-accent/35 bg-brand-highlight/50 p-6 shadow-sm sm:p-8"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-accent text-white"
            aria-hidden
          >
            <IconCheck className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">
              Order placed successfully
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              Thank you, {name.trim() || "customer"}. Your order details were
              logged to the browser console (demo). Your cart has been cleared.
            </p>
            <dl className="mt-5 space-y-2 border-t border-brand-border pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-brand-muted">Items</dt>
                <dd className="font-medium tabular-nums text-foreground">
                  {successInfo.itemCount}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-brand-muted">Total</dt>
                <dd className="font-semibold tabular-nums text-brand-deep">
                  €{successInfo.total.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-brand-muted">Placed</dt>
                <dd className="text-foreground">{dateStr}</dd>
              </div>
            </dl>
            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-brand-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validateCheckout({ name, phone, address });
    const keys = Object.keys(nextErrors) as (keyof typeof nextErrors)[];
    if (keys.length > 0) {
      setErrors(nextErrors as Record<string, string>);
      return;
    }
    setErrors({});

    const placedAt = new Date().toISOString();
    const itemCount = items.reduce((n, l) => n + l.quantity, 0);

    const order = {
      placedAt,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      },
      items: items.map((l) => ({
        lineId: l.lineId,
        productId: l.productId,
        name: l.name,
        size: l.size,
        quantity: l.quantity,
        unitPrice: l.price,
        lineTotal: l.price * l.quantity,
      })),
      totalPrice,
      currency: "EUR",
    };

    console.info("[order]", order);

    setSuccessInfo({
      total: totalPrice,
      placedAt,
      itemCount,
    });
    clearCart();
    setSubmitted(true);
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-brand-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-brand-muted/60 focus:border-brand-accent/50 focus:ring-2 focus:ring-brand-accent/30";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-5"
      noValidate
    >
      <div>
        <label htmlFor="checkout-name" className="text-sm font-medium text-foreground">
          Full name
        </label>
        <input
          id="checkout-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "checkout-name-error" : undefined}
        />
        {errors.name ? (
          <p id="checkout-name-error" className="mt-1 text-xs text-red-700 dark:text-red-400">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="checkout-phone" className="text-sm font-medium text-foreground">
          Phone
        </label>
        <input
          id="checkout-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
        />
        {errors.phone ? (
          <p id="checkout-phone-error" className="mt-1 text-xs text-red-700 dark:text-red-400">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="checkout-address" className="text-sm font-medium text-foreground">
          Address
        </label>
        <textarea
          id="checkout-address"
          name="address"
          rows={4}
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`${inputClass} resize-y min-h-[6rem]`}
          aria-invalid={Boolean(errors.address)}
          aria-describedby={errors.address ? "checkout-address-error" : undefined}
        />
        {errors.address ? (
          <p id="checkout-address-error" className="mt-1 text-xs text-red-700 dark:text-red-400">
            {errors.address}
          </p>
        ) : null}
      </div>

      <div className="rounded-xl border border-brand-border bg-brand-highlight/30 px-4 py-3 text-sm">
        <p className="font-medium text-foreground">
          Order total:{" "}
          <span className="tabular-nums text-brand-deep">€{totalPrice.toFixed(2)}</span>
        </p>
        <p className="mt-1 text-xs text-brand-muted">
          {items.reduce((n, l) => n + l.quantity, 0)} item(s) in cart
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
      >
        Place order
      </button>
    </form>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
