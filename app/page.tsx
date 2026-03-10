import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

const features = [
  {
    title: "Live Video Interview Room",
    description:
      "Start smooth HD calls with low-latency audio and video for technical interviews.",
  },
  {
    title: "Structured Interview Flow",
    description:
      "Move from intro to coding to feedback with a guided experience for interviewers and candidates.",
  },
  {
    title: "Fast Team Collaboration",
    description:
      "Share interview links instantly and keep hiring teams aligned across every round.",
  },
];

const steps = [
  "Create your interview session",
  "Share the secure room link",
  "Start the call and evaluate in real time",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_45%,#000_100%)] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-6 md:px-10 md:pb-24">
        <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <nav className="flex items-center justify-between px-5 py-4 md:px-7">
            <div className="text-lg font-semibold tracking-tight md:text-xl">
              Interview<span className="text-cyan-300">Live</span>
            </div>

            <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="transition hover:text-white">
                How It Works
              </a>
              <a href="#start" className="transition hover:text-white">
                Get Started
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  className="hidden rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 md:inline-flex"
                >
                  Dashboard
                </Link>
              </Show>

              <Show when="signed-out">
                <SignInButton>
                  <button className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300">
                    Sign In
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>

              <details className="relative md:hidden">
                <summary className="list-none rounded-lg border border-white/20 px-3 py-2 text-sm text-white">
                  Menu
                </summary>
                <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-white/10 bg-slate-950/95 p-3 shadow-xl">
                  <div className="flex flex-col gap-2 text-sm text-slate-200">
                    <a
                      href="#features"
                      className="rounded-md px-2 py-1.5 transition hover:bg-white/10"
                    >
                      Features
                    </a>
                    <a
                      href="#how-it-works"
                      className="rounded-md px-2 py-1.5 transition hover:bg-white/10"
                    >
                      How It Works
                    </a>
                    <a
                      href="#start"
                      className="rounded-md px-2 py-1.5 transition hover:bg-white/10"
                    >
                      Get Started
                    </a>
                    <Show when="signed-in">
                      <Link
                        href="/dashboard"
                        className="rounded-md px-2 py-1.5 transition hover:bg-white/10"
                      >
                        Dashboard
                      </Link>
                    </Show>
                  </div>
                </div>
              </details>
            </div>
          </nav>
        </header>

        <section className="grid gap-10 pb-14 pt-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-block rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cyan-200">
              Video Calling Interview Platform
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
              Hire faster with focused, real-time video interviews.
            </h1>
            <p className="mt-5 max-w-lg text-slate-300">
              A modern platform for technical interviews with smooth calls,
              clear interview flow, and a professional candidate experience.
            </p>

            <div id="start" className="mt-8 flex flex-wrap gap-3">
              <Show when="signed-out">
                <SignInButton>
                  <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                    Launch Interview Room
                  </button>
                </SignInButton>
              </Show>

              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Go to Dashboard
                </Link>
              </Show>

              <a
                href="#features"
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-cyan-300/20 bg-slate-900/60 p-6 shadow-2xl shadow-cyan-950/40">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.12em] text-cyan-200">
                  Live Session
                </span>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-300">
                  Recording On
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-800/90 p-4">
                  <p className="text-xs text-slate-400">Interviewer</p>
                  <p className="mt-2 text-sm font-medium">Priya - Frontend</p>
                </div>
                <div className="rounded-xl bg-slate-800/90 p-4">
                  <p className="text-xs text-slate-400">Candidate</p>
                  <p className="mt-2 text-sm font-medium">Alex - React Dev</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-slate-800/90 p-4 text-sm text-slate-300">
                Round 2: System Design Discussion
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 py-8">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Built for interview performance
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-base font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 py-8">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              How it works
            </h2>
            <ol className="mt-6 grid gap-3 md:grid-cols-3">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200"
                >
                  <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/20 text-cyan-200">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <footer className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 text-sm text-slate-300 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-base font-semibold text-white">
                Interview<span className="text-cyan-300">Live</span>
              </p>
              <p className="mt-1">
                Built for fast, structured, and reliable remote interviews.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="transition hover:text-white">
                How It Works
              </a>
              <Show when="signed-in">
                <Link href="/dashboard" className="transition hover:text-white">
                  Dashboard
                </Link>
              </Show>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
