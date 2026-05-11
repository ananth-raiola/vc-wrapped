"use client";

import { DashboardStats } from "@/lib/types";

interface Props {
  stats: DashboardStats;
}

export default function InternalExternal({ stats }: Props) {
  const { internal, external } = stats.internalVsExternal;
  const total = internal + external;
  const extPct = total > 0 ? Math.round((external / total) * 100) : 0;
  const intPct = total > 0 ? 100 - extPct : 0;

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h3 className="text-white font-semibold mb-4">Internal vs External</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-zinc-300">External</span>
            <span className="text-zinc-400">
              {external}h ({extPct}%)
            </span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full transition-all duration-700"
              style={{ width: `${extPct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-zinc-300">Internal</span>
            <span className="text-zinc-400">
              {internal}h ({intPct}%)
            </span>
          </div>
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${intPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
