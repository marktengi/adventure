// a widget for choosing a cardinal direction

import styled from "styled-components";
import { WidgetContainerCompact, type WidgetProps } from "./types";

export type CardinalDirectionProps = WidgetProps<
  ["north", "south", "east", "west"]
> & {
  multi: false;
};

const CardinalDirectionButton = styled.button`
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    border-color: #667eea;
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
  }

  &:active {
    transform: translateY(0);
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  @media (max-width: 480px) {
    min-height: 50px;
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

export const CardinalDirection = ({ onSelection }: CardinalDirectionProps) => {
  const handleSelection = (
    selectedOption: "north" | "south" | "east" | "west"
  ) => {
    onSelection(selectedOption);
  };
  return (
    <WidgetContainerCompact noGap>
      <CardinalDirectionButton onClick={() => handleSelection("north")}>
        North
      </CardinalDirectionButton>
      <CardinalDirectionButton onClick={() => handleSelection("south")}>
        South
      </CardinalDirectionButton>
      <CardinalDirectionButton onClick={() => handleSelection("east")}>
        East
      </CardinalDirectionButton>
      <CardinalDirectionButton onClick={() => handleSelection("west")}>
        West
      </CardinalDirectionButton>
    </WidgetContainerCompact>
  );
};
