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
`;

export const WidgetContainerCompact = styled.div<{ noGap?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: ${({ noGap }) => (noGap ? "0" : "1rem")};
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
