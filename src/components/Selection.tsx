import styled, { css } from "styled-components";
import colorWheel from "../assets/color-wheel.png";
import compass from "../assets/compass.svg";
import leftRightArrow from "../assets/left-right-arrow.svg";
import letters from "../assets/letters.svg";
import numbers from "../assets/numbers.svg";
import { PromptType } from "../types";

const SelectionSpan = styled.span<{ filled: boolean; current: boolean }>`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 0.5rem;
  font-size: 1rem;
  min-width: 100px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
  ${({ filled }) =>
    !filled &&
    css`
      opacity: 0.5;
    `}
  ${({ current }) =>
    current &&
    css`
      border: 3px solid #2563eb;
    `}
`;
interface SelectionProps {
  promptType: PromptType;
  onClick: (promptType: PromptType) => void;
  value: string | null;
  current: boolean;
}

const PlaceholderSpan = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PlaceholderImg = styled.img`
  height: 1rem;
`;

const ColorPlaceholder = (
  <PlaceholderSpan>
    <PlaceholderImg src={colorWheel} />
    color
  </PlaceholderSpan>
);
const CardinalDirectionPlaceholder = (
  <PlaceholderSpan>
    <PlaceholderImg src={compass} />
    direction
  </PlaceholderSpan>
);
const DirectionLRPlaceholder = (
  <PlaceholderSpan>
    <PlaceholderImg src={leftRightArrow} />
    direction
  </PlaceholderSpan>
);
const NumberPlaceholder = (
  <PlaceholderSpan>
    <PlaceholderImg src={numbers} />
    number
  </PlaceholderSpan>
);
const LetterPlaceholder = (
  <PlaceholderSpan>
    <PlaceholderImg src={letters} />
    letter
  </PlaceholderSpan>
);
const promptTypeMap: Record<PromptType, React.ReactNode> = {
  [PromptType.DIRECTION_LR]: DirectionLRPlaceholder,
  [PromptType.DIRECTION_LRF]: "direction",
  [PromptType.NUMBER]: NumberPlaceholder,
  [PromptType.COLOR]: ColorPlaceholder,
  [PromptType.LANDMARK]: "landmark",
  [PromptType.LETTER]: LetterPlaceholder,
  [PromptType.DIRECTION_CARDINAL]: CardinalDirectionPlaceholder,
};

export const Selection = ({
  promptType,
  onClick,
  value,
  current,
}: SelectionProps) => {
  const content = value ?? promptTypeMap[promptType];

  return (
    <>
      {" "}
      <SelectionSpan
        filled={!!value}
        onClick={() => onClick(promptType)}
        current={current}
      >
        {content}
      </SelectionSpan>{" "}
    </>
  );
};
