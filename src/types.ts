export enum PromptType {
  NUMBER = "number",
  DIRECTION_LR = "direction_lr",
  DIRECTION_LRF = "direction_lrf",
  COLOR = "color",
  LANDMARK = "landmark",
  LETTER = "letter",
  DIRECTION_CARDINAL = "direction_cardinal",
}

export enum PromptCategory {
  DRIVING = "driving",
  FOOD = "food",
  WALKING = "walking",
  LANDMARK = "landmark",
}

export enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  YELLOW = "yellow",
  PURPLE = "purple",
  ORANGE = "orange",
  PINK = "pink",
  BLACK = "black",
  WHITE = "white",
  GRAY = "gray",
}

export type ParsedPrompt = {
  raw: string;
  parts: (string | { promptType: PromptType })[];
  selectionIndices: number[];
};

export interface GeneratedInstruction {
  instruction: string;
  timestamp: Date;
}

export interface RoadTripSession {
  id: string;
  instructions: GeneratedInstruction[];
  currentStep: number;
  isComplete: boolean;
  createdAt: Date;
}
