import { useRef, useState } from "react";
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
  const [value, setValue] = useState<NumberValue>(initialValue ?? "1");
  const valueRef = useRef<NumberValue>(initialValue ?? "1");
  const isDraggingRef = useRef(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as NumberValue;
    setValue(newValue);
    valueRef.current = newValue;
    onDrag(newValue);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    isDraggingRef.current = true;
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLInputElement>) => {
    if (isDraggingRef.current) {
      e.stopPropagation();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      onSelection(valueRef.current);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    isDraggingRef.current = true;
    e.stopPropagation();
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      e.preventDefault();
      e.stopPropagation();
      onSelection(valueRef.current);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <WidgetContainer>
      <NumberInput
        type="range"
        min="1"
        max="10"
        value={value}
        onInput={onChange}
        onChange={onChange}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        style={{
          userSelect: "none",
        }}
      />
    </WidgetContainer>
  );
};
