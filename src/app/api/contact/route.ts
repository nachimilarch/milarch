import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendWhatsAppNotification } from "@/lib/vaartabot";

interface ContactBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  const { name, email, message } = (await req.json()) as ContactBody;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;

  try {
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Milarch Website <contact@milarch.in>",
        to: process.env.ADMIN_NOTIFY_EMAIL || "info@milarch.in",
        replyTo: email,
        subject: `New enquiry from ${name}`,
        text: [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n"),
      });
    }

    // Fire-and-forget — a WhatsApp delivery failure must not fail the form submission.
    sendWhatsAppNotification("website_enquiry", [
      name,
      email,
      message.slice(0, 200),
    ]).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form notification failed", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
