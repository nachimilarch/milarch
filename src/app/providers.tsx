"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { CartProvider } from "@/lib/cart-context"

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // defaultTheme: "light" — dark theme will be added later as a toggle
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CartProvider>{children}</CartProvider>
    </NextThemesProvider>
  )
}
