export enum PromptType {
  NUMBER = "number",
  DIRECTION_LR = "direction_lr",
  DIRECTION_LRF = "direction_lrf",
  COLOR = "color",
  LANDMARK = "landmark",
  TIME = "time",
}

export interface RoadTripPrompt {
  id: string;
  type: PromptType;
  question: string;
  options: string[];
}

export interface RoadTripInstruction {
  id: string;
  template: string;
  placeholders: PromptType[];
}

export interface UserSelection {
  promptId: string;
  selectedOption: string;
}

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
