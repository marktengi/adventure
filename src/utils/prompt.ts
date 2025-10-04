import { PromptType } from "../types";

const expanders = {
  driving_amount: ["{time} minutes", "{distance} miles"],
  landmark: [
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
  cuisine: ["Italian", "Mexican", "Japanese", "French", "Thai"],
};

const expand = (prompt: string) => {
  return prompt.replace(/{{(\w+)}}/g, (_, p1) => {
    return expanders[p1 as keyof typeof expanders][
      Math.floor(Math.random() * expanders[p1 as keyof typeof expanders].length)
    ];
  });
};

export type ParsedPrompt = {
  raw: string;
  parts: (string | { promptType: PromptType })[];
  numSelections: number;
};

export const parsePrompt = (prompt: string): ParsedPrompt => {
  const raw = expand(prompt);
  const parts = raw.split(/ ?(\{.+?\}) ?/).map((part) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const type = part.slice(1, -1) as PromptType;
      return {
        promptType: type,
      };
    } else {
      return part;
    }
  });
  const numSelections = parts.filter(
    (part) => typeof part === "object" && "promptType" in part
  ).length;
  console.log({ raw, parts, numSelections });
  return { raw, parts, numSelections };
};
