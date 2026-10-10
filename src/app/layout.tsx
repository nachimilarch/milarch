import type { Metadata, Viewport } from "next";
import { Fraunces, JetBrains_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
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

// Milarch Tech faces
const techDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-tech",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
  verification: {
    google: "qk1nHFKRq0hYUcxCMOvzwJDWJuZRCmlF11k9IdRYG3s",
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
  var sel='.reveal,.mark-anim,.mark-stage';
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{rootMargin:'0px 0px -8% 0px'}):null;
  function watch(root){
    var els=root.querySelectorAll?root.querySelectorAll(sel):[];
    var list=root.matches&&root.matches(sel)?[root].concat([].slice.call(els)):[].slice.call(els);
    list.forEach(function(e){if(e.classList.contains('in'))return;io?io.observe(e):e.classList.add('in');});
  }
  watch(document);
  // Pages opened by client-side navigation (e.g. Pharma to Tech) add new
  // blocks after load, so watch for them too.
  new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType===1)watch(n);});});}).observe(document.body,{childList:true,subtree:true});
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
        className={`${sans.variable} ${display.variable} ${techDisplay.variable} ${mono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          {children}
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
