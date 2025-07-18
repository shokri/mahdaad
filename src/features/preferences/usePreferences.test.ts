import { describe, it, beforeEach, expect } from "vitest";
import { usePreferences } from "./usePreferences";
import { nextTick } from "vue";
describe("usePreferences", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return default values when localStorage is empty", () => {
    const { theme, fontSize } = usePreferences();
    expect(theme.value).toBe("light");
    expect(fontSize.value).toBe("medium");
  });

  it("should read initial values from localStorage", () => {
    localStorage.setItem("theme", "dark");
    localStorage.setItem("fontSize", "large");
    const { theme, fontSize } = usePreferences();
    expect(theme.value).toBe("dark");
    expect(fontSize.value).toBe("large");
  });

  it("should write updated values to localStorage", async () => {
    const { theme, fontSize } = usePreferences();
    theme.value = "dark";
    fontSize.value = "small";
    await nextTick();
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(localStorage.getItem("fontSize")).toBe("small");
  });
});
