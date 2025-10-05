import { PromptType, type ParsedPrompt } from "../types";

const expanders = {
  driving_amount: ["{number} minutes", "{number} miles"],
  landmark: ["park", "bridge", "mountain", "lake", "mall"],
  cuisine: ["Italian", "Mexican", "Japanese", "French", "Thai"],
};

const expand = (prompt: string) => {
  return prompt.replace(/{{(\w+)}}/g, (_, p1) => {
    return expanders[p1 as keyof typeof expanders][
      Math.floor(Math.random() * expanders[p1 as keyof typeof expanders].length)
    ];
  });
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
  const selectionIndices = parts
    .map((part, index) =>
      typeof part === "object" && "promptType" in part ? index : null
    )
    .filter((index) => index !== null) as number[];
  return { raw, parts, selectionIndices };
};
