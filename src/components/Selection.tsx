import styled, { css } from "styled-components";
import colorWheel from "../assets/color-wheel.png";
import compass from "../assets/compass.svg";
import leftRightArrow from "../assets/left-right-arrow.svg";
import letters from "../assets/letters.svg";
import numbers from "../assets/numbers.svg";
import { PromptType } from "../types";

const SelectionSpan = styled.span<{ filled: boolean; current: boolean }>`
  border-radius: 12px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  min-width: 120px;
  min-height: 44px; /* iOS minimum touch target */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  /* Base styling for unfilled selections */
  background-color: #f8fafc;
  border: 2px solid #e5e7eb;
  color: #6b7280;

  /* Filled selection styling - green success state */
  ${({ filled }) =>
    filled &&
    css`
      background-color: #f0fdf4;
      border-color: #22c55e;
      color: #166534;
      font-weight: 700;
    `}

  /* Current/active selection styling - blue focus state */
  ${({ current }) =>
    current &&
    css`
      background-color: #eff6ff;
      border-color: #3b82f6;
      color: #1e40af;
      font-weight: 700;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      animation: pulse 2s infinite;
    `}

  /* Unfilled selection styling - orange warning state */
  ${({ filled, current }) =>
    !filled &&
    !current &&
    css`
      background-color: #fef3c7;
      border-color: #f59e0b;
      color: #92400e;
      border-style: dashed;
    `}

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    min-width: 100px;
    min-height: 40px;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1);
    }
  }
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
