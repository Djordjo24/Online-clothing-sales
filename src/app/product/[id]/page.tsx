import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductPurchasePanel } from "@/components/product/ProductPurchasePanel";
import { getProductById, products } from "@/lib/mock-products";

type Props = { params: { id: string } };

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductById(params.id);
  if (!product) return { title: "Product" };
  return { title: product.name };
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="mx-auto min-w-0 max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/shop"
        className="text-sm text-brand-muted transition hover:text-brand-deep"
      >
        ← Back to shop
      </Link>

      <div className="mt-8 grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="relative aspect-[3/4] w-full max-h-[min(78vh,640px)] overflow-hidden rounded-2xl border border-brand-border bg-brand-highlight lg:max-h-[min(85vh,720px)] lg:sticky lg:top-24">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm text-brand-muted">SKU {product.id}</p>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-brand-accent">
            {product.brand}
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold tabular-nums text-brand-deep">
            €{product.price.toFixed(2)}
          </p>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-brand-muted">
            {product.description}
          </p>

          <ProductPurchasePanel
            productId={product.id}
            productName={product.name}
            image={product.image}
            price={product.price}
            sizes={product.sizes}
          />
        </div>
      </div>
    </div>
  );
}
