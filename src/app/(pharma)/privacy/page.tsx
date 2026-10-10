import LegalLayout from "@/components/layout/LegalLayout";

export const metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="13 September 2026">
      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">1. Who we are</h2>
        <p>
          Milarch (&quot;Milarch&quot;, &quot;we&quot;, &quot;us&quot;) operates this website and the Milarch
          Pharma and Milarch Tech brands from Hyderabad, Telangana, India. This policy explains what
          information we collect when you use this site, why we collect it, and how we handle it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">2. Information we collect</h2>
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Contact details you submit through our contact form or checkout: name, email, phone number, delivery address.</li>
          <li>Order details: products purchased, quantities, and payment status (payment card/UPI details are handled directly by Razorpay and are never stored on our servers).</li>
          <li>Prescription documents you upload for prescription-required products, used solely to verify your order before dispatch.</li>
          <li>Basic technical data (browser type, pages visited) collected automatically to keep the site working correctly.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">3. How we use it</h2>
        <p>
          We use your information to process and deliver orders, verify prescriptions where required by
          law, respond to enquiries, and send order-related communication over email or WhatsApp. We do
          not sell your personal data to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">4. Third-party services</h2>
        <p>
          Payments are processed by Razorpay. Order and enquiry emails are sent via Resend. These
          providers process data on our behalf under their own security and privacy standards.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">5. Data retention & security</h2>
        <p>
          We retain order and prescription records for as long as necessary to comply with applicable
          pharmaceutical and tax record-keeping requirements, and take reasonable technical measures to
          protect your data from unauthorised access.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">6. Your rights</h2>
        <p>
          You can request access to, correction of, or deletion of your personal data by contacting us
          at{" "}
          <a href="mailto:info@milarch.in" className="text-teal underline">
            info@milarch.in
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-3">7. Contact</h2>
        <p>
          Milarch, Hyderabad, Telangana, India — <a href="mailto:info@milarch.in" className="text-teal underline">info@milarch.in</a> ·{" "}
          <a href="https://wa.me/917083820068" className="text-teal underline">WhatsApp</a>
        </p>
      </section>
    </LegalLayout>
  );
}
