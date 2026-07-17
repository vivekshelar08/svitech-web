import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import { getPublicRazorpayKey, hasRazorpay } from "@/lib/env";
import {
  createMonthlySubscription,
  createOneTimeOrder,
} from "@/lib/razorpay";
import { createDonationRecord, updateDonation } from "@/lib/store";
import { donateCreateSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    if (!hasRazorpay()) {
      return jsonError(
        "Donations are not configured yet. Set Razorpay keys to enable payments.",
        503,
      );
    }

    const body = await readJson<unknown>(request);
    const input = donateCreateSchema.parse(body);
    const amountPaise = input.amountInr * 100;
    const key = getPublicRazorpayKey();
    if (!key) return jsonError("Missing public Razorpay key", 500);

    const donationId = await createDonationRecord({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      amount_paise: amountPaise,
      frequency: input.frequency,
      status: "created",
    });

    if (input.frequency === "one_time") {
      const order = await createOneTimeOrder({
        amountPaise,
        receipt: donationId.replaceAll("-", "").slice(0, 40),
        notes: {
          donation_id: donationId,
          donor_email: input.email,
        },
      });

      await updateDonation(donationId, {
        status: "pending",
        razorpay_order_id: order.id,
      });

      return jsonOk({
        mode: "one_time" as const,
        donationId,
        key,
        orderId: order.id,
        amount: amountPaise,
        currency: "INR",
        name: input.name,
        email: input.email,
        phone: input.phone || "",
      });
    }

    const { subscription } = await createMonthlySubscription({
      amountPaise,
      donorName: input.name,
      donorEmail: input.email,
      notes: { donation_id: donationId },
    });

    await updateDonation(donationId, {
      status: "pending",
      razorpay_subscription_id: subscription.id,
    });

    return jsonOk({
      mode: "monthly" as const,
      donationId,
      key,
      subscriptionId: subscription.id,
      amount: amountPaise,
      currency: "INR",
      name: input.name,
      email: input.email,
      phone: input.phone || "",
    });
  } catch (error) {
    if (error instanceof ZodError) return fromZod(error);
    console.error(error);
    return jsonError(
      error instanceof Error ? error.message : "Failed to start donation",
      500,
    );
  }
}
