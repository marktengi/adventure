import type { RoadTripPrompt } from "../types";

interface MadLibsPromptProps {
  prompt: RoadTripPrompt;
  onSelection: (promptId: string, selectedOption: string) => void;
  step: number;
  totalSteps: number;
}

const MadLibsPrompt = ({
  prompt,
  onSelection,
  step,
  totalSteps,
}: MadLibsPromptProps) => {
  const handleOptionClick = (option: string) => {
    onSelection(prompt.id, option);
  };

  const getEmojiForType = (type: string) => {
    switch (type) {
      case "direction":
        return "🧭";
      case "number":
        return "🔢";
      case "color":
        return "🎨";
      case "landmark":
        return "🏛️";
      case "time":
        return "⏰";
      case "weather":
        return "🌤️";
      default:
        return "❓";
    }
  };

  const getPlaceholderText = (type: string) => {
    switch (type) {
      case "direction":
        return "direction";
      case "number":
        return "number";
      case "color":
        return "color";
      case "landmark":
        return "landmark";
      case "time":
        return "time";
      case "weather":
        return "weather";
      default:
        return "word";
    }
  };

  return (
    <div className="madlibs-prompt">
      <div className="madlibs-header">
        <div className="step-indicator">
          {step} of {totalSteps}
        </div>
        <h2 className="madlibs-title">Fill in the blank:</h2>
      </div>

      <div className="madlibs-content">
        <div className="madlibs-sentence">
          <span className="sentence-text">
            Pick a{" "}
            <span className="blank">{getPlaceholderText(prompt.type)}</span>:
          </span>
        </div>

        <div className="options-grid-mobile">
          {prompt.options.map((option, index) => (
            <button
              key={index}
              className="option-button-mobile"
              onClick={() => handleOptionClick(option)}
            >
              {getEmojiForType(prompt.type)} {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MadLibsPrompt;
