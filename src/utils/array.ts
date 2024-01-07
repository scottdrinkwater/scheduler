export const generate = <T>(
  count: number,
  map: (value: number, key: number) => T = (_, key: number) => key as T
): T[] => [...[...Array(count)]].map(map);
