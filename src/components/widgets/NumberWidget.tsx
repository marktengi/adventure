import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { WidgetContainer, type WidgetProps } from "./types";

type NumberValue = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

const NumberInput = styled.input`
  background-color: white;
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  width: 100%;
  transition: all 0.2s ease;

  -webkit-tap-highlight-color: transparent;
  touch-action: none;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ConfirmButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    background: #5a6fd6;
  }

  &:active {
    background: #4c5ec2;
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.65rem 1.5rem;
  }
`;

const ValueLabel = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #374151;
  text-align: center;
`;

export type NumberWidgetProps = WidgetProps<
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
> & {
  multi: false;
  initialValue: NumberValue | null;
  onDrag: (value: NumberValue) => void;
};

export const NumberWidget = ({
  onSelection,
  initialValue,
  onDrag,
}: NumberWidgetProps) => {
  const [value, setValue] = useState<NumberValue>(initialValue ?? "5");
  const valueRef = useRef<NumberValue>(initialValue ?? "5");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value as NumberValue;
      setValue(newValue);
      valueRef.current = newValue;
      onDrag(newValue);
    },
    [onDrag]
  );

  const handleConfirm = useCallback(() => {
    onSelection(valueRef.current);
  }, [onSelection]);

  return (
    <WidgetContainer>
      <ValueLabel>{value}</ValueLabel>
      <NumberInput
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={handleChange}
        style={{ userSelect: "none" }}
      />
      <ConfirmButton onClick={handleConfirm}>Confirm</ConfirmButton>
    </WidgetContainer>
  );
};
