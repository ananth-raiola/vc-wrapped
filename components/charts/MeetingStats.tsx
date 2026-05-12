"use client";

import { DashboardStats } from "@/lib/types";

interface Props {
  stats: DashboardStats;
}

const cards = [
  {
    key: "totalHours",
    label: "Total Hours",
    format: (s: DashboardStats) => s.totalHours.toLocaleString(),
    sub: (s: DashboardStats) => `across ${s.totalMeetings} meetings`,
  },
  {
    key: "companies",
    label: "Companies Met",
    format: (s: DashboardStats) => s.uniqueCompanies.toString(),
    sub: () => "unique companies",
  },
  {
    key: "avgWeek",
    label: "Avg Meetings/Week",
    format: (s: DashboardStats) => s.avgMeetingsPerWeek.toString(),
    sub: (s: DashboardStats) => `peak day: ${s.busiestDay}`,
  },
  {
    key: "backToBack",
    label: "Longest Streak",
    format: (s: DashboardStats) => `${s.longestBackToBack}h`,
    sub: () => "back-to-back meetings",
  },
];

export default function MeetingStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800/50"
        >
          <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider font-medium">
            {card.label}
          </p>
          <p className="text-3xl font-display font-bold text-white tracking-tight">
            {card.format(stats)}
          </p>
          <p className="text-xs text-zinc-600 mt-1">{card.sub(stats)}</p>
        </div>
      ))}
    </div>
  );
}
