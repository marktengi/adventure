import styled from "styled-components";
import { WidgetContainer, type WidgetProps } from "./types";

const DirectionButton = styled.button`
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.2rem;
`;
export type DirectionLRProps = WidgetProps<["left", "right"]> & {
  multi: false;
};

export const DirectionLR = ({ onSelection }: DirectionLRProps) => {
  const handleSelection = (selectedOption: "left" | "right") => {
    onSelection(selectedOption);
  };
  return (
    <WidgetContainer>
      <DirectionButton onClick={() => handleSelection("left")}>
        Left
      </DirectionButton>
      <DirectionButton onClick={() => handleSelection("right")}>
        Right
      </DirectionButton>
    </WidgetContainer>
  );
};
