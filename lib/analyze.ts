import { CalendarEvent, CategorizedEvent, MeetingCategory } from "./types";

const CATEGORY_KEYWORDS: Record<MeetingCategory, string[]> = {
  "Deal Sourcing": [
    "pitch",
    "intro call",
    "founder",
    "startup",
    "due diligence",
    "dd call",
    "term sheet",
    "deal review",
    "deep dive",
    "reference call",
    "inbound",
    "demo",
    "first meeting",
    "screening",
  ],
  "Portfolio Support": [
    "board meeting",
    "board",
    "portfolio",
    "check-in",
    "check in",
    "quarterly review",
    "strategy session",
    "hiring",
    "fundraise prep",
    "follow-on",
  ],
  Internal: [
    "standup",
    "stand-up",
    "team",
    "partner meeting",
    "investment committee",
    "ic meeting",
    "1:1",
    "one on one",
    "pipeline review",
    "offsite",
    "all hands",
    "internal",
  ],
  Fundraising: [
    "lp",
    "limited partner",
    "fundrais",
    "fund iii",
    "fund iv",
    "annual meeting",
    "advisory board",
    "investor update",
    "capital call",
  ],
  Networking: [
    "coffee",
    "lunch",
    "dinner",
    "drinks",
    "conference",
    "summit",
    "panel",
    "meetup",
    "mentor",
    "catch-up",
    "catch up",
    "networking",
    "fireside",
  ],
  "Admin/Other": [
    "legal",
    "compliance",
    "admin",
    "expense",
    "travel",
    "it setup",
    "ops",
    "operations",
    "hr",
  ],
};

function extractCompanyName(title: string): string | undefined {
  const patterns = [
    /(?:intro call|pitch|deep dive|follow-up|board meeting|check-in|due diligence|reference call|strategy session|quarterly review|monthly check-in|fundraise prep|hiring review|term sheet discussion|partner meeting re)\s*[-:]\s*(.+)/i,
    /(.+?)\s*[-:]\s*(?:intro|pitch|review|update|check-in|board|dd|deep dive)/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);
    if (match) return match[1].trim();
  }
  return undefined;
}

export function categorizeEvents(
  events: CalendarEvent[]
): CategorizedEvent[] {
  return events.map((event) => {
    const titleLower = event.title.toLowerCase();
    const descLower = (event.description || "").toLowerCase();
    const combined = `${titleLower} ${descLower}`;

    let bestCategory: MeetingCategory = "Admin/Other";
    let bestScore = 0;

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      let score = 0;
      for (const keyword of keywords) {
        if (combined.includes(keyword)) {
          score += keyword.length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestCategory = category as MeetingCategory;
      }
    }

    const company = extractCompanyName(event.title);

    return {
      ...event,
      category: bestCategory,
      company,
    };
  });
}
