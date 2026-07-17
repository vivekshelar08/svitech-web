import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import { notifyTeam } from "@/lib/email";
import { saveContact } from "@/lib/store";
import { contactSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await readJson<unknown>(request);
    const input = contactSchema.parse(body);
    await saveContact(input);
    await notifyTeam(
      `Contact: ${input.topic} — ${input.name}`,
      `<p><strong>${input.name}</strong> (${input.email})</p><p>Topic: ${input.topic}</p><p>${input.message}</p>`,
    );
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return fromZod(error);
    console.error(error);
    return jsonError(error instanceof Error ? error.message : "Failed to send", 500);
  }
}
