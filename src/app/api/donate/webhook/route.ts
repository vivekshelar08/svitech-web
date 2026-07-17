import { jsonError, jsonOk } from "@/lib/api";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { updateDonation } from "@/lib/store";
import { getAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";

  if (!verifyWebhookSignature(rawBody, signature)) {
    return jsonError("Invalid webhook signature", 400);
  }

  try {
    const payload = JSON.parse(rawBody) as {
      event?: string;
      payload?: {
        payment?: { entity?: { id?: string; order_id?: string; notes?: Record<string, string> } };
        subscription?: { entity?: { id?: string; notes?: Record<string, string> } };
      };
    };

    const event = payload.event || "";
    const payment = payload.payload?.payment?.entity;
    const subscription = payload.payload?.subscription?.entity;
    const donationId =
      payment?.notes?.donation_id || subscription?.notes?.donation_id;

    if (donationId && (event.includes("captured") || event.includes("activated"))) {
      await updateDonation(donationId, {
        status: "paid",
        razorpay_payment_id: payment?.id || null,
        razorpay_order_id: payment?.order_id || null,
        razorpay_subscription_id: subscription?.id || null,
      });
    }

    if (!donationId && payment?.order_id) {
      const admin = getAdminClient();
      if (admin) {
        await admin
          .from("donations")
          .update({
            status: "paid",
            razorpay_payment_id: payment.id,
            updated_at: new Date().toISOString(),
          })
          .eq("razorpay_order_id", payment.order_id);
      }
    }

    return jsonOk({ received: true });
  } catch (error) {
    console.error(error);
    return jsonError("Webhook processing failed", 500);
  }
}
