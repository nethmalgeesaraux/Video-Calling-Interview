"use client";

import Link from "next/link";
import { useState } from "react";

type SessionActionsProps = {
  sessionId: string;
};

export function SessionActions({ sessionId }: SessionActionsProps) {
  const [copied, setCopied] = useState(false);
  const roomPath = `/session/${sessionId}/room`;

  const handleCopy = async () => {
    if (typeof window === "undefined") {
      return;
    }

    const roomUrl = `${window.location.origin}${roomPath}`;

    try {
      await navigator.clipboard.writeText(roomUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <Link
        href={roomPath}
        className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
      >
        Join Now
      </Link>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
      >
        {copied ? "Copied" : "Copy Room Link"}
      </button>
    </div>
  );
}
