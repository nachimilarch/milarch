import LegalLayout from "@/components/layout/LegalLayout";

export const metadata = { title: "Shipping Policy", alternates: { canonical: "/shipping-policy" } };

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping Policy" updated="13 September 2026">
      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Delivery locations</h2>
        <p>
          We currently ship Milarch Pharma products to addresses within India. For queries about a
          specific location, contact us before placing an order.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Processing time</h2>
        <p>
          Orders are processed within 1–2 business days of payment confirmation, or after prescription
          verification for products that require one.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Delivery time</h2>
        <p>
          Standard delivery takes 3–7 business days depending on your location, handled through our
          courier partners. You will receive tracking details by email or WhatsApp once your order ships.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Shipping charges</h2>
        <p>
          Shipping charges, if any, are shown at checkout before payment is made.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Order tracking & issues</h2>
        <p>
          If your order hasn&apos;t arrived within the expected window, contact us at{" "}
          <a href="mailto:info@milarch.in" className="text-teal underline">info@milarch.in</a> or{" "}
          <a href="https://wa.me/917083820068" className="text-teal underline">WhatsApp</a> with your order
          ID.
        </p>
      </section>
    </LegalLayout>
  );
}
