import { describe, expect, it } from "vitest";
import { addDays, addMonths, addWeeks, addYears, subDays, subMonths, subWeeks, subYears } from "date-fns";
import { Frequency, scheduley } from "../src/scheduley";
import { generate } from "../src/utils/array";

describe("scheduley.ts", () => {
  const event = {
    title: "A Wonderful Event",
    description: "Oh what a wonderful event this shall be.",
  };

  describe("calendar", () => {
    it("generates events every day", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addDays(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "day" };
      const scheduler = scheduley().add({
        startDate,
        endDate,
        event,
        frequency
      });

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2023-01-02 12:00:00"),
        new Date("2023-01-03 12:00:00"),
        new Date("2023-01-04 12:00:00"),
        new Date("2023-01-05 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(5, () => event)
      );
    });

    it("generates events every day, only shows selected", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addDays(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "day" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(addDays(startDate, 1), subDays(endDate, 1));

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-02 12:00:00"),
        new Date("2023-01-03 12:00:00"),
        new Date("2023-01-04 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });

    it("generates events every 2 days", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addDays(startDate, 5);
      const frequency: Frequency = { measure: 2, unit: "day" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2023-01-03 12:00:00"),
        new Date("2023-01-05 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });

    it("generates events every week", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addWeeks(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "week" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2023-01-08 12:00:00"),
        new Date("2023-01-15 12:00:00"),
        new Date("2023-01-22 12:00:00"),
        new Date("2023-01-29 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(5, () => event)
      );
    });

    it("generates events every week, only show selected", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addWeeks(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "week" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(addWeeks(startDate, 1), subWeeks(endDate, 1));

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-08 12:00:00"),
        new Date("2023-01-15 12:00:00"),
        new Date("2023-01-22 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });

    it("generates events every 2 weeks", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addWeeks(startDate, 5);
      const frequency: Frequency = { measure: 2, unit: "week" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2023-01-15 12:00:00"),
        new Date("2023-01-29 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });

    it("generates events every month", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addMonths(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "month" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2023-02-01 12:00:00"),
        new Date("2023-03-01 12:00:00"),
        new Date("2023-04-01 12:00:00"),
        new Date("2023-05-01 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(5, () => event)
      );
    });

    it("generates events every month, only show selected", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addMonths(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "month" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(addMonths(startDate, 1), subMonths(endDate, 1));

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-02-01 12:00:00"),
        new Date("2023-03-01 12:00:00"),
        new Date("2023-04-01 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });

    it("generates events every 2 months", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addMonths(startDate, 5);
      const frequency: Frequency = { measure: 2, unit: "month" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2023-03-01 12:00:00"),
        new Date("2023-05-01 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });

    it("generates events every year", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addYears(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "year" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2024-01-01 12:00:00"),
        new Date("2025-01-01 12:00:00"),
        new Date("2026-01-01 12:00:00"),
        new Date("2027-01-01 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(5, () => event)
      );
    });

    it("generates events every year, only show selected", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addYears(startDate, 5);
      const frequency: Frequency = { measure: 1, unit: "year" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(addYears(startDate, 1), subYears(endDate, 1));

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2024-01-01 12:00:00"),
        new Date("2025-01-01 12:00:00"),
        new Date("2026-01-01 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });

    it("generates events every 2 years", () => {
      // Arrange
      const startDate = new Date("2023-01-01 12:00:00");
      const endDate = addYears(startDate, 5);
      const frequency: Frequency = { measure: 2, unit: "year" };
      const pattern = {
        event,
        frequency,
        startDate,
        endDate,
      };
      const scheduler = scheduley().add(pattern);

      // Act
      const calendar = scheduler.calendar(startDate, endDate);

      // Assert
      expect(calendar.map((occurrence) => occurrence.date)).toEqual([
        new Date("2023-01-01 12:00:00"),
        new Date("2025-01-01 12:00:00"),
        new Date("2027-01-01 12:00:00"),
      ]);
      expect(calendar.map((occurrence) => occurrence.event)).toEqual(
        generate(3, () => event)
      );
    });
  });
});
