import { describe, expect, it } from "vitest";

import { formatDuration } from ".";

describe("Функция formatDuration", () => {
  it.each([
    [42, "0:42"],
    [180, "3:00"],
    [125, "2:05"],
  ])("должна корректно форматировать %s секунд -> %s", (input, expected) => {
    expect(formatDuration(input)).toBe(expected);
  });
});
