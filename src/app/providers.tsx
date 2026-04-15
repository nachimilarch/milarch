"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // defaultTheme: "light" — dark theme will be added later as a toggle
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemesProvider>
  )
}
