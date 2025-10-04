import { PromptType } from "../types";

interface SelectionProps {
  promptType: PromptType;
  onClick: (promptType: PromptType) => void;
  value: string | null;
}

export const Selection = ({ promptType, onClick, value }: SelectionProps) => {
  const content = value ?? "_______";

  return (
    <button onClick={() => onClick(promptType)}>
      <div>{content}</div>
    </button>
  );
};
