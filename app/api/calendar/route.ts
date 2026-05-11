import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { fetchGoogleCalendarEvents } from "@/lib/google-calendar";
import { fetchOutlookCalendarEvents } from "@/lib/outlook-calendar";
import { categorizeEvents } from "@/lib/analyze";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const s = session as unknown as Record<string, unknown>;
  const accessToken = s.accessToken as string;
  const provider = s.provider as string;

  if (!accessToken) {
    return Response.json({ error: "No access token" }, { status: 401 });
  }

  try {
    const events =
      provider === "google"
        ? await fetchGoogleCalendarEvents(accessToken)
        : await fetchOutlookCalendarEvents(accessToken);

    const categorized = categorizeEvents(events);

    return Response.json({ events: categorized });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
