import {
  PromptCategory,
  PromptType,
  type RoadTripInstruction,
  type RoadTripPrompt,
} from "./types";

// Individual prompt sets for multi-step adventures
export const promptSets: Record<PromptType, RoadTripPrompt> = {
  direction_lr: {
    id: "direction",
    type: PromptType.DIRECTION_LR,
    question: "Pick a direction:",
    options: ["left", "right"],
  },
  direction_lrf: {
    id: "direction",
    type: PromptType.DIRECTION_LRF,
    question: "Pick a direction:",
    options: ["left", "right", "forward"],
  },
  number: {
    id: "number",
    type: PromptType.NUMBER,
    question: "Pick a number:",
    options: ["1", "2", "3", "4", "5", "7", "10", "15", "20", "30"],
  },
  color: {
    id: "color",
    type: PromptType.COLOR,
    question: "Pick a color:",
    options: [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "orange",
      "pink",
      "black",
      "white",
    ],
  },
  landmark: {
    id: "landmark",
    type: PromptType.LANDMARK,
    question: "Pick a landmark type:",
    options: [
      "gas station",
      "restaurant",
      "park",
      "bridge",
      "mountain",
      "lake",
      "mall",
      "library",
      "school",
    ],
  },
  time: {
    id: "time",
    type: PromptType.TIME,
    question: "Pick a time duration:",
    options: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "30 minutes",
      "1 hour",
      "2 hours",
    ],
  },
};

// Available prompt combinations for multi-step adventures
export const promptCombinations = [
  ["direction", "time"],
  ["number", "color"],
  ["landmark", "time"],
  ["weather", "direction"],
  ["color", "number"],
  ["time", "landmark"],
  ["direction", "color"],
  ["number", "weather"],
];

export const roadTripInstructions: RoadTripInstruction[] = [
  // Single input instructions
  {
    id: "direction-only",
    template: "For the next 10 minutes, make only {direction} turns",
    placeholders: [PromptType.DIRECTION_LR],
  },
  {
    id: "number-only",
    template: "Find {number} interesting things and take a photo of each one",
    placeholders: [PromptType.NUMBER],
  },
  {
    id: "color-only",
    template: "Look for {color} objects and count how many you can find",
    placeholders: [PromptType.COLOR],
  },
  {
    id: "landmark-only",
    template: "Visit the nearest {landmark} and explore it for 15 minutes",
    placeholders: [PromptType.LANDMARK],
  },
  {
    id: "time-only",
    template: "Drive for exactly {time} without stopping",
    placeholders: [PromptType.TIME],
  },

  // Double input instructions
  {
    id: "direction-time",
    template: "For the next {time}, make only {direction} turns",
    placeholders: [PromptType.TIME, PromptType.DIRECTION_LR],
  },
  {
    id: "number-color",
    template: "Find {number} {color} objects and take a photo of each one",
    placeholders: [PromptType.NUMBER, PromptType.COLOR],
  },
  {
    id: "landmark-time",
    template: "Visit the nearest {landmark} and spend {time} there",
    placeholders: [PromptType.LANDMARK, PromptType.TIME],
  },
  {
    id: "color-number",
    template: "Count {number} {color} cars you see in the next 15 minutes",
    placeholders: [PromptType.NUMBER, PromptType.COLOR],
  },
  {
    id: "time-landmark",
    template:
      "Spend {time} at the nearest {landmark} and document your experience",
    placeholders: [PromptType.TIME, PromptType.LANDMARK],
  },
  {
    id: "direction-color",
    template:
      "Turn {direction} at every intersection and look for {color} objects",
    placeholders: [PromptType.DIRECTION_LR, PromptType.COLOR],
  },
];

// single {brackets} are prompt types
// double {{brackets}} expand to a random value, which can contain {brackets}
// {{driving_amount}} expands to "{time} minutes" or "{distance} miles"
// {{landmark}} expands to a random landmark type
// {{cuisine}} expands to a random cuisine type

export const prompts: Record<PromptCategory, string[]> = {
  [PromptCategory.DRIVING]: [
    "Make as few turns as possible for {{driving_amount}}",
    "For the next {{driving_amount}}, make every {direction_lr} turn that you haven't made yet",
    "Follow the next {color} car you see for {{driving_amount}}",
    "Turn at the next street sign starting with {letter}",
    "For the next {{driving_amount}}, go as {direction_cardinal} as possible",
    "Get to the straightest road you can find, take a {direction_lr} turn, and drive for {{driving_amount}}",
    "Drive to a nearby town whose name is at least {number} letters long",
  ],
  [PromptCategory.FOOD]: [
    "Eat at the nearest restaurant with a number in its name",
    "Eat at the restaurant with the longest name you can find",
    "Eat at the closest {{cuisine}} restaurant",
  ],
  [PromptCategory.WALKING]: [
    "Walk to the tallest object you can see",
    "Walk around until you find a pretty flower",
    "Turn around and walk the other way",
    "Go into the most interesting shop you see",
    "Walk to a body of water",
  ],
  [PromptCategory.LANDMARK]: [
    "Go to a {{landmark}} without taking any {direction_lr} turns",
  ],
};
