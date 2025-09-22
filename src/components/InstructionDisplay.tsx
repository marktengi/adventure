import type { GeneratedInstruction } from "../types";

interface InstructionDisplayProps {
  instruction: GeneratedInstruction;
  onContinue: () => void;
  onNewAdventure: () => void;
}

const InstructionDisplay = ({
  instruction,
  onContinue,
  onNewAdventure,
}: InstructionDisplayProps) => {
  return (
    <div className="instruction-display">
      <div className="instruction-card">
        <div className="instruction-header">
          <span className="timestamp">
            {instruction.timestamp.toLocaleTimeString()}
          </span>
        </div>

        <div className="instruction-content">
          <h2>Your Adventure Instruction:</h2>
          <div className="instruction-text">{instruction.instruction}</div>
        </div>

        <div className="instruction-actions">
          <button className="continue-btn" onClick={onContinue}>
            ➡️ Continue Adventure
          </button>
          <button className="new-adventure-btn" onClick={onNewAdventure}>
            🗺️ Start New Adventure
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionDisplay;
