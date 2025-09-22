import type { RoadTripPrompt } from "../types";

interface PromptSelectorProps {
  prompt: RoadTripPrompt;
  onSelection: (promptId: string, selectedOption: string) => void;
  step: number;
  totalSteps: number;
}

const PromptSelector = ({
  prompt,
  onSelection,
  step,
  totalSteps,
}: PromptSelectorProps) => {
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

  return (
    <div className="prompt-selector">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="prompt-content">
        <div className="step-indicator">
          Step {step} of {totalSteps}
        </div>

        <h2 className="prompt-question">
          {getEmojiForType(prompt.type)} {prompt.question}
        </h2>

        <div className="options-grid">
          {prompt.options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptSelector;
