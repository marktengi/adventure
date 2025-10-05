import styled from "styled-components";
import car from "../assets/car.svg";
import food from "../assets/food.svg";
import landmark from "../assets/location.svg";
import walking from "../assets/walk.svg";
import { PromptCategory } from "../types";

interface NewPromptSelectorProps {
  onSelection: (category: PromptCategory) => void;
}

const CategoryButton = styled.button`
  background-color: #f8fafc;
  border: 1px solid #e5e7eb;
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-height: 80px;
`;

const CategoryButtonImg = styled.img`
  width: 36px;
  height: 36px;
  margin-bottom: 10px;
  display: block;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
`;
// fixed div to keep the buttons at the bottom of the screen
// full width, respecting the padding on the surrounding div
const FixedDiv = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const NewPromptSelector = ({ onSelection }: NewPromptSelectorProps) => {
  return (
    <FixedDiv>
      <StyledDiv>
        <CategoryButton onClick={() => onSelection(PromptCategory.DRIVING)}>
          <CategoryButtonImg src={car} alt="Driving" />
          Driving
        </CategoryButton>
        <CategoryButton onClick={() => onSelection(PromptCategory.FOOD)}>
          <CategoryButtonImg src={food} alt="Food" />
          Food
        </CategoryButton>
        <CategoryButton onClick={() => onSelection(PromptCategory.WALKING)}>
          <CategoryButtonImg src={walking} alt="Walking" />
          Walking
        </CategoryButton>
        <CategoryButton onClick={() => onSelection(PromptCategory.LANDMARK)}>
          <CategoryButtonImg src={landmark} alt="Landmark" />
          Landmark
        </CategoryButton>
      </StyledDiv>
    </FixedDiv>
  );
};
