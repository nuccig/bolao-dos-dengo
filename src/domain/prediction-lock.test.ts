import { describe, expect, it } from "vitest";

import { canEditPrediction } from "./prediction-lock";

describe("canEditPrediction", () => {
  const kickoffAt = new Date("2026-06-11T20:00:00.000Z");

  it("allows editing before kickoff", () => {
    expect(
      canEditPrediction({
        kickoffAt,
        now: new Date("2026-06-11T19:59:59.000Z"),
      }),
    ).toBe(true);
  });

  it("locks editing exactly at kickoff", () => {
    expect(
      canEditPrediction({
        kickoffAt,
        now: new Date("2026-06-11T20:00:00.000Z"),
      }),
    ).toBe(false);
  });
});
