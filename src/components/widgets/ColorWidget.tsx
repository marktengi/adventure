import styled from "styled-components";
import { Color } from "../../types";
import { WidgetContainerCompact, type WidgetProps } from "./types";

const ColorButton = styled.button`
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  flex: 1;
`;

const ColorSquare = styled.div<{ color: Color }>`
  background-color: ${({ color }) => color};
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
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
