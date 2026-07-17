import Razorpay from "razorpay";
import crypto from "crypto";
import { getRazorpayConfig, hasRazorpay } from "@/lib/env";

export function getRazorpay() {
  if (!hasRazorpay()) return null;
  const { keyId, keySecret } = getRazorpayConfig();
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

export function verifyPaymentSignature(opts: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const { keySecret } = getRazorpayConfig();
  const body = `${opts.orderId}|${opts.paymentId}`;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");
  return expected === opts.signature;
}

export function verifySubscriptionPaymentSignature(opts: {
  paymentId: string;
  subscriptionId: string;
  signature: string;
}) {
  const { keySecret } = getRazorpayConfig();
  const body = `${opts.paymentId}|${opts.subscriptionId}`;
  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");
  return expected === opts.signature;
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const { webhookSecret } = getRazorpayConfig();
  if (!webhookSecret) return false;
  const expected = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");
  return expected === signature;
}

export async function createOneTimeOrder(opts: {
  amountPaise: number;
  receipt: string;
  notes?: Record<string, string>;
}) {
  const razorpay = getRazorpay();
  if (!razorpay) throw new Error("Razorpay is not configured");
  return razorpay.orders.create({
    amount: opts.amountPaise,
    currency: "INR",
    receipt: opts.receipt.slice(0, 40),
    notes: opts.notes,
  });
}

export async function createMonthlySubscription(opts: {
  amountPaise: number;
  donorName: string;
  donorEmail: string;
  notes?: Record<string, string>;
}) {
  const razorpay = getRazorpay();
  if (!razorpay) throw new Error("Razorpay is not configured");

  const plan = await razorpay.plans.create({
    period: "monthly",
    interval: 1,
    item: {
      name: `SVITECH monthly ₹${Math.round(opts.amountPaise / 100)}`,
      amount: opts.amountPaise,
      currency: "INR",
      description: "Monthly donation to SVITECH Foundation",
    },
  });

  const subscription = await razorpay.subscriptions.create({
    plan_id: plan.id,
    total_count: 120,
    customer_notify: 1,
    notes: {
      donor_name: opts.donorName,
      donor_email: opts.donorEmail,
      ...opts.notes,
    },
  });

  return { plan, subscription };
}
