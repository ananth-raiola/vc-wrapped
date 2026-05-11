"use client";

import { useRef } from "react";
import { WrappedData } from "@/lib/types";

interface Props {
  data: WrappedData;
}

export default function WrappedCard({ data }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = "vc-wrapped-2025.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* The Card */}
      <div
        ref={cardRef}
        className="w-[400px] rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0c1222 0%, #0a1628 25%, #0d1f3c 50%, #071a2e 75%, #0a0f1a 100%)",
        }}
      >
        <div className="p-8 flex flex-col items-center text-center">
          {/* Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[10px] font-bold text-black">
              VC
            </div>
            <span className="text-zinc-400 text-sm font-medium tracking-wider uppercase">
              VC Wrapped 2025
            </span>
          </div>

          {/* Main stat */}
          <div className="mb-8">
            <p className="text-6xl font-bold bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent leading-tight">
              {data.totalHours.toLocaleString()}
            </p>
            <p className="text-zinc-400 text-base mt-1">hours in meetings</p>
            <p className="text-zinc-500 text-sm">
              across {data.totalMeetings.toLocaleString()} meetings
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-8" />

          {/* Stats grid */}
          <div className="w-full space-y-6">
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                Your #1 Focus
              </p>
              <p className="text-white text-xl font-semibold">
                {data.topCategory.name}
              </p>
              <p className="text-emerald-400 text-sm">
                {data.topCategory.percentage}% of your time
              </p>
            </div>

            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                Top Company
              </p>
              <p className="text-white text-xl font-semibold">
                {data.topCompany.name}
              </p>
              <p className="text-cyan-400 text-sm">
                {data.topCompany.count} meetings
              </p>
            </div>

            <div className="flex justify-between">
              <div className="text-center flex-1">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                  Busiest Day
                </p>
                <p className="text-white font-semibold">{data.busiestDay}</p>
              </div>
              <div className="w-px bg-zinc-800" />
              <div className="text-center flex-1">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                  Longest Streak
                </p>
                <p className="text-white font-semibold">
                  {data.longestBackToBack}h
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-zinc-800/50 w-full">
            <p className="text-zinc-600 text-xs">vcwrapped.com</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-500 text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          Download PNG
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "My VC Wrapped 2025",
                text: `I spent ${data.totalHours} hours in meetings this year. My #1 focus: ${data.topCategory.name} (${data.topCategory.percentage}%). Get your VC Wrapped at vcwrapped.com`,
              });
            } else {
              navigator.clipboard.writeText(
                `I spent ${data.totalHours} hours in meetings this year. My #1 focus: ${data.topCategory.name} (${data.topCategory.percentage}%). Get your VC Wrapped at vcwrapped.com`
              );
              alert("Copied to clipboard!");
            }
          }}
          className="px-6 py-3 bg-zinc-800 text-white font-medium rounded-xl border border-zinc-700 hover:bg-zinc-700 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  );
}
