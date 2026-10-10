import LegalLayout from "@/components/layout/LegalLayout";

export const metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="13 September 2026">
      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Acceptance of terms</h2>
        <p>
          By accessing or purchasing from this website, operated by Milarch, Hyderabad, Telangana, India,
          you agree to these Terms & Conditions. If you do not agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Products & prescriptions</h2>
        <p>
          Some products listed under Milarch Pharma require a valid prescription from a registered medical
          practitioner. We reserve the right to request a prescription upload before dispatching such
          items, and to cancel and refund an order if a valid prescription is not provided. Nothing on this
          site constitutes medical advice — always consult a doctor or pharmacist before use.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">3. Pricing & payment</h2>
        <p>
          Prices are listed in Indian Rupees (₹) and are subject to change without notice. Payments are
          processed securely through Razorpay. An order is confirmed only after successful payment
          verification.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Milarch Tech services</h2>
        <p>
          Website, chatbot, and software development services offered under Milarch Tech are governed by
          a separate project-specific agreement or quotation issued at the time of engagement. These
          general terms apply to enquiries made through this site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Limitation of liability</h2>
        <p>
          Milarch is not liable for any indirect, incidental, or consequential damages arising from the
          use of our products or services, except as required by applicable Indian law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Governing law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes are subject to the jurisdiction
          of the courts in Hyderabad, Telangana.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">7. Contact</h2>
        <p>
          Questions about these terms: <a href="mailto:info@milarch.in" className="text-teal underline">info@milarch.in</a>
        </p>
      </section>
    </LegalLayout>
  );
}
