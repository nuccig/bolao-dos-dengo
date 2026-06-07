import { describe, expect, it } from "vitest";

import { rankEntries } from "./ranking";

describe("rankEntries", () => {
  it("orders by points, exact scores, outcomes, then earliest last points", () => {
    const ranked = rankEntries([
      {
        userId: "ana",
        totalPoints: 10,
        exactScoreHits: 1,
        outcomeHits: 4,
        lastPointsAt: new Date("2026-06-12T12:00:00.000Z"),
      },
      {
        userId: "bia",
        totalPoints: 10,
        exactScoreHits: 2,
        outcomeHits: 2,
        lastPointsAt: new Date("2026-06-13T12:00:00.000Z"),
      },
      {
        userId: "caio",
        totalPoints: 10,
        exactScoreHits: 1,
        outcomeHits: 4,
        lastPointsAt: new Date("2026-06-11T12:00:00.000Z"),
      },
      {
        userId: "duda",
        totalPoints: 6,
        exactScoreHits: 1,
        outcomeHits: 2,
        lastPointsAt: new Date("2026-06-10T12:00:00.000Z"),
      },
    ]);

    expect(ranked.map((entry) => entry.userId)).toEqual([
      "bia",
      "caio",
      "ana",
      "duda",
    ]);
    expect(ranked.map((entry) => entry.rank)).toEqual([1, 2, 3, 4]);
  });

  it("keeps the same rank for indistinguishable entries", () => {
    const ranked = rankEntries([
      {
        userId: "ana",
        totalPoints: 5,
        exactScoreHits: 1,
        outcomeHits: 1,
        lastPointsAt: null,
      },
      {
        userId: "bia",
        totalPoints: 5,
        exactScoreHits: 1,
        outcomeHits: 1,
        lastPointsAt: null,
      },
    ]);

    expect(ranked.map((entry) => entry.rank)).toEqual([1, 1]);
  });
});
