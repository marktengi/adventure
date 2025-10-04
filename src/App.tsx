import { useEffect, useState } from "react";
import "./App.css";
import InstructionDisplay from "./components/InstructionDisplay";
import { promptCombinations, promptSets, roadTripInstructions } from "./data";
import type {
  GeneratedInstruction,
  RoadTripSession,
  UserSelection,
} from "./types";
import { getSessions, updateSession } from "./utils/storage";

function App() {
  const [currentSession, setCurrentSession] = useState<RoadTripSession | null>(
    null
  );
  const [currentPromptSet, setCurrentPromptSet] = useState<string[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userSelections, setUserSelections] = useState<UserSelection[]>([]);
  const [_, setAllSessions] = useState<RoadTripSession[]>([]);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const sessions = getSessions();
    setAllSessions(sessions);

    // If no sessions exist, start a new one
    if (sessions.length === 0) {
      startNewAdventure();
    }
  }, []);

  const startNewAdventure = () => {
    // Pick a random combination of 1-2 prompts
    const randomCombination =
      promptCombinations[Math.floor(Math.random() * promptCombinations.length)];

    const newSession: RoadTripSession = {
      id: Date.now().toString(),
      instructions: [],
      currentStep: 0,
      isComplete: false,
      createdAt: new Date(),
    };

    setCurrentSession(newSession);
    setCurrentPromptSet(randomCombination);
    setCurrentPromptIndex(0);
    setUserSelections([]);
  };

  const continueAdventure = () => {
    if (!currentSession) return;

    // Pick a new random combination for the next step
    const randomCombination =
      promptCombinations[Math.floor(Math.random() * promptCombinations.length)];

    setCurrentPromptSet(randomCombination);
    setCurrentPromptIndex(0);
    setUserSelections([]);
  };

  const _handleSelection = (promptId: string, selectedOption: string) => {
    const newSelection: UserSelection = { promptId, selectedOption };
    const updatedSelections = [...userSelections, newSelection];
    setUserSelections(updatedSelections);

    // Check if we've completed all prompts in this set
    if (currentPromptIndex < currentPromptSet.length - 1) {
      setCurrentPromptIndex((prev) => prev + 1);
    } else {
      // Generate instruction with current selections
      generateInstruction(updatedSelections);
    }
  };

  const generateInstruction = (selections: UserSelection[]) => {
    // Find instructions that match our current selections
    const availableInstructions = roadTripInstructions.filter((instruction) => {
      return instruction.placeholders.every((placeholder) =>
        selections.some((selection) => selection.promptId === placeholder)
      );
    });

    // If no perfect match, use any instruction and fill what we can
    const selectedInstruction =
      availableInstructions.length > 0
        ? availableInstructions[
            Math.floor(Math.random() * availableInstructions.length)
          ]
        : roadTripInstructions[
            Math.floor(Math.random() * roadTripInstructions.length)
          ];

    let instructionText = selectedInstruction.template;

    // Replace placeholders with user selections
    selectedInstruction.placeholders.forEach((placeholder) => {
      const selection = selections.find((s) => s.promptId === placeholder);
      if (selection) {
        instructionText = instructionText.replace(
          `{${placeholder}}`,
          selection.selectedOption
        );
      }
    });

    const generatedInstruction: GeneratedInstruction = {
      instruction: instructionText,
      timestamp: new Date(),
    };

    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        instructions: [...currentSession.instructions, generatedInstruction],
        currentStep: currentSession.currentStep + 1,
      };
      setCurrentSession(updatedSession);

      // Save to localStorage
      updateSession(currentSession.id, updatedSession);
      setAllSessions(getSessions());
    }
  };

  const _getCurrentPrompt = () => {
    const promptId = currentPromptSet[currentPromptIndex];
    return promptSets[promptId as keyof typeof promptSets];
  };

  const _isPromptSetComplete = () => {
    return currentPromptIndex >= currentPromptSet.length;
  };

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

        {/* Current instruction display */}
        {currentSession && (
          <InstructionDisplay
            onContinue={continueAdventure}
            onNewAdventure={startNewAdventure}
          />
        )}
      </main>
    </div>
  );
}

export default App;
