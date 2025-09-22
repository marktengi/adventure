// a widget for choosing a cardinal direction

import type { WidgetProps } from "./types";

export type CardinalDirectionProps = WidgetProps<
  ["north", "south", "east", "west"]
> & {
  multi: false;
};

export const CardinalDirection = ({ onSelection }: CardinalDirectionProps) => {
  const handleSelection = (
    selectedOption: "north" | "south" | "east" | "west"
  ) => {
    onSelection(selectedOption);
  };
  return (
    <div>
      <button onClick={() => handleSelection("north")}>North</button>
      <button onClick={() => handleSelection("south")}>South</button>
      <button onClick={() => handleSelection("east")}>East</button>
      <button onClick={() => handleSelection("west")}>West</button>
    </div>
  );
};
