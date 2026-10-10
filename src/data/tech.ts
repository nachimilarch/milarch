export interface TechProduct {
  name: string;
  kind: string;
  problem: string;
  features: string[];
  note?: string;
  /** Public website for products sold on their own. */
  site?: { url: string; label: string; about: string };
  /** Product's own colours, used on its card instead of the Milarch Tech ones. */
  brand?: { accent: string; deep: string; tint: string };
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
    site: {
      url: "https://vaartabot.com",
      label: "vaartabot.com",
      about:
        "VaartaBot is our WhatsApp Business platform, live at vaartabot.com for any business. Automate replies, run broadcast campaigns and turn every chat into a tracked lead, all from one dashboard.",
    },
    brand: { accent: "#1FAF5A", deep: "#0E6B4A", tint: "#E8F7EE" },
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
];

/** Custom systems we build for clients, shown as the main offering. */
export const techSolutions = [
  {
    id: "billing",
    title: "Custom billing systems",
    body: "Billing that follows how your business actually charges, instead of bending your process to an off-the-shelf tool.",
    points: ["Invoices, credit notes and receipts", "Tax calculation and payment tracking", "Linked to stock, orders and accounts"],
  },
  {
    id: "erp",
    title: "ERP",
    body: "One system for purchase, inventory, sales, people and accounts, built around the modules you need.",
    points: ["Only the modules you use", "Role-based access for every team", "Reports leadership can trust"],
  },
  {
    id: "cms",
    title: "CMS",
    body: "Content management your team can run without a developer for every change.",
    points: ["Pages, products and posts", "Drafts, approvals and publishing", "Fast, search-friendly websites"],
  },
  {
    id: "lms",
    title: "LMS",
    body: "Learning platforms for training field teams, staff or customers.",
    points: ["Courses, lessons and quizzes", "Progress tracking", "Completion certificates"],
  },
  {
    id: "crm",
    title: "CRM",
    body: "A pipeline built for how you find and keep customers, with every channel in one place.",
    points: ["Leads from web, email, calls and WhatsApp", "Follow-ups so nothing goes cold", "A real pipeline instead of a spreadsheet"],
  },
] as const;

export const techServices = [
  "Pharma brand websites",
  "WhatsApp chatbots",
  "Healthcare web apps",
  "E-commerce stores",
  "Search and digital marketing",
  "APIs and backends",
];
