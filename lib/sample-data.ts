import { CategorizedEvent, MeetingCategory } from "./types";

const COMPANIES = [
  "Acme AI",
  "QuantumLeap",
  "NovaBio",
  "FinStack",
  "GreenGrid",
  "DataMesh",
  "CloudPilot",
  "NeuroTech",
  "PayFlow",
  "AgriSense",
  "BuildKit",
  "CyberVault",
  "DevPlatform",
  "EduSync",
  "HealthBridge",
  "InsureTech",
  "LogiChain",
  "MediaAI",
  "PropTech",
  "RoboOps",
];

const CATEGORIES: MeetingCategory[] = [
  "Deal Sourcing",
  "Portfolio Support",
  "Internal",
  "Fundraising",
  "Networking",
  "Admin/Other",
];

const CATEGORY_WEIGHTS = [0.3, 0.2, 0.2, 0.1, 0.12, 0.08];

const MEETING_TEMPLATES: Record<MeetingCategory, string[]> = {
  "Deal Sourcing": [
    "Intro call - {company}",
    "Pitch: {company}",
    "Follow-up - {company}",
    "Deep dive: {company}",
    "Reference call - {company}",
    "Partner meeting re: {company}",
    "Due diligence - {company}",
    "Term sheet discussion - {company}",
  ],
  "Portfolio Support": [
    "Board meeting - {company}",
    "Monthly check-in: {company}",
    "Strategy session - {company}",
    "{company} - hiring review",
    "{company} quarterly review",
    "Fundraise prep - {company}",
  ],
  Internal: [
    "Monday team standup",
    "Partner meeting",
    "Investment committee",
    "Weekly 1:1 with {person}",
    "Fund strategy session",
    "Pipeline review",
    "Team offsite planning",
    "Portfolio review",
  ],
  Fundraising: [
    "LP update call",
    "LP meeting - {lp}",
    "Annual meeting prep",
    "Fund III planning",
    "LP due diligence call",
    "Advisory board meeting",
  ],
  Networking: [
    "Coffee with {person}",
    "VC dinner",
    "Conference: Tech Summit",
    "Founder drinks",
    "Mentor session",
    "Panel: Future of AI",
    "Industry meetup",
    "Co-investor catch-up",
  ],
  "Admin/Other": [
    "Legal review",
    "Compliance check",
    "Admin time",
    "Travel planning",
    "Expense review",
    "IT setup",
  ],
};

const PEOPLE = [
  "Sarah",
  "Raj",
  "Michael",
  "Priya",
  "David",
  "Maya",
  "Alex",
  "Neel",
];
const LPS = [
  "Endowment Capital",
  "Family Office A",
  "Sovereign Fund",
  "Pension Fund",
  "DFI Group",
];

function weightedRandom(weights: number[]): number {
  const total = weights.reduce((s, w) => s + w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTitle(category: MeetingCategory): {
  title: string;
  company?: string;
} {
  const templates = MEETING_TEMPLATES[category];
  let title = randomFrom(templates);
  let company: string | undefined;

  if (title.includes("{company}")) {
    company = randomFrom(COMPANIES);
    title = title.replace("{company}", company);
  }
  if (title.includes("{person}")) {
    title = title.replace("{person}", randomFrom(PEOPLE));
  }
  if (title.includes("{lp}")) {
    title = title.replace("{lp}", randomFrom(LPS));
  }

  return { title, company };
}

function randomDuration(category: MeetingCategory): number {
  const durations: Record<MeetingCategory, number[]> = {
    "Deal Sourcing": [30, 30, 45, 60, 60, 60, 90],
    "Portfolio Support": [30, 60, 60, 90, 120],
    Internal: [15, 30, 30, 45, 60],
    Fundraising: [30, 60, 60, 90],
    Networking: [30, 45, 60],
    "Admin/Other": [15, 30, 30],
  };
  return randomFrom(durations[category]);
}

export function generateSampleData(months: number = 12): CategorizedEvent[] {
  const events: CategorizedEvent[] = [];
  const now = new Date();
  const start = new Date(now);
  start.setMonth(start.getMonth() - months);

  const current = new Date(start);

  while (current < now) {
    const dayOfWeek = current.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      current.setDate(current.getDate() + 1);
      continue;
    }

    const meetingsToday = 3 + Math.floor(Math.random() * 5);

    let nextStart = 9 * 60 + Math.floor(Math.random() * 30);

    for (let i = 0; i < meetingsToday; i++) {
      if (nextStart >= 18 * 60) break;

      const categoryIndex = weightedRandom(CATEGORY_WEIGHTS);
      const category = CATEGORIES[categoryIndex];
      const { title, company } = generateTitle(category);
      const duration = randomDuration(category);

      const eventStart = new Date(current);
      eventStart.setHours(Math.floor(nextStart / 60), nextStart % 60, 0, 0);

      const eventEnd = new Date(
        eventStart.getTime() + duration * 60 * 1000
      );

      events.push({
        id: `sample-${events.length}`,
        title,
        start: eventStart.toISOString(),
        end: eventEnd.toISOString(),
        duration,
        attendees: [],
        isRecurring: Math.random() > 0.6,
        source: "google",
        category,
        company,
      });

      const gap = Math.random() > 0.4 ? Math.floor(Math.random() * 30) : 0;
      nextStart += duration + gap;
    }

    current.setDate(current.getDate() + 1);
  }

  return events;
}
