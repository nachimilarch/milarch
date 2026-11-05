import { NextRequest, NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { Resend } from "resend";
import { sendWhatsAppNotification, sendWhatsAppMessageTo } from "@/lib/vaartabot";

interface VerifyBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customer: { name?: string; phone?: string; email?: string; address?: string; city?: string; state?: string; pincode?: string };
  lines: { slug: string; brandName: string; qty: number; price: number }[];
  prescription: { filename: string; contentType: string; contentBase64: string } | null;
}

export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payments are not configured." }, { status: 503 });
  }

  const body = (await req.json()) as VerifyBody;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer, lines, prescription } = body;

  const isValid = validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    keySecret
  );

  if (!isValid) {
    return NextResponse.json({ error: "Payment verification failed. Please contact us with your payment ID." }, { status: 400 });
  }

  const itemsSummary = (lines ?? [])
    .map((l) => `${l.brandName} x${l.qty} — ₹${l.price * l.qty}`)
    .join("\n");
  const total = (lines ?? []).reduce((sum, l) => sum + l.price * l.qty, 0);

  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "Milarch Orders <orders@milarch.in>",
        to: process.env.ADMIN_NOTIFY_EMAIL || "info@milarch.in",
        subject: `New order ${razorpay_order_id}${prescription ? " — Prescription Verification Needed" : ""}`,
        text: [
          `Order: ${razorpay_order_id}`,
          `Payment: ${razorpay_payment_id}`,
          "",
          `Customer: ${customer?.name ?? ""}`,
          `Phone: ${customer?.phone ?? ""}`,
          `Email: ${customer?.email ?? ""}`,
          `Address: ${customer?.address ?? ""}, ${customer?.city ?? ""} ${customer?.state ?? ""} ${customer?.pincode ?? ""}`,
          "",
          "Items:",
          itemsSummary,
          "",
          prescription
            ? "A prescription is attached — please verify before shipping."
            : "No prescription items in this order.",
        ].join("\n"),
        attachments: prescription
          ? [{ filename: prescription.filename, content: prescription.contentBase64, contentType: prescription.contentType }]
          : undefined,
      });
    }
  } catch (err) {
    // Payment already succeeded — a notification failure must not fail the request.
    console.error("Order notification email failed", err);
  }

  // Order confirmation email to the customer, when they gave an email address.
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const to = customer?.email?.trim();
    if (resendKey && to && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Milarch Pharma <orders@milarch.in>",
        to,
        replyTo: process.env.ADMIN_NOTIFY_EMAIL || "info@milarch.in",
        subject: `Your Milarch order ${razorpay_order_id} is confirmed`,
        text: [
          `Hi ${customer?.name || "there"},`,
          "",
          "Thank you for your order. We have received your payment.",
          "",
          `Order ID: ${razorpay_order_id}`,
          `Payment ID: ${razorpay_payment_id}`,
          "",
          "Items:",
          itemsSummary,
          `Total paid: ₹${total}`,
          "",
          `Delivery address: ${[customer?.address, customer?.city, customer?.state, customer?.pincode].filter(Boolean).join(", ")}`,
          "",
          prescription
            ? "Your order includes prescription items. Our pharmacist will verify your prescription before we ship."
            : "We will let you know when your order ships.",
          "",
          "Questions? Reply to this email or WhatsApp us on +91 70838 20068.",
          "",
          "Milarch Pharma",
          "https://milarch.in",
        ].join("\n"),
      });
    }
  } catch (err) {
    console.error("Customer confirmation email failed", err);
  }

  const fullAddress = [customer?.address, customer?.city, customer?.state, customer?.pincode]
    .filter(Boolean)
    .join(", ");

  // Fire-and-forget — a WhatsApp delivery failure must not fail the request.
  sendWhatsAppNotification("website_new_order", [
    razorpay_order_id,
    customer?.name ?? "",
    String(total),
    itemsSummary,
  ]).catch(() => {});

  if (customer?.phone) {
    sendWhatsAppMessageTo(customer.phone, "order_confirmation_customer", [
      customer.name ?? "",
      razorpay_order_id,
      String(total),
      itemsSummary,
      fullAddress,
    ]).catch(() => {});
  }

  return NextResponse.json({ success: true, orderId: razorpay_order_id, paymentId: razorpay_payment_id });
}
