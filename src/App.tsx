import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { NewPromptSelector } from "./components/NewPromptSelector";
import { Selection } from "./components/Selection";
import { CardinalDirection } from "./components/widgets/CardinalDirection";
import { ColorWidget } from "./components/widgets/ColorWidget";
import { DirectionLR } from "./components/widgets/DirectionLR";
import { LetterWidget } from "./components/widgets/LetterWidget";
import { NumberWidget } from "./components/widgets/NumberWidget";
import { prompts } from "./data";
import { Color, PromptCategory, PromptType, type ParsedPrompt } from "./types";
import { parsePrompt } from "./utils/prompt";

const PromptArea = styled.span`
  display: inline-block;
  max-width: 100%;
  font-size: 1.2rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  width: 100%;
`;

export const App = () => {
  const [prompt, setPrompt] = useState<ParsedPrompt>(() => {
    console.log("in usestate");
    return parsePrompt(prompts[PromptCategory.DRIVING][0]);
  });

  const [mask, setMask] = useState<boolean>(true);

  // the index of the current selection in the prompt.selectionIndices array
  const [currentSelectionIndex, setCurrentSelectionIndex] = useState<
    number | null
  >(0);

  const [selectedValues, setSelectionedValues] = useState<
    Record<number, string>
  >({});

  console.log("rendering. prompt:", prompt);

  const newPromptSelection = (category: PromptCategory) => {
    const categoryPrompts = prompts[category];
    console.log("newPromptSelection", category);
    const newPrompt = parsePrompt(
      categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)]
    );
    console.log("setting a new prompt", newPrompt);
    setPrompt(newPrompt);
    setSelectionedValues([]);
    setMask(newPrompt.selectionIndices.length > 0);
    if (newPrompt.selectionIndices.length > 0) {
      setCurrentSelectionIndex(0);
    } else {
      console.log("no selection indices");
      setCurrentSelectionIndex(null);
    }
  };

  // set the value selected at a given index
  const updateSelectedValue = useCallback(
    (selectedOption: string, idx: number, advance: boolean = true) => {
      const newSelections = { ...selectedValues, [idx]: selectedOption };
      setSelectionedValues(newSelections);
      console.log("setSelection", newSelections, idx);

      // advance the selection index if it is not the last one
      if (advance) {
        if (
          currentSelectionIndex !== null &&
          currentSelectionIndex < prompt.selectionIndices.length - 1
        ) {
          console.log("advancing");
          setCurrentSelectionIndex(currentSelectionIndex + 1);
        } else {
          console.log("resetting");
          setCurrentSelectionIndex(null);
        }
      }
    },
    [selectedValues, currentSelectionIndex, prompt]
  );

  const widget = useMemo(() => {
    if (currentSelectionIndex === null) {
      return null;
    }
    const partIndex = prompt.selectionIndices[currentSelectionIndex];
    const part = prompt.parts[partIndex];
    if (typeof part === "string") {
      return null;
    }
    const selectionType = part.promptType as PromptType;

    switch (selectionType) {
      case PromptType.DIRECTION_LR:
        return (
          <DirectionLR
            onSelection={(selectedOption: string) =>
              updateSelectedValue(selectedOption, partIndex)
            }
            multi={false}
          />
        );
      case PromptType.DIRECTION_CARDINAL:
        return (
          <CardinalDirection
            onSelection={(selectedOption: string) =>
              updateSelectedValue(selectedOption, partIndex)
            }
            multi={false}
          />
        );
      case PromptType.COLOR:
        return (
          <ColorWidget
            onSelection={(selectedOption: Color) =>
              updateSelectedValue(selectedOption, partIndex)
            }
            multi={false}
          />
        );
      case PromptType.NUMBER:
        return (
          <NumberWidget
            onSelection={(selectedOption: string) =>
              updateSelectedValue(selectedOption, partIndex)
            }
            multi={false}
            initialValue={
              selectedValues[partIndex] as
                | "1"
                | "2"
                | "3"
                | "4"
                | "5"
                | "6"
                | "7"
                | "8"
                | "9"
                | "10"
                | null
            }
            onDrag={(
              value: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
            ) => updateSelectedValue(value, partIndex, false)}
          />
        );
      case PromptType.LETTER:
        return (
          <LetterWidget
            onSelection={(selectedOption: string) =>
              updateSelectedValue(selectedOption, partIndex)
            }
            multi={false}
          />
        );
      default:
        return null;
    }
  }, [currentSelectionIndex, prompt, updateSelectedValue, selectedValues]);

  console.log("currentSelectionIndex", currentSelectionIndex);

  const components = prompt.parts.map((part, index) => {
    if (typeof part === "object" && "promptType" in part) {
      return (
        <Selection
          key={index}
          promptType={part.promptType}
          onClick={() => {
            // when this selection is clicked, set the current selection index to this index
            console.log(
              `click on ${
                part.promptType
              } setting current selection index to ${prompt.selectionIndices.indexOf(
                index
              )}`
            );
            setCurrentSelectionIndex(prompt.selectionIndices.indexOf(index));
          }}
          value={selectedValues[index]}
          current={
            currentSelectionIndex !== null &&
            prompt.selectionIndices?.[currentSelectionIndex] === index
          }
        />
      );
    }
    const maskedContent = part
      .split(" ")
      .map((word) => "_".repeat(word.length))
      .join(" ");
    return <span key={index}>{mask ? maskedContent : part}</span>;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗺️ Adventure Generator</h1>
        <p>Multi-step randomized road trip adventures!</p>
      </header>

      <main className="app-main">
        <PromptArea>{components}</PromptArea>
        <br />
        {widget}

        <button onClick={() => setMask(false)}>Reveal</button>

        <NewPromptSelector onSelection={newPromptSelection} />
      </main>
    </div>
  );
};
