"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
