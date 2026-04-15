import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { ThemeProvider } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import FluidBackground from "@/components/ui/FluidBackground";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col selection:bg-teal/30 selection:text-white transition-colors duration-500`}
      >
        <ThemeProvider>
          <FluidBackground />
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
