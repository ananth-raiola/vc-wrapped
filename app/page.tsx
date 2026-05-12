"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] grain-overlay overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full animate-gradient opacity-20 blur-[120px]"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460, #533483)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 12s ease infinite",
          }}
        />
        <div
          className="absolute -bottom-60 -left-40 w-[500px] h-[500px] rounded-full animate-gradient opacity-15 blur-[100px]"
          style={{
            background:
              "linear-gradient(135deg, #0f3460, #1a1a2e, #533483, #16213e)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 18s ease infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-[140px]"
          style={{
            background: "radial-gradient(ellipse, #1e3a5f 0%, transparent 70%)",
            animation: "pulse-glow 6s ease infinite",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-xs font-display tracking-tighter">VR</span>
          </div>
          <span className="text-white font-display font-semibold text-lg tracking-tight">
            Venture Rapt
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/dashboard?demo=true")}
            className="text-sm text-zinc-500 hover:text-white transition-colors font-medium"
          >
            Demo
          </button>
          <button
            onClick={() => {
              window.location.href = "/api/auth/signin?callbackUrl=/dashboard";
            }}
            className="text-sm px-5 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto">
        {/* Quote */}
        <div className="animate-float-up mb-10">
          <p className="text-zinc-500 text-sm tracking-wide uppercase mb-3 font-medium">
            Marc Andreessen
          </p>
          <blockquote className="text-zinc-400 text-lg sm:text-xl italic max-w-2xl leading-relaxed">
            &ldquo;The big thing is basically everything is on the calendar.&rdquo;
          </blockquote>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9] mb-6 animate-float-up-delay-1">
          Know your
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #94a3b8 50%, #475569 100%)",
            }}
          >
            edge.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed animate-float-up-delay-2">
          The performance layer for elite investors.
          <br className="hidden sm:block" />
          Track your time. Decode your patterns. Sharpen your edge.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg animate-float-up-delay-3">
          <button
            onClick={() => {
              window.location.href = "/api/auth/signin?callbackUrl=/dashboard";
            }}
            className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
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
            Google Calendar
          </button>

          <button
            onClick={() => {
              window.location.href = "/api/auth/signin?callbackUrl=/dashboard";
            }}
            className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-zinc-900/80 text-white font-semibold text-base border border-zinc-800 transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:border-zinc-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#0078D4" d="M0 0h11.5v11.5H0z" />
              <path fill="#0364B8" d="M12.5 0H24v11.5H12.5z" />
              <path fill="#0078D4" d="M0 12.5h11.5V24H0z" />
              <path fill="#1490DF" d="M12.5 12.5H24V24H12.5z" />
            </svg>
            Outlook Calendar
          </button>
        </div>

        {/* Demo link */}
        <button
          onClick={() => router.push("/dashboard?demo=true")}
          className="mt-8 text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Try with sample data &rarr;
        </button>
      </main>

      {/* Metrics strip */}
      <section className="relative z-10 border-t border-zinc-900 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "6", label: "Meeting categories tracked" },
            { value: "12mo", label: "Calendar history analyzed" },
            { value: "60s", label: "Time to first insight" },
            { value: "0", label: "Data stored on our servers" },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {item.value}
              </p>
              <p className="text-zinc-500 text-sm mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-600 text-xs uppercase tracking-[0.3em] mb-6 font-medium">
            The philosophy
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Elite athletes track every rep.
            <br />
            <span className="text-zinc-500">
              Elite investors should track every meeting.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Your calendar is the most honest record of your priorities.
            Venture Rapt turns it into your competitive advantage — surfacing
            patterns, blind spots, and the signal in your schedule.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 py-20 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <p className="text-zinc-600 text-xs uppercase tracking-[0.3em] mb-12 text-center font-medium">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Connect",
                desc: "Link your Google or Outlook calendar. Read-only access. Zero data stored.",
              },
              {
                step: "02",
                title: "Decode",
                desc: "AI categorizes every meeting — deal flow, portfolio, internal, fundraising, networking.",
              },
              {
                step: "03",
                title: "Perform",
                desc: "Get your analytics dashboard and your Rapt Card. Share it. Compare. Improve.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col">
                <span className="font-display text-zinc-700 text-sm font-medium mb-3">
                  {item.step}
                </span>
                <h3 className="font-display text-white font-bold text-2xl mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight mb-6">
            Built for the 1%
            <br />
            <span className="text-zinc-500">who build the future.</span>
          </h2>
          <button
            onClick={() => {
              window.location.href = "/api/auth/signin?callbackUrl=/dashboard";
            }}
            className="mt-6 px-10 py-4 bg-white text-black rounded-full font-semibold text-base hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all"
          >
            Connect your calendar
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
              <span className="text-black font-bold text-[8px] font-display">VR</span>
            </div>
            <span>Venture Rapt</span>
          </div>
          <span>Your data never leaves your browser.</span>
        </div>
      </footer>
    </div>
  );
}
