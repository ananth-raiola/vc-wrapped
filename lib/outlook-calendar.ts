import { CalendarEvent } from "./types";

export async function fetchOutlookCalendarEvents(
  accessToken: string,
  monthsBack: number = 12
): Promise<CalendarEvent[]> {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - monthsBack);

  const events: CalendarEvent[] = [];
  let nextUrl: string | null =
    `https://graph.microsoft.com/v1.0/me/calendarview` +
    `?startDateTime=${startDate.toISOString()}` +
    `&endDateTime=${new Date().toISOString()}` +
    `&$top=100` +
    `&$select=id,subject,body,start,end,attendees,seriesMasterId` +
    `&$orderby=start/dateTime`;

  while (nextUrl) {
    const res: Response = await fetch(nextUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      throw new Error(`Microsoft Graph API error: ${res.status}`);
    }

    const data = await res.json();

    for (const item of data.value || []) {
      const start = new Date(item.start.dateTime + "Z");
      const end = new Date(item.end.dateTime + "Z");
      const duration = Math.round((end.getTime() - start.getTime()) / 60000);

      if (duration <= 0 || duration > 480) continue;

      events.push({
        id: item.id,
        title: item.subject || "No title",
        description: item.body?.content || "",
        start: start.toISOString(),
        end: end.toISOString(),
        duration,
        attendees: (item.attendees || []).map(
          (a: { emailAddress?: { address?: string } }) =>
            a.emailAddress?.address || ""
        ),
        isRecurring: !!item.seriesMasterId,
        source: "outlook",
      });
    }

    nextUrl = data["@odata.nextLink"] || null;
  }

  return events;
}
