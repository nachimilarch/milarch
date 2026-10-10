import type Lenis from "lenis";

/**
 * Smooth-scrolls to a section id if it already exists on the current page.
 * Returns true if it handled the scroll (caller should preventDefault),
 * or false if the section isn't here (caller should let the Link navigate
 * to "/#id" — SmoothScroll's mount effect picks up the hash on arrival).
 */
export function scrollToSectionIfPresent(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;

  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -80 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
  return true;
}
