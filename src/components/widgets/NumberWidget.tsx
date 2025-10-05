import { useState } from "react";
import styled from "styled-components";
import { WidgetContainer, type WidgetProps } from "./types";

const NumberInput = styled.input`
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.2rem;
`;
export type NumberWidgetProps = WidgetProps<
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
> & {
  multi: false;
  initialValue:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | null;
  onDrag: (
    value: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  ) => void;
};

export const NumberWidget = ({
  onSelection,
  initialValue,
  onDrag,
}: NumberWidgetProps) => {
  const handleSelection = (
    selectedOption: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  ) => {
    onSelection(selectedOption);
  };
  const [value, setValue] = useState<
    "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  >(initialValue ?? "1");

  return (
    <WidgetContainer>
      <NumberInput
        type="range"
        min="1"
        max="10"
        value={value}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log("change", e.target.value);
          setValue(
            e.target.value as
              | "1"
              | "2"
              | "3"
              | "4"
              | "5"
              | "6"
              | "7"
              | "8"
              | "9"
              | "10"
          );
          onDrag(
            e.target.value as
              | "1"
              | "2"
              | "3"
              | "4"
              | "5"
              | "6"
              | "7"
              | "8"
              | "9"
              | "10"
          );
        }}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onPointerUp={(e) => {
          e.preventDefault();
          handleSelection(value);
        }}
      />
    </WidgetContainer>
  );
};
