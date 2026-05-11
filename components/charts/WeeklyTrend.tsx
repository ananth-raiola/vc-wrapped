"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardStats } from "@/lib/types";

interface Props {
  stats: DashboardStats;
}

export default function WeeklyTrend({ stats }: Props) {
  const data = stats.weeklyTrend.map((w) => ({
    week: new Date(w.week).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    hours: w.hours,
  }));

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h3 className="text-white font-semibold mb-4">Meeting Hours per Week</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="week"
              stroke="#52525b"
              fontSize={11}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#52525b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}h`}
            />
            <Tooltip
              contentStyle={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}h`, "Hours"]}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#colorHours)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
