import type { RoadTripSession } from "../types";

const STORAGE_KEY = "adventure-sessions";

export const saveSession = (session: RoadTripSession): void => {
  try {
    const existingSessions = getSessions();
    const updatedSessions = [...existingSessions, session];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSessions));
  } catch (error) {
    console.error("Failed to save session:", error);
  }
};

export const getSessions = (): RoadTripSession[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const sessions = JSON.parse(stored);
    // Convert date strings back to Date objects
    return sessions.map(
      (
        session: RoadTripSession & {
          createdAt: string;
          instructions: Array<{ timestamp: string }>;
        }
      ) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        instructions: session.instructions.map((instruction) => ({
          ...instruction,
          timestamp: new Date(instruction.timestamp),
        })),
      })
    );
  } catch (error) {
    console.error("Failed to load sessions:", error);
    return [];
  }
};

export const updateSession = (
  sessionId: string,
  updatedSession: RoadTripSession
): void => {
  try {
    const sessions = getSessions();
    const sessionIndex = sessions.findIndex((s) => s.id === sessionId);

    if (sessionIndex !== -1) {
      sessions[sessionIndex] = updatedSession;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  } catch (error) {
    console.error("Failed to update session:", error);
  }
};

export const clearSessions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear sessions:", error);
  }
};
