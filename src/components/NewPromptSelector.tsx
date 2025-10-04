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
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  flex: 1;
  text-align: center;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const NewPromptSelector = ({ onSelection }: NewPromptSelectorProps) => {
  return (
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
  );
};
