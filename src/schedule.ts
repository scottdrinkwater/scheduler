import { addDays, addMonths, addWeeks, addYears, min } from "date-fns";

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

export type Pattern<TEvent> = {
  event: TEvent;
  startDate: Date;
  endDate?: Date;
  frequency: Period;
};

type Occurrence<TEvent> = {
  event: TEvent;
  date: Date;
};

const nextOccurrence = (period: Period, date: Date) => {
  switch (period.unit) {
    case "day":
      return addDays(date, period.measure);
    case "week":
      return addWeeks(date, period.measure);
    case "month":
      return addMonths(date, period.measure);
    case "year":
      return addYears(date, period.measure);
  }
};

const occurrences = <TEvent>(
  pattern: Pattern<TEvent>,
  startDate: Date,
  endDate: Date
): Occurrence<TEvent>[] => {
  const concreteEnd = min([pattern.endDate ?? endDate, endDate]);
  const occurrences: Occurrence<TEvent>[] = [];
  for (
    let date = pattern.startDate;
    date < concreteEnd;
    date = nextOccurrence(pattern.frequency, date)
  ) {
    const event = pattern.event;
    const occurrence: Occurrence<TEvent> = { event, date };
    if (startDate >= pattern.startDate) {
      occurrences.push(occurrence);
    }
  }

  return occurrences;
};

type Schedule<TEvent> = {
  patterns: Pattern<TEvent>[];
};

export const scheduler = <TEvent>(
  schedule: Schedule<TEvent> = { patterns: [] }
) => {
  return {
    add: (pattern: Pattern<TEvent>) => {
      schedule.patterns.push(pattern);

      return scheduler(schedule);
    },
    get: (): Schedule<TEvent> => schedule,
    calendar: (startDate: Date, endDate: Date): Occurrence<TEvent>[] => {
      return schedule.patterns.flatMap((pattern) =>
        occurrences(pattern, startDate, endDate)
      );
    },
  };
};
