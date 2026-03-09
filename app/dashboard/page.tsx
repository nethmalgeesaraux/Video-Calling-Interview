import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { getAllSessions } from "@/lib/session-repository";

export default async function DashboardPage() {
  const interviewCards = await getAllSessions();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_45%,_#000_100%)] text-slate-100">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-6 md:px-10 md:pb-24">
        <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <nav className="flex items-center justify-between px-5 py-4 md:px-7">
            <Link href="/" className="text-lg font-semibold tracking-tight md:text-xl">
              Interview<span className="text-cyan-300">Live</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Home
              </Link>
              <UserButton />
            </div>
          </nav>
        </header>

        <Show when="signed-in">
          <section className="pt-12">
            <h1 className="text-3xl font-semibold text-white md:text-4xl">
              Interview Dashboard
            </h1>
            <p className="mt-3 text-slate-300">
              Manage upcoming interviews, share room links, and track interview rounds.
            </p>
            <h2 className="mt-8 text-xl font-semibold text-white">Open Sessions</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {interviewCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="rounded-full bg-cyan-300/20 px-3 py-1 text-xs text-cyan-200">
                    {card.status}
                  </span>
                  <h2 className="mt-4 text-base font-semibold text-white">{card.title}</h2>
                  <p className="mt-2 text-sm text-slate-300">{card.time}</p>
                  <Link
                    href={`/session/${card.id}`}
                    className="mt-5 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                  >
                    Open Session
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </Show>

        <Show when="signed-out">
          <section className="pt-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h1 className="text-2xl font-semibold text-white md:text-3xl">
                Sign in to access dashboard
              </h1>
              <p className="mt-3 text-slate-300">
                This dashboard is available only for authenticated users.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <SignInButton>
                  <button className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                    Sign In
                  </button>
                </SignInButton>
                <Link
                  href="/"
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </section>
        </Show>
      </div>
    </main>
  );
}
