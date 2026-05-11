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
    gradient: "from-emerald-400 to-cyan-500",
  },
  {
    key: "companies",
    label: "Companies Met",
    format: (s: DashboardStats) => s.uniqueCompanies.toString(),
    sub: () => "unique companies",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    key: "avgWeek",
    label: "Avg Meetings/Week",
    format: (s: DashboardStats) => s.avgMeetingsPerWeek.toString(),
    sub: (s: DashboardStats) => `busiest: ${s.busiestDay}`,
    gradient: "from-orange-400 to-pink-500",
  },
  {
    key: "backToBack",
    label: "Longest Streak",
    format: (s: DashboardStats) => `${s.longestBackToBack}h`,
    sub: () => "back-to-back meetings",
    gradient: "from-blue-400 to-indigo-500",
  },
];

export default function MeetingStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800"
        >
          <p className="text-sm text-zinc-400 mb-1">{card.label}</p>
          <p
            className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
          >
            {card.format(stats)}
          </p>
          <p className="text-xs text-zinc-500 mt-1">{card.sub(stats)}</p>
        </div>
      ))}
    </div>
  );
}
