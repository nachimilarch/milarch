import { products, type Product, therapyAreas } from "@/data/products";
import { techProducts, techSolutions } from "@/data/tech";

/*
 * Facts about Milarch used by metadata, structured data (JSON-LD), the
 * sitemap and /llms.txt, so search engines and AI assistants all read the
 * same thing as the visible pages.
 */

export const SITE_URL = "https://milarch.in";
export const PHONE = "+91-70838-20068";
export const EMAIL = "info@milarch.in";

export const plainName = (p: Product) => p.brandName.replace("™", "");
export const productUrl = (p: Product) => `${SITE_URL}/pharma/products/${p.slug}`;

const address = {
  "@type": "PostalAddress",
  addressLocality: "Hyderabad",
  addressRegion: "Telangana",
  addressCountry: "IN",
};

export const pharmaOrgId = `${SITE_URL}/#organization`;
export const techOrgId = `${SITE_URL}/tech#organization`;

export function pharmaSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": pharmaOrgId,
        name: "Milarch Pharma",
        alternateName: "Milarch",
        url: SITE_URL,
        logo: `${SITE_URL}/logo-pharma.png`,
        slogan: "In support of healthy pregnancy. Organised interventions. Decisive outcomes.",
        description:
          "Milarch Pharma is a Hyderabad pharmaceutical company making specialised formulations for women's health: pregnancy and fetal growth, PCOS, vaginal infections, gut and vaginal flora, and cervical health.",
        address,
        email: EMAIL,
        contactPoint: [
          { "@type": "ContactPoint", telephone: PHONE, email: EMAIL, contactType: "customer service", areaServed: "IN", availableLanguage: ["en", "hi", "te"] },
        ],
        knowsAbout: therapyAreas.map((t) => t.label),
        founder: [{ "@type": "Person", name: "Nachiketh Desai", jobTitle: "Founder and CEO" }],
        employee: [{ "@type": "Person", name: "Milind Desai", jobTitle: "Managing Director" }],
        subOrganization: { "@id": techOrgId },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Milarch",
        inLanguage: "en-IN",
        publisher: { "@id": pharmaOrgId },
      },
      {
        "@type": "ItemList",
        name: "Milarch Pharma products",
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: productUrl(p),
          name: plainName(p),
        })),
      },
    ],
  };
}

export function productSchema(p: Product) {
  const name = plainName(p);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl(p)}#product`,
        name,
        description: `${p.description} ${p.benefit}.`,
        image: `${SITE_URL}${p.image}`,
        url: productUrl(p),
        category: p.category,
        brand: { "@type": "Brand", name },
        manufacturer: { "@id": pharmaOrgId },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Composition", value: p.composition },
          { "@type": "PropertyValue", name: "Pack", value: p.pack },
          { "@type": "PropertyValue", name: "Used for", value: p.clinicalIndication },
          { "@type": "PropertyValue", name: "Prescription required", value: p.requiresPrescription ? "Yes" : "No" },
        ],
        offers: {
          "@type": "Offer",
          url: productUrl(p),
          price: p.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          areaServed: "IN",
          seller: { "@id": pharmaOrgId },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Milarch Pharma", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/#products` },
          { "@type": "ListItem", position: 3, name, item: productUrl(p) },
        ],
      },
    ],
  };
}

export function techSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": techOrgId,
        name: "Milarch Tech",
        url: `${SITE_URL}/tech`,
        logo: `${SITE_URL}/logo-tech.png`,
        description:
          "Milarch Tech is a Hyderabad software company that builds custom billing systems, ERP, CMS, LMS and CRM, and its own platforms for pharma field teams, WhatsApp-first businesses and recruitment agencies.",
        address,
        email: EMAIL,
        telephone: PHONE,
        parentOrganization: { "@id": pharmaOrgId },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Custom software",
          itemListElement: techSolutions.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.body, provider: { "@id": techOrgId } },
          })),
        },
      },
      ...techProducts.map((t) => ({
        "@type": "SoftwareApplication",
        name: t.name,
        applicationCategory: "BusinessApplication",
        description: t.site?.about ?? `${t.kind}. ${t.problem}`,
        featureList: t.features,
        ...(t.site ? { url: t.site.url } : {}),
        publisher: { "@id": techOrgId },
      })),
    ],
  };
}

/** Plain-text summary for AI assistants, served at /llms.txt (see llmstxt.org). */
export function llmsTxt() {
  const lines: string[] = [];
  lines.push("# Milarch");
  lines.push("");
  lines.push(
    "> Milarch is a Hyderabad, India company with two arms. Milarch Pharma makes specialised formulations for women's health (pregnancy and fetal growth, PCOS, vaginal infections, gut and vaginal flora, cervical health) for gynaecologists, IVF specialists and general practitioners. Milarch Tech builds custom business software and its own products.",
  );
  lines.push("");
  lines.push(`Contact: ${EMAIL}, phone and WhatsApp ${PHONE}. Founder and CEO: Nachiketh Desai. Managing Director: Milind Desai.`);
  lines.push("Prescription products are dispensed only against a valid prescription from a registered medical practitioner.");
  lines.push("");
  lines.push("## Milarch Pharma products");
  lines.push("");
  for (const p of products) {
    lines.push(
      `- [${plainName(p)}](${productUrl(p)}): ${p.tagline}. Composition: ${p.composition}. Pack: ${p.pack}. Used for: ${p.clinicalIndication}. ${
        p.requiresPrescription ? "Prescription required." : "No prescription required."
      } Price: ₹${p.price.toLocaleString("en-IN")}.`,
    );
  }
  lines.push("");
  lines.push("## Milarch Tech");
  lines.push("");
  lines.push(`- [Milarch Tech](${SITE_URL}/tech): custom software built around how a business works.`);
  for (const s of techSolutions) lines.push(`- ${s.title}: ${s.body} Includes ${s.points.join("; ").toLowerCase()}.`);
  lines.push("");
  lines.push("### Own products");
  lines.push("");
  for (const t of techProducts) {
    const link = t.site ? `[${t.name}](${t.site.url})` : t.name;
    lines.push(`- ${link} (${t.kind}): ${t.site?.about ?? t.problem} Features: ${t.features.join("; ")}.`);
  }
  lines.push("");
  lines.push("## Policies");
  lines.push("");
  lines.push(`- [Shipping policy](${SITE_URL}/shipping-policy)`);
  lines.push(`- [Refund and cancellation policy](${SITE_URL}/refund-policy)`);
  lines.push(`- [Privacy policy](${SITE_URL}/privacy)`);
  lines.push(`- [Terms and conditions](${SITE_URL}/terms)`);
  return lines.join("\n") + "\n";
}
