import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

interface CreateOrderBody {
  amount: number;
  customer: { name?: string; phone?: string; email?: string; address?: string };
  items: { slug: string; qty: number }[];
  prescriptionRequired: boolean;
}

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Please contact us directly to place this order." },
      { status: 503 }
    );
  }

  const { amount, customer, items, prescriptionRequired } = (await req.json()) as CreateOrderBody;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid order amount." }, { status: 400 });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `milarch_${Date.now()}`,
      notes: {
        customerName: (customer?.name ?? "").slice(0, 100),
        customerPhone: (customer?.phone ?? "").slice(0, 30),
        customerEmail: (customer?.email ?? "").slice(0, 100),
        address: (customer?.address ?? "").slice(0, 200),
        items: (items ?? []).map((i) => `${i.slug}x${i.qty}`).join(",").slice(0, 400),
        prescriptionRequired: prescriptionRequired ? "yes" : "no",
      },
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch (err) {
    console.error("Razorpay order creation failed", err);
    return NextResponse.json({ error: "Could not create payment order. Please try again." }, { status: 500 });
  }
}
