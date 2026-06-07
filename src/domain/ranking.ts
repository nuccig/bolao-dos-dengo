export type RankingEntry = {
  userId: string;
  totalPoints: number;
  exactScoreHits: number;
  outcomeHits: number;
  lastPointsAt: Date | null;
};

export type RankedEntry = RankingEntry & {
  rank: number;
};

function compareRankingEntries(a: RankingEntry, b: RankingEntry) {
  const byPoints = b.totalPoints - a.totalPoints;
  if (byPoints !== 0) return byPoints;

  const byExactScores = b.exactScoreHits - a.exactScoreHits;
  if (byExactScores !== 0) return byExactScores;

  const byOutcomes = b.outcomeHits - a.outcomeHits;
  if (byOutcomes !== 0) return byOutcomes;

  if (!a.lastPointsAt && !b.lastPointsAt) return 0;

  const aLast = a.lastPointsAt?.getTime() ?? Number.POSITIVE_INFINITY;
  const bLast = b.lastPointsAt?.getTime() ?? Number.POSITIVE_INFINITY;
  return aLast - bLast;
}

function isVisualTie(a: RankingEntry, b: RankingEntry) {
  return compareRankingEntries(a, b) === 0;
}

export function rankEntries(entries: RankingEntry[]): RankedEntry[] {
  const sorted = [...entries].sort(compareRankingEntries);
  let lastRank = 0;

  return sorted.map((entry, index) => {
    const previous = sorted[index - 1];
    const rank = previous && isVisualTie(previous, entry) ? lastRank : index + 1;
    lastRank = rank;

    return { ...entry, rank };
  });
}
