"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CategorizedEvent, DashboardStats } from "@/lib/types";
import { generateSampleData } from "@/lib/sample-data";
import { computeStats } from "@/lib/stats";
import MeetingStats from "@/components/charts/MeetingStats";
import TimeByCategory from "@/components/charts/TimeByCategory";
import WeeklyTrend from "@/components/charts/WeeklyTrend";
import TopCompanies from "@/components/charts/TopCompanies";
import DayOfWeek from "@/components/charts/DayOfWeek";
import DurationDistribution from "@/components/charts/DurationDistribution";
import InternalExternal from "@/components/charts/InternalExternal";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDemo = searchParams.get("demo") === "true";

  const [events, setEvents] = useState<CategorizedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDemo) {
      const data = generateSampleData(12);
      setEvents(data);
      setLoading(false);
      return;
    }

    fetch("/api/calendar")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch calendar data");
        return res.json();
      })
      .then((data) => {
        setEvents(data.events);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isDemo]);

  const stats: DashboardStats | null = useMemo(() => {
    if (events.length === 0) return null;
    return computeStats(events);
  }, [events]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
          <p className="text-zinc-400">Analyzing your calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <p className="text-red-400 text-lg">Something went wrong</p>
          <p className="text-zinc-500">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-sm">
              VC
            </div>
            <span className="text-white font-semibold">VC Wrapped</span>
            {isDemo && (
              <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                Demo Mode
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/wrapped" + (isDemo ? "?demo=true" : ""))}
              className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Get Your Wrapped Card
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Your Calendar Analytics
          </h1>
          <p className="text-zinc-400">
            {stats.totalMeetings} meetings analyzed over the last 12 months
          </p>
        </div>

        <MeetingStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TimeByCategory stats={stats} />
          <TopCompanies stats={stats} />
        </div>

        <WeeklyTrend stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DayOfWeek stats={stats} />
          <DurationDistribution stats={stats} />
          <InternalExternal stats={stats} />
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
