export type WorksheetService = {
  id: string;
  label: string;
  note?: string;
  rate: number;
  unit: "hr" | "flat";
};

export const WORKSHEET_SERVICES: WorksheetService[] = [
  {
    id: "personal-shopping",
    label: "Personal Shopping (w/o Client)",
    note: "items delivered to home",
    rate: 150,
    unit: "hr",
  },
  {
    id: "look-book",
    label: "Look Book",
    rate: 65,
    unit: "flat",
  },
  {
    id: "shopping-session",
    label: "Shopping Session (w/ Client)",
    rate: 100,
    unit: "hr",
  },
  {
    id: "in-closet",
    label: "In-Closet Outfit Creation",
    rate: 85,
    unit: "hr",
  },
];
