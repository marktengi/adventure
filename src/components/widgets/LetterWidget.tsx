import styled from "styled-components";
import { WidgetContainerCompact, type WidgetProps } from "./types";

const LetterButton = styled.button`
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  min-width: 2.5rem;
  min-height: 2.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    border-color: #667eea;
    background: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.15);
  }

  &:active {
    transform: translateY(0);
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  @media (max-width: 480px) {
    min-width: 2rem;
    min-height: 2rem;
    font-size: 0.9rem;
    padding: 0.4rem;
  }
`;
type Letter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
export type LetterWidgetProps = WidgetProps<Letter[]> & {
  multi: false;
};

export const LetterWidget = ({ onSelection }: LetterWidgetProps) => {
  const handleSelection = (selectedOption: Letter) => {
    onSelection(selectedOption);
  };
  const letters: Letter[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  return (
    <WidgetContainerCompact noGap columns={4}>
      {letters.map((letter) => (
        <LetterButton key={letter} onClick={() => handleSelection(letter)}>
          {letter}
        </LetterButton>
      ))}
    </WidgetContainerCompact>
  );
};
