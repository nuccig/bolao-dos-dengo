import { describe, expect, it } from "vitest";

import { scorePrediction } from "./scoring";

describe("scorePrediction", () => {
  it("awards 5 points for an exact score", () => {
    expect(
      scorePrediction({
        prediction: { homeScore: 2, awayScore: 1 },
        result: { homeScore: 2, awayScore: 1 },
      }),
    ).toEqual({ points: 5, exactScoreHit: true, outcomeHit: true });
  });

  it("awards 3 points for the correct winner without exact score", () => {
    expect(
      scorePrediction({
        prediction: { homeScore: 1, awayScore: 0 },
        result: { homeScore: 3, awayScore: 2 },
      }),
    ).toEqual({ points: 3, exactScoreHit: false, outcomeHit: true });
  });

  it("awards 3 points for the correct draw outcome", () => {
    expect(
      scorePrediction({
        prediction: { homeScore: 0, awayScore: 0 },
        result: { homeScore: 2, awayScore: 2 },
      }),
    ).toEqual({ points: 3, exactScoreHit: false, outcomeHit: true });
  });

  it("awards 0 points when the outcome is wrong", () => {
    expect(
      scorePrediction({
        prediction: { homeScore: 2, awayScore: 1 },
        result: { homeScore: 0, awayScore: 1 },
      }),
    ).toEqual({ points: 0, exactScoreHit: false, outcomeHit: false });
  });
});
