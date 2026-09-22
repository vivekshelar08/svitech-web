"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

const defaultPresets = [500, 1000, 2500, 5000];

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

const fieldClass =
  "mt-1.5 w-full border border-line bg-white px-3.5 py-3 text-base text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-brand focus:ring-2 focus:ring-brand/15 sm:py-2.5 sm:text-sm";

export function DonateForm({
  initialAmount,
  presetAmounts = defaultPresets,
  organizationName = "SVITECH Foundation",
}: {
  initialAmount?: number;
  presetAmounts?: number[];
  organizationName?: string;
}) {
  const router = useRouter();
  const presets = presetAmounts.length > 0 ? presetAmounts : defaultPresets;
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [amount, setAmount] = useState(() => {
    if (initialAmount && presets.includes(initialAmount)) return initialAmount;
    return presets[1] ?? presets[0] ?? 1000;
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
        name: organizationName,
        description: frequency === "monthly" ? "Monthly donation" : "One-time donation",
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
          router.push(`/donate/thanks?amount=${amountInr}&frequency=${frequency}`);
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
        className="relative overflow-hidden border border-line/80 bg-white shadow-[0_24px_60px_-28px_rgba(11,20,36,0.4)]"
        aria-labelledby="donate-form-heading"
      >
        <div
          className="h-1 w-full bg-gradient-to-r from-brand via-brand-bright to-accent"
          aria-hidden
        />
        <div className="space-y-7 p-5 sm:p-7 md:p-8">
          <div>
            <p className="site-eyebrow !text-brand">Secure checkout</p>
            <h2
              id="donate-form-heading"
              className="mt-2 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              Choose your gift
            </h2>
          </div>

          <fieldset>
            <legend className="text-sm font-semibold text-ink">Frequency</legend>
            <div
              className="mt-3 grid grid-cols-2 gap-1 border border-line bg-surface p-1"
              role="group"
              aria-label="Donation frequency"
            >
              <button
                type="button"
                aria-pressed={frequency === "one_time"}
                onClick={() => setFrequency("one_time")}
                className={`min-h-11 px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
                  frequency === "one_time"
                    ? "bg-brand text-white shadow-sm"
                    : "text-ink-muted hover:bg-white hover:text-ink"
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                aria-pressed={frequency === "monthly"}
                onClick={() => setFrequency("monthly")}
                className={`min-h-11 px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
                  frequency === "monthly"
                    ? "bg-brand text-white shadow-sm"
                    : "text-ink-muted hover:bg-white hover:text-ink"
                }`}
              >
                Monthly
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-ink">Amount (INR)</legend>
            <div
              className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
              role="group"
              aria-label="Preset amounts"
            >
              {presets.map((value) => {
                const active = !custom && amount === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setAmount(value);
                      setCustom("");
                    }}
                    className={`min-h-12 border px-3 py-3 font-display text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 ${
                      active
                        ? "border-accent bg-accent text-ink shadow-sm"
                        : "border-line bg-white text-ink hover:border-brand/40"
                    }`}
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                );
              })}
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
              className={fieldClass}
            />
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="d-name" className="block text-sm font-semibold text-ink">
                Name
              </label>
              <input id="d-name" name="name" required autoComplete="name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="d-email" className="block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                id="d-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="d-phone" className="block text-sm font-semibold text-ink">
              Phone <span className="font-normal text-ink-muted">(optional)</span>
            </label>
            <input
              id="d-phone"
              name="phone"
              autoComplete="tel"
              className={fieldClass}
            />
          </div>

          <div className="border border-line/80 bg-surface/80 px-4 py-3 text-sm text-ink-muted">
            You’re giving{" "}
            <strong className="font-display text-base text-ink">
              ₹{amountInr.toLocaleString("en-IN")}
            </strong>
            {frequency === "monthly" ? " every month" : " once"}. Card, UPI, and netbanking
            are supported.
          </div>

          <button
            type="submit"
            disabled={status === "loading" || amountInr < 100}
            className="btn-primary w-full disabled:opacity-60"
          >
            {status === "loading" ? "Opening checkout…" : "Continue to donate"}
          </button>

          {!configured ? (
            <p className="text-sm text-ink-muted">
              Prefer bank transfer or CSR giving?{" "}
              <a href="/contact" className="font-semibold text-brand underline-offset-2 hover:underline">
                Contact us
              </a>
              .
            </p>
          ) : null}
          {status === "error" ? (
            <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
