import styled from "styled-components";
import { WidgetContainerCompact, type WidgetProps } from "./types";

const LetterButton = styled.button`
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.5rem;
  font-size: 1.2rem;
  min-width: 3rem;
  min-height: 3rem;
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
    <WidgetContainerCompact noGap>
      {letters.map((letter) => (
        <LetterButton key={letter} onClick={() => handleSelection(letter)}>
          {letter}
        </LetterButton>
      ))}
    </WidgetContainerCompact>
  );
};
