import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import dynamic from "next/dynamic";
const FloatingPillsBackground = dynamic(
  () => import("@/components/canvas/FloatingPillsBackground"),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MILARCH | Where Health Meets Innovation",
  description: "Milarch Pharma & Milarch Tech — Hyderabad, India",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col selection:bg-teal/30 selection:text-white transition-colors duration-500`}
      >
        <ThemeProvider>
          <FloatingPillsBackground />
          <SmoothScroll>
            <CustomCursor />
            <Header />
            {children}
            <Footer />
            <FloatingWhatsApp />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
