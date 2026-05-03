"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartLine } from "@/types/cart";
import type { ProductSize } from "@/types/product";

/** `localStorage` key for cart persistence (survives refresh & new tabs on this origin). */
export const CART_STORAGE_KEY = "damed-cart-v1";

type CartState = CartLine[];

type CartAction =
  | {
      type: "HYDRATE";
      payload: CartLine[];
    }
  | {
      type: "ADD";
      payload: Omit<CartLine, "lineId" | "quantity"> & { quantity?: number };
    }
  | { type: "REMOVE"; payload: { lineId: string } }
  | { type: "CLEAR" };

function lineId(productId: string, size: ProductSize) {
  return `${productId}::${size}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "ADD": {
      const { productId, size, name, image, price } = action.payload;
      const qty = action.payload.quantity ?? 1;
      const id = lineId(productId, size);
      const i = state.findIndex((l) => l.lineId === id);
      if (i >= 0) {
        return state.map((l, idx) =>
          idx === i ? { ...l, quantity: l.quantity + qty } : l,
        );
      }
      return [
        ...state,
        {
          lineId: id,
          productId,
          name,
          image,
          price,
          size,
          quantity: qty,
        },
      ];
    }
    case "REMOVE":
      return state.filter((l) => l.lineId !== action.payload.lineId);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  totalPrice: number;
  addItem: (input: {
    productId: string;
    name: string;
    image: string;
    price: number;
    size: ProductSize;
    quantity?: number;
  }) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function parseStored(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is CartLine =>
        typeof row === "object" &&
        row !== null &&
        typeof (row as CartLine).lineId === "string" &&
        typeof (row as CartLine).productId === "string" &&
        typeof (row as CartLine).name === "string" &&
        typeof (row as CartLine).image === "string" &&
        typeof (row as CartLine).price === "number" &&
        ["S", "M", "L"].includes((row as CartLine).size) &&
        typeof (row as CartLine).quantity === "number",
    );
  } catch {
    return [];
  }
}

function readCartFromStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return parseStored(window.localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    return [];
  }
}

function writeCartToStorage(items: CartLine[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Private mode, quota exceeded, or storage disabled — cart stays in memory only.
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useLayoutEffect(() => {
    dispatch({
      type: "HYDRATE",
      payload: readCartFromStorage(),
    });
  }, []);

  useEffect(() => {
    writeCartToStorage(items);
  }, [items]);

  const addItem = useCallback(
    (input: {
      productId: string;
      name: string;
      image: string;
      price: number;
      size: ProductSize;
      quantity?: number;
    }) => {
      dispatch({ type: "ADD", payload: input });
    },
    [],
  );

  const removeItem = useCallback((lineId: string) => {
    dispatch({ type: "REMOVE", payload: { lineId } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      totalPrice,
      addItem,
      removeItem,
      clearCart,
    }),
    [items, itemCount, totalPrice, addItem, removeItem, clearCart],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
