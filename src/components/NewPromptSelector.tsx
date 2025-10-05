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
  background-color: white;
  border: 2px solid #e5e7eb;
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  line-height: 1.6;
  padding: 1rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-height: 80px;
  min-width: 80px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  /* Mobile touch optimization */
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:hover {
    border-color: #667eea;
    background: #f8fafc;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.15);
  }

  &:active {
    transform: translateY(0);
    background: #667eea;
    color: white;
    border-color: #667eea;
  }

  @media (max-width: 480px) {
    min-height: 70px;
    min-width: 70px;
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

const CategoryButtonImg = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  display: block;

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    margin-bottom: 6px;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 480px) {
    gap: 8px;
    padding: 12px;
  }
`;

const FixedContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const SelectorHeader = styled.div`
  color: white;
  text-align: center;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 1rem;
  }
`;

const SelectorTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const NewPromptSelector = ({ onSelection }: NewPromptSelectorProps) => {
  return (
    <FixedContainer>
      <SelectorHeader>
        <SelectorTitle>Pick Something New to Do</SelectorTitle>
      </SelectorHeader>
      <ButtonGrid>
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
      </ButtonGrid>
    </FixedContainer>
  );
};
