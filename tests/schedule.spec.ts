import { describe, it, expect } from "vitest";
import { schedule } from "../src/schedule";

describe("schedule.ts", () => {
  const event = {
    title: "A Wonderful Event",
    description: "Oh what a wonderful event this shall be.",
  };

  it("should occur every day for 1 day", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "day").for(1, "day");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(1);
    expect(newSchedule.patterns[0].duration?.unit).toBe("day");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("day");
  });

  it("should occur every week for 1 week", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "week").for(1, "week");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(1);
    expect(newSchedule.patterns[0].duration?.unit).toBe("week");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("week");
  });

  it("should occur every month for 1 month", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "month").for(1, "month");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(1);
    expect(newSchedule.patterns[0].duration?.unit).toBe("month");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("month");
  });

  it("should occur every year for 1 year", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "year").for(1, "year");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(1);
    expect(newSchedule.patterns[0].duration?.unit).toBe("year");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("year");
  });

  it("should occur every day for 1 week", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "day").for(1, "week");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(1);
    expect(newSchedule.patterns[0].duration?.unit).toBe("week");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("day");
  });

  it("should occur every week for 1 month", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "month").for(1, "month");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(1);
    expect(newSchedule.patterns[0].duration?.unit).toBe("month");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("month");
  });

  it("should occur every month for 1 year", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "year").for(1, "year");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(1);
    expect(newSchedule.patterns[0].duration?.unit).toBe("year");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("year");
  });

  it("should occur every year for 5 years", () => {
    // Arrange
    const date = new Date();

    // Act
    const newSchedule = schedule(date);
    newSchedule.add(event).every(1, "year").for(5, "year");

    // Assert
    expect(newSchedule.startDate).toBe(date);
    expect(newSchedule.patterns[0].duration?.measure).toBe(5);
    expect(newSchedule.patterns[0].duration?.unit).toBe("year");
    expect(newSchedule.patterns[0].occurs?.measure).toBe(1);
    expect(newSchedule.patterns[0].occurs?.unit).toBe("year");
  });
});
