import { NextRequest, NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { Resend } from "resend";
import { sendWhatsAppNotification } from "@/lib/vaartabot";

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: "pharma" | "tech";
}

const BRANDS = {
  pharma: {
    label: "Milarch Pharma",
    from: "Milarch Pharma Website <contact@milarch.in>",
    subject: (name: string) => `Milarch Pharma enquiry from ${name}`,
    intro: "New enquiry from the Milarch Pharma website (milarch.in).",
  },
  tech: {
    label: "Milarch Tech",
    from: "Milarch Tech Website <contact@milarch.in>",
    subject: (name: string) => `Milarch Tech enquiry from ${name}`,
    intro: "New enquiry from the Milarch Tech website (milarch.in/tech).",
  },
} as const;

/** Keeps a copy of every enquiry on the server, so none is lost if email or WhatsApp fails. */
async function saveEnquiry(entry: object) {
  try {
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "enquiries.jsonl"), JSON.stringify(entry) + "\n");
  } catch (err) {
    console.error("Could not save enquiry", err);
  }
}

export async function POST(req: NextRequest) {
  const { name, email, phone, message, source } = (await req.json()) as ContactBody;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const brand = BRANDS[source === "tech" ? "tech" : "pharma"];
  const receivedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  await saveEnquiry({ receivedAt, source: brand.label, name, email, phone: phone ?? "", message });
  console.log(`Enquiry received (${brand.label}) from ${name}`);

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: brand.from,
        to: process.env.ADMIN_NOTIFY_EMAIL || "info@milarch.in",
        replyTo: email,
        subject: brand.subject(name),
        text: [
          brand.intro,
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "not given"}`,
          `Received: ${receivedAt} IST`,
          "",
          "Message:",
          message,
          "",
          "Reply to this email to answer the customer directly.",
        ].join("\n"),
      });
    } catch (err) {
      console.error("Enquiry email failed", err);
    }
  } else {
    console.error("Enquiry email skipped: RESEND_API_KEY is not set");
  }

  // Fire-and-forget — a WhatsApp delivery failure must not fail the form submission.
  // The brand goes in the first field so Pharma and Tech enquiries read differently.
  sendWhatsAppNotification("website_enquiry", [
    `${name} (${brand.label}${phone ? `, ${phone}` : ""})`,
    email,
    message.slice(0, 200),
  ]).catch(() => {});

  return NextResponse.json({ success: true });
}
