import { NextResponse } from "next/server";
import { getSessionById } from "@/lib/session-repository";

type RouteParams = {
  params: Promise<{ sessionId: string }>;
};

export async function GET(_: Request, { params }: RouteParams) {
  const { sessionId } = await params;
  const session = await getSessionById(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({ data: session });
}
