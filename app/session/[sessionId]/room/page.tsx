import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { getSessionById } from "@/lib/session-repository";

type SessionRoomPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionRoomPage({ params }: SessionRoomPageProps) {
  const { sessionId } = await params;
  const session = await getSessionById(sessionId);

  if (!session) {
    notFound();
  }

  const room = session.room;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_45%,_#000_100%)] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 md:px-10 md:pb-24">
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
          <section className="pt-10">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-white md:text-3xl">Interview Room</h1>
                  <p className="mt-1 text-sm text-slate-300">
                    Session ID: <span className="font-medium text-white">{session.id}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <span className="rounded-full border border-emerald-300/50 bg-emerald-400/15 px-3 py-1 font-medium text-emerald-200">
                    {room.liveStatus}
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-slate-200">
                    {room.elapsedTime}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-4">
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
                    <div className="flex h-full items-end justify-between rounded-xl border border-white/10 bg-[linear-gradient(145deg,#111827_0%,#0f172a_45%,#020617_100%)] p-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Interviewer
                        </p>
                        <p className="mt-2 text-xl font-semibold text-white">{room.interviewerName}</p>
                        <p className="mt-1 text-sm text-cyan-200">Asking: {room.currentQuestion}</p>
                      </div>
                      <div className="rounded-lg border border-white/20 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-200">
                        {room.qualityLabel}
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 w-44 overflow-hidden rounded-xl border border-white/20 bg-slate-950/80">
                      <div className="grid aspect-video place-items-center bg-[radial-gradient(circle_at_top,#0ea5e9_0%,#082f49_55%,#020617_100%)]">
                        <span className="text-xs font-medium text-cyan-100">{room.candidateLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 md:p-4">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                      <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                        Mute Mic
                      </button>
                      <button className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10">
                        Stop Camera
                      </button>
                      <button className="rounded-xl border border-cyan-300/40 bg-cyan-300/15 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/25">
                        Share Screen
                      </button>
                      <button className="rounded-xl border border-rose-300/40 bg-rose-400/15 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/25">
                        End Interview
                      </button>
                    </div>
                  </div>
                </div>

                <aside className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Interview Agenda
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {room.agenda.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2 text-sm text-slate-200"
                        >
                          <span className="h-2 w-2 rounded-full bg-cyan-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Participants
                    </h2>
                    <div className="mt-3 space-y-2">
                      {room.participants.map((person) => (
                        <div
                          key={person.name}
                          className="rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2"
                        >
                          <p className="text-sm font-medium text-white">{person.name}</p>
                          <p className="text-xs text-slate-300">
                            {person.role} - {person.status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-300">
                      Notes
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{room.notes}</p>
                  </div>
                </aside>
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
