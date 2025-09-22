import type { RoadTripSession } from "../types";

interface SessionHistoryProps {
  sessions: RoadTripSession[];
}

const SessionHistory = ({ sessions }: SessionHistoryProps) => {
  const totalInstructions = sessions.reduce(
    (total, session) => total + session.instructions.length,
    0
  );
  const totalSessions = sessions.length;

  return (
    <div className="session-history">
      <h3>📚 Your Adventure History</h3>
      <div className="history-stats">
        <div className="stat">
          <span className="stat-number">{totalInstructions}</span>
          <span className="stat-label">Total Instructions</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalSessions}</span>
          <span className="stat-label">Adventure Sessions</span>
        </div>
        <div className="stat">
          <span className="stat-number">
            {sessions.length > 0
              ? new Date(sessions[0].createdAt).toLocaleDateString()
              : "N/A"}
          </span>
          <span className="stat-label">First Adventure</span>
        </div>
      </div>

      {sessions.length > 0 && (
        <div className="sessions-list">
          <h4>Recent Adventures:</h4>
          {sessions
            .slice(-3)
            .reverse()
            .map((session) => (
              <div key={session.id} className="session-card">
                <div className="session-header">
                  <span className="session-date">
                    {new Date(session.createdAt).toLocaleDateString()} at{" "}
                    {new Date(session.createdAt).toLocaleTimeString()}
                  </span>
                  <span className="session-instructions-count">
                    {session.instructions.length} instruction
                    {session.instructions.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {session.instructions.length > 0 && (
                  <div className="session-instructions">
                    {session.instructions.map((instruction, index) => (
                      <div key={index} className="history-instruction">
                        <div className="history-instruction-header">
                          <span className="history-time">
                            {instruction.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="history-instruction-text">
                          {instruction.instruction}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
