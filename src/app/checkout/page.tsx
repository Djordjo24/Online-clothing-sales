import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Checkout
      </h1>
      <p className="mt-2 max-w-xl text-sm text-brand-muted sm:text-base">
        Enter your details to place the order. This is a demo — the order is only
        printed to the browser console.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
