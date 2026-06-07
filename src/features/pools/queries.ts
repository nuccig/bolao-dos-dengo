import { scorePrediction } from "@/domain/scoring";
import { prisma } from "@/lib/prisma";

export async function listUserPools(userId: string) {
  return prisma.pool.findMany({
    where: {
      memberships: {
        some: { userId },
      },
    },
    include: {
      memberships: {
        where: { userId },
        select: { role: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPoolForMember(poolId: string, userId: string) {
  return prisma.pool.findFirst({
    where: {
      id: poolId,
      memberships: {
        some: { userId },
      },
    },
    include: {
      memberships: {
        include: { user: true },
        orderBy: { joinedAt: "asc" },
      },
    },
  });
}

export async function listPoolMatches(poolId: string, userId: string) {
  return prisma.match.findMany({
    include: {
      homeTeam: true,
      awayTeam: true,
      predictions: {
        where: { poolId, userId },
      },
    },
    orderBy: { kickoffAt: "asc" },
    take: 48,
  });
}

export async function getPoolRankingForMember(poolId: string, userId: string) {
  const pool = await prisma.pool.findFirst({
    where: {
      id: poolId,
      memberships: {
        some: { userId },
      },
    },
    include: {
      memberships: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!pool) return null;

  const predictions = await prisma.prediction.findMany({
    where: { poolId },
    select: {
      userId: true,
      homeScore: true,
      awayScore: true,
      match: {
        select: {
          homeScore: true,
          awayScore: true,
          status: true,
          finishedAt: true,
          kickoffAt: true,
        },
      },
    },
  });

  const stats = new Map<
    string,
    {
      userId: string;
      displayName: string;
      totalPoints: number;
      exactScoreHits: number;
      outcomeHits: number;
      lastPointsAt: Date | null;
    }
  >();

  for (const membership of pool.memberships) {
    stats.set(membership.userId, {
      userId: membership.userId,
      displayName: membership.user.displayName,
      totalPoints: 0,
      exactScoreHits: 0,
      outcomeHits: 0,
      lastPointsAt: null,
    });
  }

  for (const prediction of predictions) {
    if (
      prediction.match.homeScore === null ||
      prediction.match.awayScore === null ||
      prediction.match.status !== "finished"
    ) {
      continue;
    }

    const entry = stats.get(prediction.userId);
    if (!entry) continue;

    const score = scorePrediction({
      prediction: {
        homeScore: prediction.homeScore,
        awayScore: prediction.awayScore,
      },
      result: {
        homeScore: prediction.match.homeScore,
        awayScore: prediction.match.awayScore,
      },
    });

    entry.totalPoints += score.points;
    entry.exactScoreHits += score.exactScoreHit ? 1 : 0;
    entry.outcomeHits += score.outcomeHit ? 1 : 0;
    if (score.points > 0) {
      entry.lastPointsAt = prediction.match.finishedAt ?? prediction.match.kickoffAt;
    }
  }

  const { rankEntries } = await import("@/domain/ranking");
  const ranked = rankEntries([...stats.values()]);

  return ranked.map((entry) => ({
    ...entry,
    displayName: stats.get(entry.userId)?.displayName ?? "Dengo",
  }));
}
