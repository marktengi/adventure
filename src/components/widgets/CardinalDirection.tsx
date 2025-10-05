// a widget for choosing a cardinal direction

import styled from "styled-components";
import type { WidgetProps } from "./types";

export type CardinalDirectionProps = WidgetProps<
  ["north", "south", "east", "west"]
> & {
  multi: false;
};

const CardinalDirectionButton = styled.button`
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.2rem;
`;

export const CardinalDirection = ({ onSelection }: CardinalDirectionProps) => {
  const handleSelection = (
    selectedOption: "north" | "south" | "east" | "west"
  ) => {
    onSelection(selectedOption);
  };
  return (
    <div>
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
    </div>
  );
};
