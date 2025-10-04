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

export const parsePrompt = (prompt: string) => {
  return expand(prompt)
    .split(/ ?(\{.+?\}) ?/)
    .map((part) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        const type = part.slice(1, -1) as PromptType;
        return {
          promptType: type,
        };
      } else {
        return part;
      }
    });
};
