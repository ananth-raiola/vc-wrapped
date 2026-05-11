"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-sm">
            VC
          </div>
          <span className="text-white font-semibold text-lg">VC Wrapped</span>
        </div>
        <button
          onClick={() => router.push("/dashboard?demo=true")}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Try Demo
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-sm text-zinc-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Free &middot; Private &middot; No data stored
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
          Your calendar,
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            unwrapped.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
          Connect your Google or Outlook calendar and instantly see how you
          spend your time as a VC. Get your personal Wrapped card to share
          with the world.
        </p>

        {/* Connect Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={() => {
              // Will trigger NextAuth Google sign-in
              window.location.href = "/api/auth/signin?callbackUrl=/dashboard";
            }}
            onMouseEnter={() => setHoveredButton("google")}
            onMouseLeave={() => setHoveredButton(null)}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white text-black font-medium text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-white/10"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Connect Google Calendar
          </button>

          <button
            onClick={() => {
              window.location.href = "/api/auth/signin?callbackUrl=/dashboard";
            }}
            onMouseEnter={() => setHoveredButton("outlook")}
            onMouseLeave={() => setHoveredButton(null)}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-zinc-800 text-white font-medium text-base border border-zinc-700 transition-all hover:scale-[1.02] hover:bg-zinc-700 hover:shadow-lg hover:shadow-cyan-500/5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#0078D4" d="M0 0h11.5v11.5H0z" />
              <path fill="#0364B8" d="M12.5 0H24v11.5H12.5z" />
              <path fill="#0078D4" d="M0 12.5h11.5V24H0z" />
              <path fill="#1490DF" d="M12.5 12.5H24V24H12.5z" />
            </svg>
            Connect Outlook Calendar
          </button>
        </div>

        {/* Demo button */}
        <button
          onClick={() => router.push("/dashboard?demo=true")}
          className="mt-6 text-sm text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4"
        >
          or try with sample data first
        </button>
      </main>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect",
                desc: "Link your Google or Outlook calendar. We only read your events — nothing is stored.",
              },
              {
                step: "2",
                title: "Analyze",
                desc: "We categorize your meetings into deal sourcing, portfolio support, internal, and more.",
              },
              {
                step: "3",
                title: "Share",
                desc: "Get your VC Wrapped card and analytics dashboard. Download and share on LinkedIn.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <span>VC Wrapped</span>
          <span>Your data never leaves your browser.</span>
        </div>
      </footer>
    </div>
  );
}
