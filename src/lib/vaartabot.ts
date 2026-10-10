/**
 * Sends one WhatsApp template message via VaartaBot's external CRM API
 * (POST /api/v1/messages/send, X-API-Key auth) to a single phone number.
 * Never throws — notification failures must not break the enquiry/order
 * flow that triggered them.
 */
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function attemptSend(to: string, templateName: string, variables: string[]) {
  const apiKey = process.env.VAARTABOT_API_KEY;
  if (!apiKey || !to) return { ok: true }; // not configured — nothing to retry

  const baseUrl = process.env.VAARTABOT_API_URL || "https://vaartabot.com";

  try {
    const res = await fetch(`${baseUrl}/api/v1/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ to, templateName, language: "en", variables }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, status: res.status, body };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err };
  }
}

/**
 * Sends one WhatsApp template message via VaartaBot's external CRM API
 * (POST /api/v1/messages/send, X-API-Key auth) to a single phone number.
 * Never throws — notification failures must not break the enquiry/order
 * flow that triggered them. Retries once on failure — VaartaBot's tenant
 * credit-lock transaction is flaky under concurrent requests, so a lone
 * retry (after a short pause) reliably clears transient failures.
 */
export async function sendWhatsAppMessageTo(to: string, templateName: string, variables: string[]) {
  let result = await attemptSend(to, templateName, variables);
  if (!result.ok) {
    await sleep(500);
    result = await attemptSend(to, templateName, variables);
  }
  if (!result.ok) {
    console.error("VaartaBot notification failed after retry", to, result.status ?? result.error, result.body);
  }
}

/**
 * Sends a WhatsApp template message to every admin number configured in
 * VAARTABOT_NOTIFY_PHONES (comma-separated). Recipients are sent one at a
 * time, not concurrently — VaartaBot's per-tenant send endpoint is flaky
 * under simultaneous requests (its credit-check transaction appears to
 * serialize badly), so sequential sends with each retrying once are far
 * more reliable than firing them all in parallel.
 */
export async function sendWhatsAppNotification(templateName: string, variables: string[]) {
  const recipients = (process.env.VAARTABOT_NOTIFY_PHONES || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const to of recipients) {
    await sendWhatsAppMessageTo(to, templateName, variables);
  }
}
