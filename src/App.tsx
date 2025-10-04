import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { NewPromptSelector } from "./components/NewPromptSelector";
import { Selection } from "./components/Selection";
import { DirectionLR } from "./components/widgets/DirectionLR";
import { prompts } from "./data";
import { PromptCategory, PromptType, type RoadTripSession } from "./types";
import { parsePrompt, type ParsedPrompt } from "./utils/prompt";
import { getSessions } from "./utils/storage";

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

function App() {
  const [currentSession, setCurrentSession] = useState<RoadTripSession | null>(
    null
  );
  const [prompt, setPrompt] = useState<ParsedPrompt>(
    parsePrompt(prompts[PromptCategory.DRIVING][0])
  );

  const newPromptSelection = (category: PromptCategory) => {
    const categoryPrompts = prompts[category];
    const newPrompt = parsePrompt(
      categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)]
    );
    setPrompt(newPrompt);
    setSelections([]);
    setWidget(null);
    setMask(newPrompt.numSelections > 0);
  };

  const [widget, setWidget] = useState<React.ReactNode | null>(null);
  const [mask, setMask] = useState<boolean>(true);

  const [selections, setSelections] = useState<string[]>([]);

  const setSelection = (selectedOption: string, idx: number) => {
    const newSelections = [...selections];
    newSelections[idx] = selectedOption;
    setSelections(newSelections);
  };

  const selectWidget = (promptType: PromptType, idx: number) => {
    switch (promptType) {
      case PromptType.DIRECTION_LR:
        setWidget(
          <DirectionLR
            onSelection={(selectedOption: string) =>
              setSelection(selectedOption, idx)
            }
            multi={false}
          />
        );
        break;
      // case PromptType.DIRECTION_LRF:
      //   setWidget(
      //     <DirectionLRF
      //       onSelection={(selectedOption: string) =>
      //         setSelection(selectedOption, idx)
      //       }
      //     />
      //   );
      //   break;
      default:
        setWidget(null);
        break;
    }
  };

  const components = prompt.parts.map((part, index) => {
    if (typeof part === "object" && "promptType" in part) {
      return (
        <Selection
          promptType={part.promptType}
          onClick={(promptType: PromptType) => selectWidget(promptType, index)}
          value={selections[index]}
        />
      );
    }
    // return <span style={{ opacity: mask ? 0 : 1 }}>{part}</span>;
    return <span>{mask ? "_".repeat(part.length) : part}</span>;
  });

  // const [currentPromptSet, setCurrentPromptSet] = useState<string[]>([]);
  // const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  // const [userSelections, setUserSelections] = useState<UserSelection[]>([]);
  // const [_, setAllSessions] = useState<RoadTripSession[]>([]);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const sessions = getSessions();
    // setAllSessions(sessions);

    // If no sessions exist, start a new one
    if (sessions.length === 0) {
      startNewAdventure();
    }
  }, []);

  const startNewAdventure = () => {
    // Pick a random combination of 1-2 prompts
    // const randomCombination =
    //   promptCombinations[Math.floor(Math.random() * promptCombinations.length)];

    const newSession: RoadTripSession = {
      id: Date.now().toString(),
      instructions: [],
      currentStep: 0,
      isComplete: false,
      createdAt: new Date(),
    };

    setCurrentSession(newSession);
    // setCurrentPromptSet(randomCombination);
    // setCurrentPromptIndex(0);
    // setUserSelections([]);
  };

  const continueAdventure = () => {
    if (!currentSession) return;

    // Pick a new random combination for the next step
    // const randomCombination =
    //   promptCombinations[Math.floor(Math.random() * promptCombinations.length)];

    // setCurrentPromptSet(randomCombination);
    // setCurrentPromptIndex(0);
    // setUserSelections([]);
  };

  // const _handleSelection = (promptId: string, selectedOption: string) => {
  //   const newSelection: UserSelection = { promptId, selectedOption };
  //   const updatedSelections = [...userSelections, newSelection];
  //   setUserSelections(updatedSelections);

  //   // Check if we've completed all prompts in this set
  //   if (currentPromptIndex < currentPromptSet.length - 1) {
  //     setCurrentPromptIndex((prev) => prev + 1);
  //   } else {
  //     // Generate instruction with current selections
  //     generateInstruction(updatedSelections);
  //   }
  // };

  // const generateInstruction = (selections: UserSelection[]) => {
  //   // Find instructions that match our current selections
  //   const availableInstructions = roadTripInstructions.filter((instruction) => {
  //     return instruction.placeholders.every((placeholder) =>
  //       selections.some((selection) => selection.promptId === placeholder)
  //     );
  //   });

  //   // If no perfect match, use any instruction and fill what we can
  //   const selectedInstruction =
  //     availableInstructions.length > 0
  //       ? availableInstructions[
  //           Math.floor(Math.random() * availableInstructions.length)
  //         ]
  //       : roadTripInstructions[
  //           Math.floor(Math.random() * roadTripInstructions.length)
  //         ];

  //   let instructionText = selectedInstruction.template;

  //   // Replace placeholders with user selections
  //   selectedInstruction.placeholders.forEach((placeholder) => {
  //     const selection = selections.find((s) => s.promptId === placeholder);
  //     if (selection) {
  //       instructionText = instructionText.replace(
  //         `{${placeholder}}`,
  //         selection.selectedOption
  //       );
  //     }
  //   });

  //   const generatedInstruction: GeneratedInstruction = {
  //     instruction: instructionText,
  //     timestamp: new Date(),
  //   };

  //   if (currentSession) {
  //     const updatedSession = {
  //       ...currentSession,
  //       instructions: [...currentSession.instructions, generatedInstruction],
  //       currentStep: currentSession.currentStep + 1,
  //     };
  //     setCurrentSession(updatedSession);

  //     // Save to localStorage
  //     updateSession(currentSession.id, updatedSession);
  //     setAllSessions(getSessions());
  //   }
  // };

  // const _getCurrentPrompt = () => {
  //   const promptId = currentPromptSet[currentPromptIndex];
  //   return promptSets[promptId as keyof typeof promptSets];
  // };

  // const _isPromptSetComplete = () => {
  //   return currentPromptIndex >= currentPromptSet.length;
  // };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗺️ Adventure Generator</h1>
        <p>Multi-step randomized road trip adventures!</p>
      </header>

      <main className="app-main">
        {/* Current prompt if not complete */}
        {/* {!isPromptSetComplete() && (
          <MadLibsPrompt
            prompt={getCurrentPrompt()}
            onSelection={handleSelection}
            step={currentPromptIndex + 1}
            totalSteps={currentPromptSet.length}
          />
        )} */}

        <PromptArea>{components}</PromptArea>
        <br />
        {widget}

        <button onClick={() => setMask(false)}>Reveal</button>

        <NewPromptSelector onSelection={newPromptSelection} />

        <button onClick={continueAdventure}>Continue Adventure</button>
      </main>
    </div>
  );
}

export default App;
