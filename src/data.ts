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
    "Get to exactly {number} miles {direction_cardinal} of where you currently are",
    "Drive to a body of water {direction_cardinal} of you and get out to walk around",
    "Don't take any {direction_lr} turns for the next {{driving_amount}}",
    "Drive to a park {direction_cardinal} of you and get out to walk around",
  ],
  [PromptCategory.FOOD]: [
    "Eat something at the nearest restaurant with a number in its name",
    "Eat at the restaurant with the longest name you can find",
    "Eat at the closest {{cuisine}} restaurant",
    "Go to the nearest restaurant where you can eat something new",
    "Eat at a restaurant with {color} in its logo",
    "Try to eat something {color}",
    "Find some food that costs ${number} or less",
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
    "Walk to the closest historical landmark",
    "Go {direction_cardinal} until you get bored",
    "At the next turn, go opposite the way you normally would",
    "Take at least {number} turns on your way back to the car",
    "Alternate left and right turns for the next {number} blocks",
    "Don't take any {direction_lr} turns for the next {number} minutes",
    "Don't turn {direction_lr} until you've passed {number} buildings on your {direction_lr}",
    "Go {direction_cardinal} until you find a cool tree",
  ],
  [PromptCategory.LANDMARK]: [
    "Go to a {{landmark}} without taking any {direction_lr} turns",
    "Go to a nearby {{landmark}} with a name containing {letter}",
    "Go to the nearest {{landmark}} that's {direction_cardinal} of you",
  ],
};
