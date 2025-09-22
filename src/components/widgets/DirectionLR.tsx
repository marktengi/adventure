import type { WidgetProps } from "./types";

export type DirectionLRProps = WidgetProps<["left", "right"]> & {
  multi: false;
};

export const DirectionLR = ({ onSelection }: DirectionLRProps) => {
  const handleSelection = (selectedOption: "left" | "right") => {
    onSelection(selectedOption);
  };
  return (
    <div>
      <button onClick={() => handleSelection("left")}>Left</button>
      <button onClick={() => handleSelection("right")}>Right</button>
    </div>
  );
};
