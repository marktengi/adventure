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
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
`;

const PromptAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  vertical-align: middle;
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  width: 100%;
  border-radius: 12px;
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

export const App = () => {
  const [prompt, setPrompt] = useState<ParsedPrompt>(() => {
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

  const [curPromptInfo, setCurPromptInfo] = useState<{
    category: PromptCategory;
    idx: number;
  }>({ category: PromptCategory.DRIVING, idx: 0 });
  // get a new prompt, ensuring it's not the same as the current prompt
  const getNewPrompt = (category: PromptCategory) => {
    const categoryPrompts = prompts[category];
    let newIdx = Math.floor(Math.random() * categoryPrompts.length);
    if (category !== curPromptInfo.category) {
      const newPrompt = parsePrompt(categoryPrompts[newIdx]);
      setCurPromptInfo({ category, idx: newIdx });
      return newPrompt;
    } else {
      if (newIdx === curPromptInfo.idx) {
        console.log("newIdx is the same as the current idx, incrementing");
        newIdx = (newIdx + 1) % categoryPrompts.length;
      }
      const newPrompt = parsePrompt(categoryPrompts[newIdx]);
      setCurPromptInfo({ category, idx: newIdx });
      return newPrompt;
    }
  };

  const newPromptSelection = (category: PromptCategory) => {
    const newPrompt = getNewPrompt(category);
    setPrompt(newPrompt);
    setSelectionedValues([]);
    setMask(newPrompt.selectionIndices.length > 0);
    if (newPrompt.selectionIndices.length > 0) {
      setCurrentSelectionIndex(0);
    } else {
      setCurrentSelectionIndex(null);
    }
  };

  // set the value selected at a given index
  const updateSelectedValue = useCallback(
    (selectedOption: string, idx: number, advance: boolean = true) => {
      const newSelections = { ...selectedValues, [idx]: selectedOption };
      setSelectionedValues(newSelections);

      // advance the selection index if it is not the last one
      // if we're on the last but a previous part is selected, set the current selection index to the previous part
      if (advance) {
        if (
          currentSelectionIndex !== null &&
          currentSelectionIndex < prompt.selectionIndices.length - 1
        ) {
          setCurrentSelectionIndex(currentSelectionIndex + 1);
        } else {
          const unfilledIndices = prompt.selectionIndices.filter(
            (index) => !newSelections[index]
          );
          if (unfilledIndices.length > 0) {
            const nextIndex = prompt.selectionIndices.indexOf(
              unfilledIndices[0]
            );
            setCurrentSelectionIndex(nextIndex);
          } else {
            setCurrentSelectionIndex(null);
            setMask(false);
          }
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

  const components = prompt.parts.map((part, index) => {
    if (typeof part === "object" && "promptType" in part) {
      return (
        <Selection
          key={index}
          promptType={part.promptType}
          onClick={() => {
            // when this selection is clicked, set the current selection index to this index
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
        <h1>Ariel's Adventure</h1>
      </header>

      <main className="app-main">
        <PromptAreaContainer>
          <PromptArea>{components}</PromptArea>
        </PromptAreaContainer>
        <WidgetContainer>{widget}</WidgetContainer>

        <NewPromptSelector onSelection={newPromptSelection} />
      </main>
    </div>
  );
};
