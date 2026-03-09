import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { getSessionById } from "@/lib/session-repository";
import { SessionActions } from "./session-actions";

type SessionPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = await params;
  const session = await getSessionById(sessionId);

  if (!session) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_45%,_#000_100%)] text-slate-100">
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-6 md:px-10 md:pb-24">
        <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <nav className="flex items-center justify-between px-5 py-4 md:px-7">
            <Link href="/" className="text-lg font-semibold tracking-tight md:text-xl">
              Interview<span className="text-cyan-300">Live</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <UserButton />
            </div>
          </nav>
        </header>

        <Show when="signed-in">
          <section className="pt-12">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <span className="rounded-full bg-cyan-300/20 px-3 py-1 text-xs text-cyan-200">
                {session.status}
              </span>
              <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
                {session.title}
              </h1>
              <p className="mt-3 text-slate-300">{session.time}</p>

              <div className="mt-8 rounded-xl border border-white/10 bg-slate-900/60 p-5">
                <p className="text-sm text-slate-300">
                  Session room is ready. Integrate your video call provider here and launch the live
                  interview meeting.
                </p>
                <SessionActions sessionId={sessionId} />
              </div>
            </div>
          </section>
        </Show>

        <Show when="signed-out">
          <section className="pt-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h1 className="text-2xl font-semibold text-white md:text-3xl">
                Sign in to open this session
              </h1>
              <p className="mt-3 text-slate-300">
                Please authenticate before accessing interview session rooms.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <SignInButton>
                  <button className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                    Sign In
                  </button>
                </SignInButton>
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </section>
        </Show>
      </div>
    </main>
  );
}
