import { describe, it, expect } from "vitest";
import { formatDuration } from ".";

describe("Функция formatDuration", () => {
  it("должна корректно форматировать значения меньше 60 секунд", () => {
    expect(formatDuration(5)).toBe("0:05");
    expect(formatDuration(42)).toBe("0:42");
  });

  it("должна корректно форматировать ровные минуты", () => {
    expect(formatDuration(60)).toBe("1:00");
    expect(formatDuration(180)).toBe("3:00");
  });

  it("должна корректно форматировать минуты и секунды", () => {
    expect(formatDuration(125)).toBe("2:05");
    expect(formatDuration(3599)).toBe("59:59");
  });
});
