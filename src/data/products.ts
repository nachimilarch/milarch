import { Activity, Zap, Shield, Star, Leaf, Heart, type LucideIcon } from "lucide-react";

export interface Product {
  slug: string;
  brandName: string;
  category: string;
  fullName: string;
  tagline: string;
  clinicalIndication: string;
  description: string;
  benefit: string;
  tags: string[];
  accentColor: string;
  accentEnd: string;
  Icon: LucideIcon;
  /** Price in INR (rupees). */
  price: number;
  /** Requires a verified prescription upload before an order can be dispensed. */
  requiresPrescription: boolean;
  /** Product photo path under /public, sourced from milarch.in. Falls back to the icon when absent. */
  image?: string;
}

export const products: Product[] = [
  {
    slug: "fetogro",
    brandName: "FETOGRO™",
    category: "IUGR Management",
    fullName: "Intrauterine Growth Restriction",
    tagline: "IUGR Support Formulation",
    clinicalIndication: "Risk reduction and management of restricted fetal growth during pregnancy",
    description: "A specialized nutritional and pharmaceutical intervention supporting optimal fetal growth and development.",
    benefit: "Supports placental blood flow and fetal nutrition for optimal birth weight",
    tags: ["Pregnancy", "Fetal Growth", "Placenta"],
    accentColor: "#00C9A7",
    accentEnd: "#00B4D8",
    Icon: Activity,
    price: 700,
    requiresPrescription: true,
    image: "/products/fetogro.png",
  },
  {
    slug: "pcomet-m",
    brandName: "PCOMet M™",
    category: "PCOS Management",
    fullName: "Polycystic Ovary Syndrome",
    tagline: "PCOS Management",
    clinicalIndication: "Hormonal balance, insulin resistance, menstrual regulation in PCOS",
    description: "Comprehensive metabolic and hormonal regulatory support for women dealing with PolyCystic Ovarian Syndrome.",
    benefit: "Multi-target formulation addressing insulin sensitivity, androgen levels, and cycle regularity",
    tags: ["Hormones", "Insulin", "Menstrual"],
    accentColor: "#A855F7",
    accentEnd: "#7C3AED",
    Icon: Zap,
    price: 2950,
    requiresPrescription: true,
    image: "/products/pcomet-m.png",
  },
  {
    slug: "mycocide-vg",
    brandName: "MYCOCIDE Vg™",
    category: "Fenticonazole",
    fullName: "Antifungal",
    tagline: "Advanced Antifungal Intervention",
    clinicalIndication: "Vaginal and topical fungal infections (candidiasis, dermatophytosis)",
    description: "Targeted therapy to effectively manage and eliminate tenacious fungal infections with high efficacy.",
    benefit: "Broad-spectrum azole antifungal with low systemic absorption; available in cream and pessary formats",
    tags: ["Antifungal", "Topical", "Vaginal"],
    accentColor: "#F43F5E",
    accentEnd: "#E11D48",
    Icon: Shield,
    price: 1970,
    requiresPrescription: true,
    image: "/products/mycocide-vg.png",
  },
  {
    slug: "bzeevit",
    brandName: "BZeeVIT™",
    category: "Multivitamin-Multimineral",
    fullName: "Supplements",
    tagline: "Essential Multivitamin Support",
    clinicalIndication: "Nutritional support during pregnancy, lactation, and general women's health",
    description: "A balanced composition of vital micronutrients ensuring foundational health and combating deficiencies.",
    benefit: "Comprehensive micronutrient formulation with iron, folic acid, calcium, vitamin D3, and zinc",
    tags: ["Pregnancy", "Lactation", "Iron", "Folate"],
    accentColor: "#F59E0B",
    accentEnd: "#D97706",
    Icon: Star,
    price: 1340,
    requiresPrescription: false,
    image: "/products/bzeevit.png",
  },
  {
    slug: "symgut",
    brandName: "SYMGUT™",
    category: "Prebiotic & Probiotic",
    fullName: "Supplements",
    tagline: "Advanced Gut Microbiome Support",
    clinicalIndication: "Gut microbiome support, vaginal flora balance, immunity enhancement",
    description: "Restores and maintains optimal intestinal flora dynamics, crucial for systemic health and immunity.",
    benefit: "Clinically selected probiotic strains with prebiotic fibres for synbiotic effect",
    tags: ["Microbiome", "Gut Health", "Immunity"],
    accentColor: "#10B981",
    accentEnd: "#059669",
    Icon: Leaf,
    price: 3000,
    requiresPrescription: false,
    image: "/products/symgut.png",
  },
  {
    slug: "cervive",
    brandName: "CERVIVE™",
    category: "HPV & Cervical Cancer",
    fullName: "Supportive Care",
    tagline: "Cervical Health Maintenance",
    clinicalIndication: "Adjunct support for HPV-positive patients and cervical cancer care",
    description: "Targeted therapeutic support aimed at maintaining tissue health and cellular integrity in cervical domains.",
    benefit: "Immunonutrition formulation supporting immune surveillance and epithelial health",
    tags: ["HPV", "Cervical", "Immunonutrition"],
    accentColor: "#6366F1",
    accentEnd: "#4F46E5",
    Icon: Heart,
    image: "/products/cervive.png",
    price: 840,
    requiresPrescription: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
