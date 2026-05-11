import { CalendarEvent } from "./types";

export async function fetchGoogleCalendarEvents(
  accessToken: string,
  monthsBack: number = 12
): Promise<CalendarEvent[]> {
  const timeMin = new Date();
  timeMin.setMonth(timeMin.getMonth() - monthsBack);

  const events: CalendarEvent[] = [];
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      timeMin: timeMin.toISOString(),
      timeMax: new Date().toISOString(),
      maxResults: "250",
      singleEvents: "true",
      orderBy: "startTime",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!res.ok) {
      throw new Error(`Google Calendar API error: ${res.status}`);
    }

    const data = await res.json();

    for (const item of data.items || []) {
      if (!item.start?.dateTime || !item.end?.dateTime) continue;
      if (item.status === "cancelled") continue;

      const start = new Date(item.start.dateTime);
      const end = new Date(item.end.dateTime);
      const duration = Math.round((end.getTime() - start.getTime()) / 60000);

      if (duration <= 0 || duration > 480) continue;

      events.push({
        id: item.id,
        title: item.summary || "No title",
        description: item.description || "",
        start: start.toISOString(),
        end: end.toISOString(),
        duration,
        attendees: (item.attendees || []).map(
          (a: { email?: string }) => a.email || ""
        ),
        isRecurring: !!item.recurringEventId,
        source: "google",
      });
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return events;
}
