import { addDays, addMonths, addWeeks, addYears, min } from "date-fns";

// Unit of time to measure frequency an event occurs
export const Unit = {
  day: "day",
  week: "week",
  month: "month",
  year: "year",
} as const;

export type UnitType = keyof typeof Unit;

// Frequency of which an event occurs
export type Frequency = {
  measure: number;
  unit: UnitType;
};

// The duration and frequency for an event
export type Pattern<TEvent> = {
  event: TEvent;
  startDate: Date;
  endDate?: Date;
  frequency: Frequency;
};

// An occurrence of an event for a single date on a schedule
type Occurrence<TEvent> = {
  event: TEvent;
  date: Date;
};

/**
 * Get the next occurrence of a date from a frequency.
 * 
 * @param {Frequency} frequency 
 * @param {Date} date 
 * @returns {Date}
 */
const nextOccurrence = (frequency: Frequency, date: Date) => {
  switch (frequency.unit) {
  case "day":
    return addDays(date, frequency.measure);
  case "week":
    return addWeeks(date, frequency.measure);
  case "month":
    return addMonths(date, frequency.measure);
  case "year":
    return addYears(date, frequency.measure);
  }
};

/**
 * Get a list of concrete event occurrences from a pattern between a date range.
 * 
 * @param {Pattern<TEvent>} pattern 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns {Occurrence<TEvent>}
 */
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
    if (date >= startDate) {
      occurrences.push(occurrence);
    }
  }

  return occurrences;
};

// The schedule containing all event patterns.
type Schedule<TEvent> = {
  patterns: Pattern<TEvent>[];
};

// The scheduler factory.
type Scheduler<TEvent> = {
  add: (pattern: Pattern<TEvent>) => Scheduler<TEvent>;
  calendar: (startDate: Date, endDate: Date) => Occurrence<TEvent>[];
}

/**
 * A factory to generate a schedule.
 * 
 * @param {Schedule<TEvent>} schedule 
 * @returns 
 */
export const scheduler = <TEvent>(
  schedule: Schedule<TEvent> = { patterns: [] }
): Scheduler<TEvent> => {
  return {
    add: (pattern: Pattern<TEvent>): Scheduler<TEvent> => {
      schedule.patterns.push(pattern);

      return scheduler(schedule);
    },
    calendar: (startDate: Date, endDate: Date): Occurrence<TEvent>[] => {
      return schedule.patterns.flatMap((pattern) =>
        occurrences(pattern, startDate, endDate)
      );
    },
  };
};
