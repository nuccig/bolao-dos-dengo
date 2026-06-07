type Score = {
  homeScore: number;
  awayScore: number;
};

type ScorePredictionInput = {
  prediction: Score;
  result: Score;
};

type ScorePredictionResult = {
  points: number;
  exactScoreHit: boolean;
  outcomeHit: boolean;
};

function outcome(score: Score) {
  return Math.sign(score.homeScore - score.awayScore);
}

export function scorePrediction({
  prediction,
  result,
}: ScorePredictionInput): ScorePredictionResult {
  const exactScoreHit =
    prediction.homeScore === result.homeScore &&
    prediction.awayScore === result.awayScore;
  const outcomeHit = outcome(prediction) === outcome(result);

  if (exactScoreHit) {
    return { points: 5, exactScoreHit, outcomeHit };
  }

  if (outcomeHit) {
    return { points: 3, exactScoreHit, outcomeHit };
  }

  return { points: 0, exactScoreHit, outcomeHit };
}
