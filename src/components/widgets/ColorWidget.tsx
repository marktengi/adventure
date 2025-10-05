import styled from "styled-components";
import { Color } from "../../types";
import { WidgetContainerCompact, type WidgetProps } from "./types";

const ColorButton = styled.button`
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 80px;
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
    min-height: 70px;
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

const ColorSquare = styled.div<{ color: Color }>`
  background-color: ${({ color }) => color};
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export type ColorWidgetProps = WidgetProps<Color[]> & {
  multi: false;
};

export const ColorWidget = ({ onSelection }: ColorWidgetProps) => {
  const handleSelection = (selectedOption: Color) => {
    onSelection(selectedOption);
  };

  return (
    <WidgetContainerCompact>
      <ColorButton onClick={() => handleSelection(Color.RED)}>
        <ColorSquare color={Color.RED} />
        Red
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.GREEN)}>
        <ColorSquare color={Color.GREEN} />
        Green
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.YELLOW)}>
        <ColorSquare color={Color.YELLOW} />
        Yellow
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.PURPLE)}>
        <ColorSquare color={Color.PURPLE} />
        Purple
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.ORANGE)}>
        <ColorSquare color={Color.ORANGE} />
        Orange
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.PINK)}>
        <ColorSquare color={Color.PINK} />
        Pink
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.BLACK)}>
        <ColorSquare color={Color.BLACK} />
        Black
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.WHITE)}>
        <ColorSquare color={Color.WHITE} />
        White
      </ColorButton>
      <ColorButton onClick={() => handleSelection(Color.BLUE)}>
        <ColorSquare color={Color.BLUE} />
        Blue
      </ColorButton>
    </WidgetContainerCompact>
  );
};
