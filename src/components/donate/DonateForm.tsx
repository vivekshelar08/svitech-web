"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

const presets = [500, 1000, 2500, 5000];

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature: string;
  razorpay_subscription_id?: string;
};

type RazorpayCheckout = {
  open: () => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}

export function DonateForm({ initialAmount }: { initialAmount?: number }) {
  const router = useRouter();
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [amount, setAmount] = useState(() => {
    if (initialAmount && presets.includes(initialAmount)) return initialAmount;
    return 1000;
  });
  const [custom, setCustom] = useState(() => {
    if (initialAmount && !presets.includes(initialAmount)) return String(initialAmount);
    return "";
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [configured, setConfigured] = useState(true);

  const amountInr = useMemo(() => {
    if (custom) {
      const n = Number(custom);
      return Number.isFinite(n) ? Math.round(n) : amount;
    }
    return amount;
  }, [amount, custom]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const createRes = await fetch("/api/donate/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          amountInr,
          frequency,
        }),
      });
      const createJson = (await createRes.json()) as {
        error?: string;
        mode?: "one_time" | "monthly";
        donationId?: string;
        key?: string;
        orderId?: string;
        subscriptionId?: string;
        amount?: number;
        currency?: string;
        name?: string;
        email?: string;
        phone?: string;
      };

      if (createRes.status === 503) {
        setConfigured(false);
        throw new Error(
          createJson.error ||
            "Online donations will go live once Razorpay keys are configured.",
        );
      }
      if (!createRes.ok) throw new Error(createJson.error || "Could not start donation");
      if (!window.Razorpay) throw new Error("Payment checkout failed to load");

      const options: Record<string, unknown> = {
        key: createJson.key,
        amount: createJson.amount,
        currency: createJson.currency || "INR",
        name: "SVITECH Foundation",
        description:
          frequency === "monthly"
            ? "Monthly donation"
            : "One-time donation",
        prefill: {
          name: createJson.name,
          email: createJson.email,
          contact: createJson.phone,
        },
        theme: { color: "#1b6ef5" },
        handler: async (response: RazorpaySuccess) => {
          const verifyRes = await fetch("/api/donate/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              donationId: createJson.donationId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              razorpay_subscription_id: response.razorpay_subscription_id,
            }),
          });
          if (!verifyRes.ok) {
            const v = (await verifyRes.json()) as { error?: string };
            throw new Error(v.error || "Payment verification failed");
          }
          router.push(
            `/donate/thanks?amount=${amountInr}&frequency=${frequency}`,
          );
        },
      };

      if (createJson.mode === "monthly") {
        options.subscription_id = createJson.subscriptionId;
      } else {
        options.order_id = createJson.orderId;
      }

      const checkout = new window.Razorpay(options);
      checkout.open();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Donation failed");
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <form
        onSubmit={onSubmit}
        className="space-y-8 border border-line bg-surface p-4 sm:p-6 md:p-8"
      >
        <div>
          <p className="text-sm font-medium text-ink">Give</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFrequency("one_time")}
              className={`px-4 py-3 text-sm font-semibold transition ${
                frequency === "one_time"
                  ? "bg-brand text-white"
                  : "border border-line bg-white text-ink hover:bg-white/80"
              }`}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => setFrequency("monthly")}
              className={`px-4 py-3 text-sm font-semibold transition ${
                frequency === "monthly"
                  ? "bg-brand text-white"
                  : "border border-line bg-white text-ink hover:bg-white/80"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-ink">Amount (INR)</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setAmount(value);
                  setCustom("");
                }}
                className={`px-4 py-2.5 text-sm font-semibold transition ${
                  !custom && amount === value
                    ? "bg-accent text-ink"
                    : "border border-line bg-white text-ink"
                }`}
              >
                ₹{value.toLocaleString("en-IN")}
              </button>
            ))}
          </div>
          <label htmlFor="custom-amount" className="mt-4 block text-sm text-ink-muted">
            Or enter a custom amount (min ₹100)
          </label>
          <input
            id="custom-amount"
            inputMode="numeric"
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="e.g. 1500"
            className="mt-2 w-full border border-line bg-white px-3 py-3 text-base outline-none focus:border-brand sm:py-2.5 sm:text-sm"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="d-name" className="block text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="d-name"
              name="name"
              required
              className="mt-2 w-full border border-line bg-white px-3 py-3 text-base outline-none focus:border-brand sm:py-2.5 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="d-email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="d-email"
              name="email"
              type="email"
              required
              className="mt-2 w-full border border-line bg-white px-3 py-3 text-base outline-none focus:border-brand sm:py-2.5 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="d-phone" className="block text-sm font-medium text-ink">
            Phone (optional)
          </label>
          <input
            id="d-phone"
            name="phone"
            className="mt-2 w-full border border-line bg-white px-3 py-3 text-base outline-none focus:border-brand sm:py-2.5 sm:text-sm"
          />
        </div>

        <p className="text-sm text-ink-muted">
          You’re giving <strong className="text-ink">₹{amountInr.toLocaleString("en-IN")}</strong>
          {frequency === "monthly" ? " every month" : " once"}. Card, UPI, and netbanking
          are supported—no cryptocurrency.
        </p>

        <button
          type="submit"
          disabled={status === "loading" || amountInr < 100}
          className="w-full bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {status === "loading" ? "Opening checkout…" : "Continue to donate"}
        </button>

        {!configured && (
          <p className="text-sm text-ink-muted">
            Prefer bank transfer or CSR giving?{" "}
            <a href="/contact" className="font-semibold text-brand underline">
              Contact us
            </a>
            .
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        )}
      </form>
    </>
  );
}
