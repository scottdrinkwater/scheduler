import { addMonths, addWeeks, addYears } from "date-fns";
import addDays from "date-fns/addDays";

export const Unit = {
  week: "week",
  month: "month",
  year: "year",
} as const;

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type UnitType = keyof typeof Unit;

export type Calendar<TEvent> = {
  date: Date;
  pattern: Pattern<TEvent>
}[];

class Period {
  public constructor(public measure: number, public unit: UnitType) {}
}

class Duration extends Period {
  public endDate: Date;
  public constructor(
    public startDate: Date,
    public measure: number,
    public unit: UnitType
  ) {
    super(measure, unit);
    this.endDate = this.getEndDate(startDate, this);
  }

  private getEndDate = (startDate: Date, period: Period) => {
    switch (period.unit) {
      case "week":
        return addWeeks(startDate, period.measure);
      case "month":
        return addMonths(startDate, period.measure);
      case "year":
        return addYears(startDate, period.measure);
    }
  };
}

class Pattern<TEvent> {
  public occurs: Period = new Period(1, "week");
  public duration: Duration;
  public constructor(
    public startDate: Date,
    public weekday: Weekday,
    public event?: TEvent
  ) {
    this.duration = new Duration(this.startDate, 1, "week");
  }

  public every = (measure: number, unit: UnitType): Pattern<TEvent> => {
    this.occurs = new Period(measure, unit);

    return this;
  };

  public for = (measure: number, unit: UnitType): Pattern<TEvent> => {
    this.duration = new Duration(this.startDate, measure, unit);
    return this;
  };
}

class Schedule<TEvent> {
  public constructor(public startDate: Date) {}
  private patterns: Pattern<TEvent>[] = [];

  public add = (weekday: Weekday, event?: TEvent) => {
    const pattern = new Pattern<TEvent>(this.startDate, weekday, event);
    this.patterns.push(pattern);

    return pattern;
  };

  public toCalendar = (): Calendar<TEvent>[] => {
    const dates = this.getDatesInRange();
    return dates.flatMap((date) => {
        const patterns = this.patterns.map((pattern) => {
            return pattern.occurs.unit === 'week' && date.getDay() === pattern.weekday;
        })
        return patterns.map((pattern) => ({
            date,
            pattern,
        }))
    });
  };

  //   public toConcrete = (): Calendar<TEvent> => {
  //     const endDate = this.getEndDateOfPatterns();

  //   };

  public getDatesInRange = (): Date[] => {
    const endDate = this.getEndDateOfPatterns();
    const dates: Date[] = [];
    for (let date = this.startDate; date <= endDate; addDays(date, 1)) {
      dates.push();
    }

    return dates;
  };

  private getEndDateOfPatterns = (): Date => {
    const longestPattern = this.patterns.reduce((patternA, patternB) =>
      patternA.duration.endDate > patternB.duration.endDate
        ? patternA
        : patternB
    );

    return longestPattern.duration.endDate;
  };
}

export const schedule = (startDate: Date) => new Schedule(startDate);
