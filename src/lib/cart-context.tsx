"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { LucideIcon } from "lucide-react";
import { getProductBySlug } from "@/data/products";

export interface CartItem {
  slug: string;
  qty: number;
}

export interface CartLine extends CartItem {
  brandName: string;
  category: string;
  price: number;
  accentColor: string;
  requiresPrescription: boolean;
  Icon: LucideIcon;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  hasPrescriptionItems: boolean;
  addItem: (slug: string, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "milarch-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed/blocked storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage write failures (e.g. private browsing quota)
    }
  }, [items, hydrated]);

  const addItem = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { slug, qty }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((item) => {
        const product = getProductBySlug(item.slug);
        if (!product) return null;
        return {
          ...item,
          brandName: product.brandName,
          category: product.category,
          price: product.price,
          accentColor: product.accentColor,
          requiresPrescription: product.requiresPrescription,
          Icon: product.Icon,
        };
      })
      .filter((line): line is CartLine => line !== null);
  }, [items]);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.qty, 0), [lines]);
  const hasPrescriptionItems = useMemo(() => lines.some((l) => l.requiresPrescription), [lines]);

  const value: CartContextValue = {
    items,
    lines,
    itemCount,
    subtotal,
    hasPrescriptionItems,
    addItem,
    removeItem,
    setQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
