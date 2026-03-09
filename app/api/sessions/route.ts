import { NextResponse } from "next/server";
import { getAllSessions } from "@/lib/session-repository";

export async function GET() {
  const sessions = await getAllSessions();
  return NextResponse.json({ data: sessions });
}
