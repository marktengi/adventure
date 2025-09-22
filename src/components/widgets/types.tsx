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
