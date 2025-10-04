import styled, { css } from "styled-components";
import { PromptType } from "../types";

const SelectionSpan = styled.span<{ filled: boolean }>`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  ${({ filled }) =>
    !filled &&
    css`
      opacity: 0.5;
    `}
`;
interface SelectionProps {
  promptType: PromptType;
  onClick: (promptType: PromptType) => void;
  value: string | null;
}

const promptTypeMap = {
  [PromptType.DIRECTION_LR]: "direction",
  [PromptType.DIRECTION_LRF]: "direction",
  [PromptType.NUMBER]: "number",
  [PromptType.COLOR]: "color",
  [PromptType.LANDMARK]: "landmark",
  [PromptType.TIME]: "time",
  [PromptType.LETTER]: "letter",
  [PromptType.DISTANCE]: "distance",
  [PromptType.DIRECTION_CARDINAL]: "direction",
};

export const Selection = ({ promptType, onClick, value }: SelectionProps) => {
  const content = value ?? promptTypeMap[promptType];

  return (
    <>
      {" "}
      <SelectionSpan filled={!!value} onClick={() => onClick(promptType)}>
        {content}
      </SelectionSpan>{" "}
    </>
  );
};
