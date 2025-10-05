import { PromptCategory } from "./types";

// single {brackets} are prompt types
// double {{brackets}} expand to a random value, which can contain {brackets}
// {{driving_amount}} expands to "{number} minutes" or "{number} miles"
// {{landmark}} expands to a random landmark type
// {{cuisine}} expands to a random cuisine type

export const prompts: Record<PromptCategory, string[]> = {
  [PromptCategory.DRIVING]: [
    "Turn {direction_lr} as soon as possible",
    "Make as few turns as possible for {{driving_amount}}",
    "For the next {{driving_amount}}, make every {direction_lr} turn that you haven't made yet",
    "Follow the next {color} car you see for {{driving_amount}}",
    "Turn at the next street sign starting with {letter}",
    "For the next {{driving_amount}}, go as {direction_cardinal} as possible",
    "Get to the straightest road you can find, take a {direction_lr} turn, and drive for {{driving_amount}}",
    "Drive to a nearby town whose name is at least {number} letters long",
    "Go to the nearest road {direction_cardinal} of you and continue driving there",
"Follow the next {number} arrow(s) you see on signs",
  ],
  [PromptCategory.FOOD]: [
    "Eat something at the nearest restaurant with a number in its name",
    "Eat at the restaurant with the longest name you can find",
    "Eat at the closest {{cuisine}} restaurant",
    "Go to the nearest restaurant where you can eat something new",
  ],
  [PromptCategory.WALKING]: [
    "Walk to the tallest object you can see {direction_cardinal} of you",
    "Walk around until you find a pretty flower",
    "Turn around and walk the other way",
    "Go into the most interesting shop you see",
    "Walk to a body of water",
    "Keep walking on this road until you've passed {number} buildings",
    "Follow a person wearing {color} for the next {number} minutes",
"Find a place nearby to buy {number} items for ${number} or less",
  ],
  [PromptCategory.LANDMARK]: [
    "Go to a {{landmark}} without taking any {direction_lr} turns",
    "Go to a nearby {{landmark}} with a name containing {letter}",
  ],
};
