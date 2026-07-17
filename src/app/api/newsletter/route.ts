import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import { notifyTeam, sendEmail } from "@/lib/email";
import { saveNewsletter } from "@/lib/store";
import { newsletterSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await readJson<unknown>(request);
    const input = newsletterSchema.parse(body);
    await saveNewsletter(input);
    await sendEmail({
      to: input.email,
      subject: "You’re on the SVITECH Foundation list",
      html: `<p>Thanks for subscribing. We’ll share program updates, events, and impact notes—never spam.</p>`,
    });
    await notifyTeam(
      `Newsletter signup — ${input.email}`,
      `<p>${input.email} subscribed (${input.source || "website"}).</p>`,
    );
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return fromZod(error);
    console.error(error);
    return jsonError(
      error instanceof Error ? error.message : "Failed to subscribe",
      500,
    );
  }
}
