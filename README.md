# Scheduley
## Build Status
| Statement Coverage                 | Function Coverage                 | Line Coverage             |
| --------------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat) |

## Installation
NPM:
```bash
npm i scottdrinkwater/scheduler --save
```
Yarn:
```bash
yarn add scottdrinkwater/scheduler
```

## Usage

### Methods
- [`scheduler().add(pattern)`](#Add)
- [`scheduler().calendar()`](#Calendar)

#### Add
The `scheduler().add(pattern)` method takes a [`Pattern`](#Pattern) as a parameter and adds it to the schedule. A [pattern](#Pattern) describes the frequency at which an event occurs and how long its occurs for. 

**Examples:**

An event which occurs ever day indefinitely:

```ts
scheduler().add({
    startDate: new Date(),
    frequency: {
        measure: 1,
        unit: 'day'
    },
    event: {
        title: 'An event',
        description: 'My daily event.'
    }
})
```

An event which occurs every 2 weeks indefinitely:
```ts
scheduler().add({
    startDate: new Date(),
    frequency: {
        measure: 2,
        unit: 'week'
    },
    event: {
        title: 'An event',
        description: 'My bi-weekly event.'
    }
})
```

An event which occurs every 6 months between two dates:
```ts
scheduler().add({
    startDate: new Date('2023-01-01 12:00:00'),
    endDate: new Date('2025-01-01 12:00:00'),
    frequency: {
        measure: 6,
        unit: 'month'
    },
    event: {
        title: 'An event',
        description: 'My bi-annual event.'
    }
})
```

#### Calendar

The `scheduler().calendar(startDate, endDate)` method takes two [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) parameters and generates an [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of [`Occurrence`](#Occurrence)s which describes all occurrences of events in the date range.

**Example:**

```ts
const event1 = {
    startDate: new Date('2023-01-01 12:00:00'),
    endDate: new Date('2023-01-05 12:00:00'),
    frequency: {
        measure: 1,
        unit: 'day'
    },
    event: {
        title: 'My first event.',
        description: 'This happens daily.'
    }
}
const event2 = {
    startDate: new Date('2023-01-01 12:00:00'),
    endDate: new Date('2023-01-05 12:00:00'),
    frequency: {
        measure: 2,
        unit: 'day'
    },
    event: {
        title: 'My second event.',
        description: 'This happens every 2 days.'
    }
}

const schedule = scheduler()
    .add(event1)
    .add(event2)

console.log(schedule.calendar());
```

Would output:

```json
[
    {
        "event": {
            "title": "My first event.",
            "description": "This happens daily."
        },
        "date": "2023-01-01T12:00:00.000Z"
    },
    {
        "event": {
            "title": "My second event.",
            "description": "This happens every 2 days."
        },
        "date": "2023-01-01T12:00:00.000Z"
    },
    {
        "event": {
            "title": "My first event.",
            "description": "This happens daily."
        },
        "date": "2023-01-02T12:00:00.000Z"
    },
    {
        "event": {
            "title": "My first event.",
            "description": "This happens daily."
        },
        "date": "2023-01-03T12:00:00.000Z"
    },
        {
        "event": {
            "title": "My second event.",
            "description": "This happens every 2 days."
        },
        "date": "2023-01-03T12:00:00.000Z"
    },
    {
        "event": {
            "title": "My first event.",
            "description": "This happens daily."
        },
        "date": "2023-01-04T12:00:00.000Z"
    },
    {
        "event": {
            "title": "My first event.",
            "description": "This happens daily."
        },
        "date": "2023-01-05T12:00:00.000Z"
    },
    {
        "event": {
            "title": "My second event.",
            "description": "This happens every 2 days."
        },
        "date": "2023-01-05T12:00:00.000Z"
    }
]
```


### Types
- [`Pattern`](#Pattern)
- [`Frequency`](#Frequency)
- [`Occurrence`](#Occurrence)
- [`UnitType`](#UnitType)

#### Pattern
A pattern is the duration and frequency in which an event occurs on a schedule.

| Property | Type | Description |
| -- | --- | -- |
| `event` | `any` | An event which occurs within this pattern. |
| `startDate` | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date which the pattern starts from. |
| `endDate` | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) \| `undefined` | The date which the pattern ends on. |
| `frequency` | [`Frequency`](#Frequency) | The frequency which the event occurs within the date period for this pattern. |

#### Frequency

A frequency is the date interval at which an event should occur.

| Property | Type | Description |
| -- | -- | -- |
| `unit` | [`Unit`](#Unit) | The unit of frequency: daily, weekly, monthly or yearly.
| `measure` | `number` | The number of units. | 

#### Unit

The measure of time used to describe the frequency of an event.

| Property | Type | Description |
| -- | -- | -- |
| `day` | `string` | A day.
| `week` | `string` | A week.
| `month` | `string` | A month.
| `year` | `string` | A year.

#### Occurrence
An concrete of an event on a specific date generated from a pattern on the schedule. 

| Property | Type | Description |
| -- | -- | -- |
| `event` | `any` | An event which occurs on a date. | 
| `date` | [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | The date on which the event occurs.  | 
