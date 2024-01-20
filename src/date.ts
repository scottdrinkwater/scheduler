export const Unit = {
  day: "day",
  week: "week",
  month: "month",
  year: "year",
} as const;

export type UnitType = keyof typeof Unit;

export type Period = {
  measure: number;
  unit: UnitType;
};
