import styled from "styled-components";
import { PromptCategory } from "../types";

interface NewPromptSelectorProps {
  onSelection: (category: PromptCategory) => void;
}

const CategoryButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
`;

export const NewPromptSelector = ({ onSelection }: NewPromptSelectorProps) => {
  return (
    <div>
      <CategoryButton onClick={() => onSelection(PromptCategory.DRIVING)}>
        Driving
      </CategoryButton>
      <CategoryButton onClick={() => onSelection(PromptCategory.FOOD)}>
        Food
      </CategoryButton>
      <CategoryButton onClick={() => onSelection(PromptCategory.WALKING)}>
        Walking
      </CategoryButton>
      <CategoryButton onClick={() => onSelection(PromptCategory.LANDMARK)}>
        Landmark
      </CategoryButton>
    </div>
  );
};
