import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://milarch.in"),
  title: {
    default: "Milarch Pharma | Women's health, Hyderabad",
    template: "%s | Milarch Pharma",
  },
  description:
    "Milarch Pharma makes specialised formulations for women's health: pregnancy and fetal growth, PCOS, vaginal infections, gut and vaginal flora, and cervical health. Hyderabad, India.",
  openGraph: {
    title: "Milarch Pharma",
    description: "In support of healthy pregnancy. Organised interventions. Decisive outcomes.",
    url: "https://milarch.in",
    siteName: "Milarch",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8F4",
};

// Runs before paint: marks JS as available (so .reveal blocks can start hidden)
// and fades them in as they scroll into view. Without JS everything stays visible.
const revealScript = `
document.documentElement.classList.add('js');
addEventListener('DOMContentLoaded',function(){
  var els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
});`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body
        className={`${sans.variable} ${display.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
