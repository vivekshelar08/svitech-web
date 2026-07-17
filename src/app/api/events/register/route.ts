import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import { getEvent } from "@/lib/content";
import { notifyTeam, sendEmail } from "@/lib/email";
import { saveEventRegistration } from "@/lib/store";
import { eventRegisterSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await readJson<unknown>(request);
    const input = eventRegisterSchema.parse(body);
    const event = await getEvent(input.eventSlug);
    if (!event) return jsonError("Event not found", 404);
    if (!event.registrationOpen) return jsonError("Registration is closed", 400);

    await saveEventRegistration({
      event_slug: input.eventSlug,
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      notes: input.notes || null,
    });

    await sendEmail({
      to: input.email,
      subject: `Registered: ${event.title}`,
      html: `<p>Thanks ${input.name}. You’re registered for <strong>${event.title}</strong>.</p>
             <p>${event.location}<br/>${new Date(event.startsAt).toLocaleString("en-IN")}</p>`,
    });
    await notifyTeam(
      `Event registration — ${event.title}`,
      `<p>${input.name} (${input.email}) registered for ${event.title}.</p>`,
    );

    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return fromZod(error);
    console.error(error);
    return jsonError(
      error instanceof Error ? error.message : "Failed to register",
      500,
    );
  }
}
