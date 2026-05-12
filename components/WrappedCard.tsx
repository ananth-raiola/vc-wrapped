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
    link.download = "venture-rapt-card.png";
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
            "linear-gradient(160deg, #0a0a0a 0%, #0d1117 20%, #111827 45%, #0f172a 70%, #0a0a0a 100%)",
        }}
      >
        <div className="p-10 flex flex-col items-center text-center">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
              <span
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-black font-bold text-[10px] tracking-tighter"
              >
                VR
              </span>
            </div>
            <span
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-zinc-500 text-sm font-medium tracking-widest uppercase"
            >
              Venture Rapt
            </span>
          </div>

          {/* Main stat */}
          <div className="mb-10">
            <p
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="text-7xl font-bold text-white leading-none tracking-tighter"
            >
              {data.totalHours.toLocaleString()}
            </p>
            <p className="text-zinc-500 text-base mt-2">hours in meetings</p>
            <p className="text-zinc-600 text-sm">
              across {data.totalMeetings.toLocaleString()} meetings
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-zinc-800 mb-10" />

          {/* Stats */}
          <div className="w-full space-y-7">
            <div>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.25em] mb-1.5 font-medium">
                Primary focus
              </p>
              <p
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-white text-2xl font-bold tracking-tight"
              >
                {data.topCategory.name}
              </p>
              <p className="text-zinc-400 text-sm mt-0.5">
                {data.topCategory.percentage}% of your time
              </p>
            </div>

            <div>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.25em] mb-1.5 font-medium">
                Top company
              </p>
              <p
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                className="text-white text-2xl font-bold tracking-tight"
              >
                {data.topCompany.name}
              </p>
              <p className="text-zinc-400 text-sm mt-0.5">
                {data.topCompany.count} meetings
              </p>
            </div>

            <div className="flex justify-between pt-2">
              <div className="text-center flex-1">
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.25em] mb-1.5 font-medium">
                  Peak day
                </p>
                <p
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-white font-bold text-lg tracking-tight"
                >
                  {data.busiestDay}
                </p>
              </div>
              <div className="w-px bg-zinc-800" />
              <div className="text-center flex-1">
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.25em] mb-1.5 font-medium">
                  Longest streak
                </p>
                <p
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  className="text-white font-bold text-lg tracking-tight"
                >
                  {data.longestBackToBack}h
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-zinc-800/50 w-full">
            <p className="text-zinc-700 text-[11px] tracking-wider uppercase">
              venturerap t.com
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors"
        >
          Download PNG
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "My Venture Rapt Card",
                text: `I spent ${data.totalHours} hours in meetings this year. My primary focus: ${data.topCategory.name} (${data.topCategory.percentage}%). Get your Rapt Card at venturerapt.com`,
              });
            } else {
              navigator.clipboard.writeText(
                `I spent ${data.totalHours} hours in meetings this year. My primary focus: ${data.topCategory.name} (${data.topCategory.percentage}%). Get your Rapt Card at venturerapt.com`
              );
              alert("Copied to clipboard!");
            }
          }}
          className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-colors"
        >
          Share
        </button>
      </div>
    </div>
  );
}
