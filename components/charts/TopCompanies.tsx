"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardStats } from "@/lib/types";

interface Props {
  stats: DashboardStats;
}

export default function TopCompanies({ stats }: Props) {
  const data = stats.topCompanies.map((c) => ({
    name: c.name.length > 15 ? c.name.slice(0, 15) + "..." : c.name,
    hours: c.hours,
    meetings: c.count,
  }));

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h3 className="text-white font-semibold mb-4">
        Top Companies by Time Spent
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <XAxis
              type="number"
              stroke="#52525b"
              fontSize={11}
              tickLine={false}
              tickFormatter={(v) => `${v}h`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#52525b"
              fontSize={11}
              tickLine={false}
              width={100}
            />
            <Tooltip
              contentStyle={{
                background: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value, name) => [
                name === "hours" ? `${value}h` : value,
                name === "hours" ? "Hours" : "Meetings",
              ]}
            />
            <Bar
              dataKey="hours"
              fill="#34d399"
              radius={[0, 6, 6, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
