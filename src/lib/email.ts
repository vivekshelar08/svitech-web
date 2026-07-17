import { Resend } from "resend";
import { getEmailConfig, hasResend } from "@/lib/env";

function client() {
  const { apiKey } = getEmailConfig();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  if (!hasResend()) {
    console.info("[email:skipped]", options.subject, options.to);
    return { skipped: true as const };
  }
  const resend = client();
  const { from } = getEmailConfig();
  if (!resend) return { skipped: true as const };

  const result = await resend.emails.send({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });

  if (result.error) {
    console.error("[email:error]", result.error);
    throw new Error(result.error.message);
  }
  return { skipped: false as const, id: result.data?.id };
}

export async function notifyTeam(subject: string, html: string) {
  const { notifyTo } = getEmailConfig();
  return sendEmail({ to: notifyTo, subject, html });
}

export function donationReceiptHtml(opts: {
  name: string;
  amountInr: number;
  frequency: string;
  paymentId: string;
}) {
  const freq =
    opts.frequency === "monthly" ? "Monthly donation" : "One-time donation";
  return `
    <div style="font-family: Georgia, serif; color: #0c2e2f; line-height: 1.5;">
      <h1 style="font-size: 22px;">Thank you, ${escapeHtml(opts.name)}</h1>
      <p>We received your ${freq.toLowerCase()} of <strong>₹${opts.amountInr.toLocaleString("en-IN")}</strong>.</p>
      <p>Payment reference: <code>${escapeHtml(opts.paymentId)}</code></p>
      <p>Your support funds facilitator stipends, shared lab equipment, and open curriculum that stays free for communities.</p>
      <p>— SVITECH Foundation<br/><a href="https://svitech.in">svitech.in</a></p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
