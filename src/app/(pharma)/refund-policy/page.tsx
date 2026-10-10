import LegalLayout from "@/components/layout/LegalLayout";

export const metadata = { title: "Refund & Cancellation Policy", alternates: { canonical: "/refund-policy" } };

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" updated="13 September 2026">
      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Order cancellation</h2>
        <p>
          You may cancel an order free of charge any time before it has been dispatched, by contacting us
          at <a href="mailto:info@milarch.in" className="text-teal underline">info@milarch.in</a> or{" "}
          <a href="https://wa.me/917083820068" className="text-teal underline">WhatsApp</a>. Once an order
          has shipped, it cannot be cancelled.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Prescription verification</h2>
        <p>
          If a prescription-required order cannot be verified, we will contact you for a valid
          prescription. If none is provided within 7 days, the order will be cancelled and the full amount
          refunded to the original payment method.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Returns</h2>
        <p>
          Being pharmaceutical products, items cannot be returned once delivered, except in the case of
          damaged, expired, or incorrect items received — see below.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Damaged, expired, or incorrect items</h2>
        <p>
          If you receive a damaged, expired, or incorrect product, contact us within 48 hours of delivery
          with photos of the item and packaging. We will arrange a replacement or a full refund at no
          extra cost to you.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Refund timelines</h2>
        <p>
          Approved refunds are issued to the original payment method via Razorpay within 5–7 business
          days. Bank processing times may add a few additional days before the amount reflects in your
          account.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Contact</h2>
        <p>
          For any refund or cancellation request: <a href="mailto:info@milarch.in" className="text-teal underline">info@milarch.in</a>
        </p>
      </section>
    </LegalLayout>
  );
}
