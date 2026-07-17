import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import { donationReceiptHtml, notifyTeam, sendEmail } from "@/lib/email";
import {
  verifyPaymentSignature,
  verifySubscriptionPaymentSignature,
} from "@/lib/razorpay";
import { getDonation, updateDonation } from "@/lib/store";
import { donateVerifySchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await readJson<unknown>(request);
    const input = donateVerifySchema.parse(body);

    const donation = await getDonation(input.donationId);
    const amountPaise =
      donation && typeof donation === "object" && "amount_paise" in donation
        ? Number((donation as { amount_paise: number }).amount_paise)
        : null;
    const frequency =
      donation && typeof donation === "object" && "frequency" in donation
        ? String((donation as { frequency: string }).frequency)
        : input.razorpay_subscription_id
          ? "monthly"
          : "one_time";
    const name =
      donation && typeof donation === "object" && "name" in donation
        ? String((donation as { name: string }).name)
        : "Friend";
    const email =
      donation && typeof donation === "object" && "email" in donation
        ? String((donation as { email: string }).email)
        : null;

    let valid = false;
    if (input.razorpay_subscription_id) {
      valid = verifySubscriptionPaymentSignature({
        paymentId: input.razorpay_payment_id,
        subscriptionId: input.razorpay_subscription_id,
        signature: input.razorpay_signature,
      });
    } else if (input.razorpay_order_id) {
      valid = verifyPaymentSignature({
        orderId: input.razorpay_order_id,
        paymentId: input.razorpay_payment_id,
        signature: input.razorpay_signature,
      });
    }

    if (!valid) return jsonError("Invalid payment signature", 400);

    await updateDonation(input.donationId, {
      status: "paid",
      razorpay_payment_id: input.razorpay_payment_id,
      razorpay_order_id: input.razorpay_order_id || null,
      razorpay_subscription_id: input.razorpay_subscription_id || null,
    });

    if (email && amountPaise) {
      await sendEmail({
        to: email,
        subject: "Thank you for supporting SVITECH Foundation",
        html: donationReceiptHtml({
          name,
          amountInr: Math.round(amountPaise / 100),
          frequency,
          paymentId: input.razorpay_payment_id,
        }),
      });
      await updateDonation(input.donationId, { receipt_sent: true });
    }

    await notifyTeam(
      `Donation paid — ₹${amountPaise ? Math.round(amountPaise / 100) : "?"}`,
      `<p>${name} (${email || "unknown"}) completed a ${frequency} gift.</p>
       <p>Payment: ${input.razorpay_payment_id}</p>`,
    );

    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return fromZod(error);
    console.error(error);
    return jsonError(
      error instanceof Error ? error.message : "Verification failed",
      500,
    );
  }
}
