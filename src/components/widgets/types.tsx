import styled from "styled-components";

type MultiSelectWidgetProps<T extends string[]> = {
  multi: true;
  onSelection: (selectedOptions: T[]) => void;
};

type SingleSelectWidgetProps<T extends string[]> = {
  multi: false;
  onSelection: (selectedOption: T[number]) => void;
};

export type WidgetProps<T extends string[]> =
  | MultiSelectWidgetProps<T>
  | SingleSelectWidgetProps<T>;

export const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

export const WidgetContainerCompact = styled.div<{
  noGap?: boolean;
  columns?: number;
}>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ noGap }) => (noGap ? "0.5rem" : "1rem")};
  width: 100%;
  padding: 1rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(${({ columns }) => columns || 2}, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;
