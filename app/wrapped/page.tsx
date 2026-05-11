"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CategorizedEvent, WrappedData } from "@/lib/types";
import { generateSampleData } from "@/lib/sample-data";
import { computeStats, computeWrappedData } from "@/lib/stats";
import WrappedCard from "@/components/WrappedCard";

function WrappedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDemo = searchParams.get("demo") === "true";

  const [events, setEvents] = useState<CategorizedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      setEvents(generateSampleData(12));
      setLoading(false);
      return;
    }

    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isDemo]);

  const wrappedData: WrappedData | null = useMemo(() => {
    if (events.length === 0) return null;
    const stats = computeStats(events);
    return computeWrappedData(stats);
  }, [events]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-sm">
              VC
            </div>
            <span className="text-white font-semibold">VC Wrapped</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                router.push("/dashboard" + (isDemo ? "?demo=true" : ""))
              }
              className="px-4 py-2 text-zinc-400 hover:text-white text-sm transition-colors"
            >
              Dashboard
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

      <main className="flex flex-col items-center py-12 px-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Your VC Wrapped
        </h1>
        <p className="text-zinc-400 mb-10">
          Download your card and share it with the world
        </p>

        {wrappedData ? (
          <WrappedCard data={wrappedData} />
        ) : (
          <p className="text-zinc-500">No data available</p>
        )}
      </main>
    </div>
  );
}

export default function WrappedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      }
    >
      <WrappedContent />
    </Suspense>
  );
}
