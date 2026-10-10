export type TherapyArea = "pregnancy" | "pcos" | "vaginal" | "flora" | "cervical";

export interface Product {
  slug: string;
  brandName: string;
  category: string;
  fullName: string;
  tagline: string;
  /** Composition as printed on the pack, with abbreviations spelled out. */
  composition: string;
  /** Dosage form and pack size, as printed on the pack. */
  pack: string;
  clinicalIndication: string;
  description: string;
  benefit: string;
  tags: string[];
  therapyArea: TherapyArea;
  /** Lead brands get the large cards on the home page. */
  featured: boolean;
  accentColor: string;
  /** Pale tint of the accent, used behind the pack shot. */
  accentTint: string;
  /** Price in INR (rupees). */
  price: number;
  /** Requires a verified prescription upload before an order can be dispensed. */
  requiresPrescription: boolean;
  image: string;
}

export const therapyAreas: { id: TherapyArea; label: string; short: string }[] = [
  { id: "pregnancy", label: "Pregnancy and fetal growth", short: "Pregnancy" },
  { id: "vaginal", label: "Vaginal infections", short: "Vaginal health" },
  { id: "flora", label: "Gut and vaginal flora", short: "Microbiome" },
  { id: "pcos", label: "Polycystic Ovary Syndrome (PCOS)", short: "PCOS" },
  { id: "cervical", label: "Cervical health and Human Papillomavirus (HPV)", short: "Cervical health" },
];

export const products: Product[] = [
  {
    slug: "fetogro",
    brandName: "FETOGRO™",
    category: "Intrauterine Growth Restriction (IUGR)",
    fullName: "Intrauterine Growth Restriction",
    tagline: "Support for healthy fetal growth",
    composition: "L-Arginine 3 g with Taurine, Lysine and Leucine",
    pack: "10 g sachet · orange flavour · no added sugar",
    clinicalIndication: "Risk reduction and management of restricted fetal growth during pregnancy",
    description: "A specialised nutritional and pharmaceutical intervention supporting optimal fetal growth and development.",
    benefit: "Supports placental blood flow and fetal nutrition for optimal birth weight",
    tags: ["Pregnancy", "Fetal Growth", "Placenta"],
    therapyArea: "pregnancy",
    featured: true,
    accentColor: "#1E5BA8",
    accentTint: "#E6EEF8",
    price: 700,
    requiresPrescription: true,
    image: "/products/fetogro.png",
  },
  {
    slug: "mycocide-vg",
    brandName: "MYCOCIDE Vg™",
    category: "Vaginal antifungal",
    fullName: "Fenticonazole Nitrate",
    tagline: "Targeted antifungal therapy",
    composition: "Fenticonazole Nitrate 600 mg",
    pack: "Vaginal softgel capsule · 10 × 1 × 1",
    clinicalIndication: "Vulvovaginal candidiasis (vaginal yeast infection)",
    description: "Targeted therapy to effectively manage and eliminate tenacious fungal infections with high efficacy.",
    benefit: "Broad-spectrum azole antifungal with low systemic absorption, delivered as a vaginal softgel capsule",
    tags: ["Antifungal", "Vaginal"],
    therapyArea: "vaginal",
    featured: true,
    accentColor: "#B12D6E",
    accentTint: "#F8E7EF",
    price: 1970,
    requiresPrescription: true,
    image: "/products/mycocide-vg.png",
  },
  {
    slug: "symgut",
    brandName: "SYMGUT™",
    category: "Prebiotic and probiotic",
    fullName: "Synbiotic",
    tagline: "Advanced gut microbiome support",
    composition:
      "10 billion colony-forming units (CFU): 6 Lactobacillus strains (9 billion) and Bifidobacterium bifidum (1 billion), with Fructo-oligosaccharides (FOS) 100 mg",
    pack: "Vegetarian capsule · 10 × 10",
    clinicalIndication: "Gut microbiome support, vaginal flora balance, immunity enhancement",
    description: "Restores and maintains optimal intestinal flora dynamics, crucial for systemic health and immunity.",
    benefit: "Clinically selected probiotic strains with prebiotic fibres for synbiotic effect",
    tags: ["Microbiome", "Gut Health", "Immunity"],
    therapyArea: "flora",
    featured: true,
    accentColor: "#1B7F5A",
    accentTint: "#E3F3EC",
    price: 3000,
    requiresPrescription: false,
    image: "/products/symgut.png",
  },
  {
    slug: "pcomet-m",
    brandName: "PCOMet M™",
    category: "Polycystic Ovary Syndrome (PCOS)",
    fullName: "Polycystic Ovary Syndrome",
    tagline: "PCOS management",
    composition: "Myo-Inositol 600 mg and Metformin Hydrochloride 500 mg (sustained release)",
    pack: "Tablet · 10 × 10",
    clinicalIndication: "Hormonal balance, insulin resistance, menstrual regulation in PCOS",
    description: "Comprehensive metabolic and hormonal regulatory support for women living with Polycystic Ovary Syndrome.",
    benefit: "Multi-target formulation addressing insulin sensitivity, androgen levels, and cycle regularity",
    tags: ["Hormones", "Insulin", "Menstrual"],
    therapyArea: "pcos",
    featured: false,
    accentColor: "#2E8B3E",
    accentTint: "#E6F3E8",
    price: 2950,
    requiresPrescription: true,
    image: "/products/pcomet-m.png",
  },
  {
    slug: "bzeevit",
    brandName: "BZeeVIT™",
    category: "Multivitamin and multimineral",
    fullName: "Supplement",
    tagline: "Essential multivitamin support",
    composition: "Multivitamin and multimineral",
    pack: "Tablet · 10 × 10",
    clinicalIndication: "Nutritional support during pregnancy, lactation, and general women's health",
    description: "A balanced composition of vital micronutrients ensuring foundational health and combating deficiencies.",
    benefit: "Comprehensive micronutrient formulation with iron, folic acid, calcium, vitamin D3, and zinc",
    tags: ["Pregnancy", "Lactation", "Iron", "Folate"],
    therapyArea: "pregnancy",
    featured: false,
    accentColor: "#7A2E8C",
    accentTint: "#F2E8F5",
    price: 1340,
    requiresPrescription: false,
    image: "/products/bzeevit.png",
  },
  {
    slug: "cervive",
    brandName: "CERVIVE™",
    category: "Cervical health",
    fullName: "Supportive care",
    tagline: "Cervical health maintenance",
    composition: "Epigallocatechin Gallate (EGCG), Folic Acid and Vitamin B12",
    pack: "Tablet · 3 × 10",
    clinicalIndication: "Adjunct support for Human Papillomavirus (HPV) positive patients and cervical cancer care",
    description: "Targeted therapeutic support aimed at maintaining tissue health and cellular integrity of the cervix.",
    benefit: "Immunonutrition formulation supporting immune surveillance and epithelial health",
    tags: ["HPV", "Cervical", "Immunonutrition"],
    therapyArea: "cervical",
    featured: false,
    accentColor: "#C8235A",
    accentTint: "#FBE7EE",
    price: 840,
    requiresPrescription: true,
    image: "/products/cervive.png",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
