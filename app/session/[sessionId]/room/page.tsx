import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

type SessionRoomPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionRoomPage({ params }: SessionRoomPageProps) {
  const { sessionId } = await params;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_45%,_#000_100%)] text-slate-100">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-6 md:px-10 md:pb-24">
        <header className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <nav className="flex items-center justify-between px-5 py-4 md:px-7">
            <Link href="/" className="text-lg font-semibold tracking-tight md:text-xl">
              Interview<span className="text-cyan-300">Live</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href={`/session/${sessionId}`}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Session Details
              </Link>
              <UserButton />
            </div>
          </nav>
        </header>

        <Show when="signed-in">
          <section className="pt-12">
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Interview Room</h1>
            <p className="mt-3 text-slate-300">
              Session ID: <span className="font-medium text-white">{sessionId}</span>
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8">
              <div className="aspect-video rounded-xl border border-white/10 bg-slate-950/80 p-4">
                <div className="grid h-full place-items-center rounded-lg border border-dashed border-white/20 text-center">
                  <p className="max-w-md text-sm text-slate-300">
                    Video room placeholder. Connect your provider SDK here (Stream, Daily, Agora)
                    to render live call UI.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Show>

        <Show when="signed-out">
          <section className="pt-16">
            <div className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h1 className="text-2xl font-semibold text-white md:text-3xl">
                Sign in to join interview room
              </h1>
              <p className="mt-3 text-slate-300">
                Please sign in before joining this session room.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <SignInButton>
                  <button className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                    Sign In
                  </button>
                </SignInButton>
                <Link
                  href={`/session/${sessionId}`}
                  className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Back to Session
                </Link>
              </div>
            </div>
          </section>
        </Show>
      </div>
    </main>
  );
}
