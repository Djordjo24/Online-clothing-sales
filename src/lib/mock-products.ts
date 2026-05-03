import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Midi Dress",
    brand: "DameD Atelier",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    description:
      "Bias-cut midi in fluid silk with a soft drape. Ideal for evenings out or summer events.",
  },
  {
    id: "2",
    name: "Linen Overshirt",
    brand: "Linen & Co",
    price: 79.5,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c8dae94?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    description:
      "Lightweight linen layer with a relaxed fit. Breathable and easy to style year-round.",
  },
  {
    id: "3",
    name: "Tailored Wool Coat",
    brand: "Maison Rowe",
    price: 289.0,
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    description:
      "Double-faced wool, clean lines, and a waist-defining silhouette for cold-weather polish.",
  },
  {
    id: "4",
    name: "Cashmere Crewneck",
    brand: "Nord Yarn",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    description:
      "Fine-gauge cashmere with a classic crew neckline. Soft, warm, and made to last.",
  },
  {
    id: "5",
    name: "High-Rise Trousers",
    brand: "DameD Atelier",
    price: 98.0,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    description:
      "Structured high-rise cut with pressed creases. Pairs cleanly with knits or blouses.",
  },
  {
    id: "6",
    name: "Leather Crossbody",
    brand: "Vale Studio",
    price: 145.0,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    sizes: ["S", "M", "L"],
    description:
      "Compact crossbody in supple leather with an adjustable strap and gold-tone hardware.",
  },
];

/** First items shown on the homepage featured section. */
export const featuredProducts = products.slice(0, 4);

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
