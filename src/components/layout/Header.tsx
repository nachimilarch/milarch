"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { href: "/#products", label: "Products" },
  { href: "/#doctors", label: "For doctors" },
  { href: "/#about", label: "About" },
  { href: "/#tech", label: "Milarch Tech" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const { itemCount } = useCart();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  const CartLink = (
    <Link
      href="/cart"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-white text-foreground transition-colors hover:border-indigo"
      aria-label={itemCount > 0 ? `Cart, ${itemCount} items` : "Cart"}
    >
      <ShoppingBag className="h-[18px] w-[18px]" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );

  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Milarch, home">
          <Image src="/brand/milarch-mark.png" alt="" width={27} height={40} priority className="h-10 w-auto" />
          <span className="text-[15px] font-semibold tracking-[0.42em] text-foreground">MILARCH</span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[var(--muted)] transition-colors hover:bg-[var(--surface-2)] hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/#products" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Shop products
          </Link>
          {CartLink}

          {/* Mobile menu: a native <details> so it works before JavaScript loads */}
          <details ref={menuRef} className="group relative lg:hidden">
            <summary
              className="grid h-10 w-10 cursor-pointer list-none place-items-center rounded-full border border-[var(--border)] bg-white [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5 group-open:hidden" />
              <X className="hidden h-5 w-5 group-open:block" />
            </summary>
            <nav
              className="fixed inset-x-0 top-[4.5rem] border-b border-[var(--border)] bg-background px-4 pb-6 pt-2 shadow-lg"
              aria-label="Mobile"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="block border-b border-[var(--border)] py-4 text-lg font-medium text-foreground last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/#products" onClick={closeMenu} className="btn-primary mt-4 w-full">
                Shop products
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
