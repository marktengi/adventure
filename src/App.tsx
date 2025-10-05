import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
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

// Mobile-optimized styled components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  padding-bottom: 120px; /* Space for fixed bottom navigation */

  /* iPhone safe area support */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-top: env(safe-area-inset-top);
`;

const AppHeader = styled.header`
  text-align: center;
  padding: 1.5rem 1rem;
  color: white;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const AppTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const AppMain = styled.main`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem 2rem;
`;

const PromptAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background-color: white;
  border: 1px solid #e5e7eb;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  padding: 1.5rem;

  @media (max-width: 480px) {
    padding: 1rem;
    min-height: 150px;
  }
`;

const PromptArea = styled.span`
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.6;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const MaskedText = styled.span`
  color: transparent;
  border-bottom: 2px solid #374151;
  // display: inline-block;
  min-width: 0.5em;

  &.unmasked {
    color: #374151;
    border-bottom: none;
  }
`;

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
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
        const unfilledIndices = prompt.selectionIndices.filter(
          (index) => !newSelections[index]
        );
        if (unfilledIndices.length > 0) {
          const nextIndex = prompt.selectionIndices.indexOf(unfilledIndices[0]);
          setCurrentSelectionIndex(nextIndex);
        } else {
          setCurrentSelectionIndex(null);
          setMask(false);
        }
      }
    },
    [selectedValues, prompt]
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
    return mask ? (
      <MaskedText key={index}>{part}</MaskedText>
    ) : (
      <MaskedText className="unmasked" key={index}>
        {part}
      </MaskedText>
    );
  });

  return (
    <AppContainer>
      <AppHeader>
        <AppTitle>Ariel's Adventure</AppTitle>
      </AppHeader>

      <AppMain>
        <PromptAreaContainer>
          <PromptArea>{components}</PromptArea>
        </PromptAreaContainer>
        <WidgetContainer>{widget}</WidgetContainer>

        <NewPromptSelector onSelection={newPromptSelection} />
      </AppMain>
    </AppContainer>
  );
};
