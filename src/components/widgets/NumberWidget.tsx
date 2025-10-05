import { useRef, useState } from "react";
import styled from "styled-components";
import { WidgetContainer, type WidgetProps } from "./types";

const NumberInput = styled.input`
  background-color: white;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  width: 100%;
  min-height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:hover {
    border-color: #667eea;
  }

  @media (max-width: 480px) {
    min-height: 50px;
    padding: 0.75rem;
    font-size: 1rem;
  }
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelection = (
    selectedOption: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  ) => {
    onSelection(selectedOption);
  };
  const [value, setValue] = useState<
    "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
  >(initialValue ?? "1");

  const [isDragging, setIsDragging] = useState(false);

  const onChange =
    (type: "input" | "change") => (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(type);
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
    };

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    console.log("touch start");
    setIsDragging(true);
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLInputElement>) => {
    console.log("touch move");
    if (isDragging) {
      console.log("touch move, dragging");
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
    console.log("touch end");
    if (isDragging) {
      console.log("touch end, dragging");
      setIsDragging(false);
      e.preventDefault();
      e.stopPropagation();
      handleSelection(value);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log("mouse down");
    setIsDragging(true);
    e.stopPropagation();
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log("mouse up");
    if (isDragging) {
      console.log("mouse up, dragging");
      setIsDragging(false);
      e.preventDefault();
      e.stopPropagation();
      handleSelection(value);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log("click");
    // Prevent click if we were dragging
    if (isDragging) {
      console.log("click, dragging");
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Container touch handlers that ignore non-input touches
  const handleContainerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("container touch start");
    // Only allow touches directly on the input
    if (e.target !== inputRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleContainerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("container touch move");
    // Only allow touches directly on the input
    if (e.target !== inputRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleContainerTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("container touch end");
    // Only allow touches directly on the input
    if (e.target !== inputRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  return (
    <WidgetContainer
      onTouchStart={handleContainerTouchStart}
      onTouchMove={handleContainerTouchMove}
      onTouchEnd={handleContainerTouchEnd}
    >
      <NumberInput
        ref={inputRef}
        type="range"
        min="1"
        max="10"
        value={value}
        onInput={onChange("input")}
        onChange={onChange("change")}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        style={{
          touchAction: "none", // Prevent default touch behaviors
          userSelect: "none", // Prevent text selection during drag
        }}
      />
    </WidgetContainer>
  );
};
