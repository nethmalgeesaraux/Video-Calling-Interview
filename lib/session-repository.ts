export type InterviewParticipant = {
  name: string;
  role: string;
  status: string;
};

export type SessionRoomDetails = {
  liveStatus: string;
  elapsedTime: string;
  interviewerName: string;
  currentQuestion: string;
  qualityLabel: string;
  candidateLabel: string;
  agenda: string[];
  participants: InterviewParticipant[];
  notes: string;
};

export type InterviewSession = {
  id: string;
  title: string;
  time: string;
  status: string;
  room: SessionRoomDetails;
};

const sessionStore: Record<string, InterviewSession> = {
  "frontend-round-1": {
    id: "frontend-round-1",
    title: "Frontend Engineer - Round 1",
    time: "Today, 4:00 PM",
    status: "Upcoming",
    room: {
      liveStatus: "Live",
      elapsedTime: "00:23:18",
      interviewerName: "Nadeesha Perera",
      currentQuestion: "API rate-limiting strategy",
      qualityLabel: "HD 1080p",
      candidateLabel: "You (Candidate)",
      agenda: [
        "Candidate introduction",
        "System design discussion",
        "Live coding challenge",
        "Behavioral questions",
      ],
      participants: [
        { name: "Nadeesha Perera", role: "Interviewer", status: "Speaking" },
        { name: "You", role: "Candidate", status: "Muted" },
        { name: "A. Fernando", role: "Observer", status: "Listening" },
      ],
      notes:
        "Candidate explained caching tradeoffs clearly. Next focus: failure handling and rollback strategy for distributed services.",
    },
  },
  "backend-final-round": {
    id: "backend-final-round",
    title: "Backend Engineer - Final Round",
    time: "Tomorrow, 10:30 AM",
    status: "Scheduled",
    room: {
      liveStatus: "Live",
      elapsedTime: "00:05:42",
      interviewerName: "Kasun Wickramasinghe",
      currentQuestion: "Design a resilient message queue retry flow",
      qualityLabel: "HD 720p",
      candidateLabel: "You (Candidate)",
      agenda: [
        "Service architecture",
        "Database scaling",
        "Failure recovery",
        "Q&A",
      ],
      participants: [
        { name: "Kasun Wickramasinghe", role: "Interviewer", status: "Speaking" },
        { name: "You", role: "Candidate", status: "Unmuted" },
      ],
      notes: "Candidate is confident with distributed systems. Probe deeper into idempotency.",
    },
  },
  "product-round-2": {
    id: "product-round-2",
    title: "Product Engineer - Round 2",
    time: "Monday, 2:00 PM",
    status: "Pending Review",
    room: {
      liveStatus: "Standby",
      elapsedTime: "00:00:00",
      interviewerName: "Dinuli Jayasena",
      currentQuestion: "Prioritizing roadmap items under constraints",
      qualityLabel: "Ready",
      candidateLabel: "You (Candidate)",
      agenda: [
        "Product case study",
        "Cross-team communication",
        "Metrics and outcomes",
      ],
      participants: [
        { name: "Dinuli Jayasena", role: "Interviewer", status: "Waiting" },
        { name: "You", role: "Candidate", status: "Ready" },
      ],
      notes: "Session not started. Waiting for interviewer to join.",
    },
  },
};

async function simulateDatabaseDelay() {
  await new Promise((resolve) => setTimeout(resolve, 40));
}

export async function getAllSessions(): Promise<InterviewSession[]> {
  await simulateDatabaseDelay();
  return Object.values(sessionStore);
}

export async function getSessionById(
  sessionId: string
): Promise<InterviewSession | null> {
  await simulateDatabaseDelay();
  return sessionStore[sessionId] ?? null;
}
