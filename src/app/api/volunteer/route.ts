import { fromZod, jsonError, jsonOk, readJson } from "@/lib/api";
import { notifyTeam } from "@/lib/email";
import { saveVolunteer } from "@/lib/store";
import { volunteerSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const body = await readJson<unknown>(request);
    const input = volunteerSchema.parse(body);
    await saveVolunteer({
      ...input,
      phone: input.phone || null,
    });
    await notifyTeam(
      `Volunteer application — ${input.name}`,
      `<p><strong>${input.name}</strong> (${input.email})</p>
       <p>Phone: ${input.phone || "—"}</p>
       <p>Skills: ${input.skills}</p>
       <p>Availability: ${input.availability}</p>
       <p>${input.motivation}</p>`,
    );
    return jsonOk({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) return fromZod(error);
    console.error(error);
    return jsonError(
      error instanceof Error ? error.message : "Failed to submit",
      500,
    );
  }
}
