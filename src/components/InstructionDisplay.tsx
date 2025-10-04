import { useMemo, useState } from "react";
import { prompts } from "../data";
import { PromptCategory, PromptType } from "../types";
import { parsePrompt } from "../utils/prompt";
import { Selection } from "./Selection";
import { DirectionLR } from "./widgets/DirectionLR";

interface InstructionDisplayProps {
  onContinue: () => void;
  onNewAdventure: () => void;
}

const InstructionDisplay = ({
  onContinue,
  onNewAdventure,
}: InstructionDisplayProps) => {
  const prompt = prompts[PromptCategory.DRIVING][1];

  const [widget, setWidget] = useState<React.ReactNode | null>(null);
  const [mask, setMask] = useState<boolean>(true);

  const parts = useMemo(() => parsePrompt(prompt), [prompt]);

  const [selections, setSelections] = useState<string[]>([]);

  const setSelection = (selectedOption: string, idx: number) => {
    const newSelections = [...selections];
    newSelections[idx] = selectedOption;
    setSelections(newSelections);
  };

  const selectWidget = (promptType: PromptType, idx: number) => {
    console.log("selectWidget", promptType, idx);
    switch (promptType) {
      case PromptType.DIRECTION_LR:
        setWidget(
          <DirectionLR
            onSelection={(selectedOption: string) =>
              setSelection(selectedOption, idx)
            }
            multi={false}
          />
        );
        break;
      // case PromptType.DIRECTION_LRF:
      //   setWidget(
      //     <DirectionLRF
      //       onSelection={(selectedOption: string) =>
      //         setSelection(selectedOption, idx)
      //       }
      //     />
      //   );
      //   break;
      default:
        setWidget(null);
        break;
    }
  };

  const components = parts.map((part, index) => {
    if (typeof part === "object" && "promptType" in part) {
      return (
        <Selection
          promptType={part.promptType}
          onClick={(promptType: PromptType) => selectWidget(promptType, index)}
          value={selections[index]}
        />
      );
    }
    // return <span style={{ opacity: mask ? 0 : 1 }}>{part}</span>;
    return <span>{mask ? "_".repeat(part.length) : part}</span>;
  });

  return (
    <div className="instruction-display">
      <div className="instruction-card">
        <div className="instruction-header">
          <span className="timestamp"></span>
        </div>

        {components}
        <br />
        {widget}

        <button onClick={() => setMask(false)}>Reveal</button>

        <div className="instruction-content">
          <h2>Your Adventure Instruction:</h2>
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
