export interface TechProduct {
  name: string;
  kind: string;
  problem: string;
  features: string[];
  note?: string;
}

export const techProducts: TechProduct[] = [
  {
    name: "Cipher",
    kind: "Field force and billing app",
    problem: "Pharma field teams report on paper, WhatsApp and spreadsheets, so managers never see the full picture.",
    features: [
      "Daily call reports from every medical representative",
      "Attendance and GPS-backed field tracking",
      "Expense claims and retail chemist audits (RCPA)",
      "Billing, with role-based oversight for managers and admins",
    ],
    note: "Runs Milarch Pharma's own sales team every day",
  },
  {
    name: "VaartaBot",
    kind: "WhatsApp business platform",
    problem: "Teams answer the same WhatsApp questions all day, and leads get lost in chat history.",
    features: [
      "Visual flow builder, so non-technical teams design conversations themselves",
      "Broadcast campaigns for announcements and promotions",
      "Every conversation becomes a tracked lead in the CRM",
      "Template management built on WhatsApp's Business API rules",
    ],
    note: "Multi-tenant, and powers outreach for Milarch's own products",
  },
  {
    name: "LadderStep",
    kind: "HR, recruitment and outreach software",
    problem: "Recruitment agencies juggle resumes in folders, requirements in email and invoices in Excel.",
    features: [
      "Candidate portal and company portal",
      "Cold outreach over email and WhatsApp from one system",
      "Interview and offer management with an audit trail",
      "Training services and placement-fee billing built in",
    ],
  },
  {
    name: "CertifyBusiness CRM",
    kind: "Outbound CRM for compliance services",
    problem: "Leads arrive from five channels, and half go cold before anyone follows up.",
    features: [
      "Contact lists with proper segmentation",
      "Email and WhatsApp campaigns from one place",
      "Reply tracking, so nothing falls through",
      "A real pipeline view instead of a spreadsheet",
    ],
  },
];

export const techServices = [
  {
    title: "Pharma brand websites",
    body: "Brand sites, product pages, doctor portals and patient education, built for trust and conversion.",
  },
  {
    title: "WhatsApp chatbots",
    body: "Bots for patient queries, product questions, detailing support and appointments.",
  },
  {
    title: "Healthcare web apps",
    body: "Clinic management, prescription tracking, patient onboarding and telemedicine workflows.",
  },
  {
    title: "E-commerce and direct-to-consumer stores",
    body: "Catalogues, secure checkout, prescription upload and order tracking for pharma and wellness brands.",
  },
  {
    title: "Search and digital marketing for pharma",
    body: "Search engine optimisation, content and campaigns for doctors and patients in Tier-1 and Tier-2 cities.",
  },
  {
    title: "Application programming interfaces (APIs) and backends",
    body: "Database design and backend services for healthcare platforms, on Node.js, Next.js and PostgreSQL.",
  },
];
