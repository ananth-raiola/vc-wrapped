"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DashboardStats } from "@/lib/types";

const COLORS = [
  "#34d399",
  "#818cf8",
  "#fb923c",
  "#38bdf8",
  "#f472b6",
  "#a78bfa",
];

interface Props {
  stats: DashboardStats;
}

export default function TimeByCategory({ stats }: Props) {
  const data = stats.categoryBreakdown.map((c) => ({
    name: c.name,
    value: c.hours,
    count: c.count,
  }));

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h3 className="text-white font-semibold mb-4">Time by Category</h3>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value) => [`${value}h`, "Hours"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-sm text-zinc-300 flex-1">{item.name}</span>
              <span className="text-sm text-zinc-400">
                {Math.round((item.value / total) * 100)}%
              </span>
              <span className="text-sm text-zinc-500">{item.value}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
