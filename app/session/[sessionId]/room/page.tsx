"use client";

import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { getSessionById } from "@/lib/session-repository";
import { useState, useRef, useEffect, use } from "react";

type SessionRoomPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default function SessionRoomPage({ params }: SessionRoomPageProps) {
  const { sessionId } = use(params);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Media states
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSessionById(sessionId);
        if (!sessionData) {
          notFound();
        }
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  // Initialize camera
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing camera/microphone:", error);
      }
    };

    initializeCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleMic = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMicMuted;
      });
      setIsMicMuted(!isMicMuted);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = isCameraOff;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (isScreenSharing) {
        // Stop screen sharing and restore camera
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsScreenSharing(false);
      } else {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setStream(screenStream);
        if (videoRef.current) {
          videoRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const endInterview = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    // Navigate back to session details
    window.location.href = `/session/${sessionId}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_45%,_#000_100%)] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-300 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading interview room...</p>
        </div>
      </main>
    );
  }

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
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-xs font-medium text-cyan-100">{room.candidateLabel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3 md:p-4">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                      <button
                        onClick={toggleMic}
                        className={`rounded-xl border px-4 py-2 text-sm transition ${
                          isMicMuted
                            ? 'border-red-300/40 bg-red-400/15 text-red-100 hover:bg-red-400/25'
                            : 'border-white/20 bg-white/5 text-slate-100 hover:bg-white/10'
                        }`}
                      >
                        {isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
                      </button>
                      <button
                        onClick={toggleCamera}
                        className={`rounded-xl border px-4 py-2 text-sm transition ${
                          isCameraOff
                            ? 'border-red-300/40 bg-red-400/15 text-red-100 hover:bg-red-400/25'
                            : 'border-white/20 bg-white/5 text-slate-100 hover:bg-white/10'
                        }`}
                      >
                        {isCameraOff ? 'Start Camera' : 'Stop Camera'}
                      </button>
                      <button
                        onClick={toggleScreenShare}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                          isScreenSharing
                            ? 'border-green-300/40 bg-green-400/15 text-green-100 hover:bg-green-400/25'
                            : 'border-cyan-300/40 bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300/25'
                        }`}
                      >
                        {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                      </button>
                      <button
                        onClick={endInterview}
                        className="rounded-xl border border-rose-300/40 bg-rose-400/15 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/25"
                      >
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
                      {room.agenda.map((item: string) => (
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
                      {room.participants.map((person: any) => (
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
