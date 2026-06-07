import { fetchWorldCupFixtures, type ApiFootballFixture } from "@/features/api-football/client";
import { prisma } from "@/lib/prisma";

const PROVIDER = "api-football";

export function mapFixtureStatus(status?: string | null) {
  if (!status) return "scheduled";
  if (["TBD", "NS"].includes(status)) return "scheduled";
  if (["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"].includes(status)) {
    return "live";
  }
  if (["FT", "AET", "PEN"].includes(status)) return "finished";
  if (["PST"].includes(status)) return "postponed";
  if (["CANC", "ABD", "AWD", "WO"].includes(status)) return "cancelled";
  return "scheduled";
}

async function upsertTeam(team: ApiFootballFixture["teams"]["home"]) {
  return prisma.team.upsert({
    where: {
      provider_externalId: {
        provider: PROVIDER,
        externalId: String(team.id),
      },
    },
    update: {
      name: team.name,
      logoUrl: team.logo ?? null,
    },
    create: {
      provider: PROVIDER,
      externalId: String(team.id),
      name: team.name,
      logoUrl: team.logo ?? null,
    },
  });
}

export async function syncWorldCupFixtures() {
  const syncRun = await prisma.apiSyncRun.create({
    data: {
      provider: PROVIDER,
      endpoint: "fixtures",
      status: "running",
    },
  });

  try {
    const fixtures = await fetchWorldCupFixtures();
    let recordsUpserted = 0;

    for (const fixture of fixtures) {
      const competition = await prisma.competition.upsert({
        where: {
          provider_externalId_season: {
            provider: PROVIDER,
            externalId: String(fixture.league.id),
            season: fixture.league.season,
          },
        },
        update: {
          name: fixture.league.name,
        },
        create: {
          provider: PROVIDER,
          externalId: String(fixture.league.id),
          name: fixture.league.name,
          season: fixture.league.season,
        },
      });

      const [homeTeam, awayTeam] = await Promise.all([
        upsertTeam(fixture.teams.home),
        upsertTeam(fixture.teams.away),
      ]);

      await prisma.match.upsert({
        where: {
          provider_externalId: {
            provider: PROVIDER,
            externalId: String(fixture.fixture.id),
          },
        },
        update: {
          competitionId: competition.id,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          kickoffAt: new Date(fixture.fixture.date),
          status: mapFixtureStatus(fixture.fixture.status?.short),
          round: fixture.league.round ?? null,
          venue: fixture.fixture.venue?.name ?? null,
          homeScore: fixture.goals.home,
          awayScore: fixture.goals.away,
          penaltyHomeScore: fixture.score?.penalty?.home ?? null,
          penaltyAwayScore: fixture.score?.penalty?.away ?? null,
          finishedAt:
            mapFixtureStatus(fixture.fixture.status?.short) === "finished"
              ? new Date()
              : null,
          rawPayload: fixture,
        },
        create: {
          provider: PROVIDER,
          externalId: String(fixture.fixture.id),
          competitionId: competition.id,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          kickoffAt: new Date(fixture.fixture.date),
          status: mapFixtureStatus(fixture.fixture.status?.short),
          round: fixture.league.round ?? null,
          venue: fixture.fixture.venue?.name ?? null,
          homeScore: fixture.goals.home,
          awayScore: fixture.goals.away,
          penaltyHomeScore: fixture.score?.penalty?.home ?? null,
          penaltyAwayScore: fixture.score?.penalty?.away ?? null,
          finishedAt:
            mapFixtureStatus(fixture.fixture.status?.short) === "finished"
              ? new Date()
              : null,
          rawPayload: fixture,
        },
      });
      recordsUpserted += 1;
    }

    await prisma.apiSyncRun.update({
      where: { id: syncRun.id },
      data: {
        status: "success",
        finishedAt: new Date(),
        recordsRead: fixtures.length,
        recordsUpserted,
      },
    });

    return { recordsRead: fixtures.length, recordsUpserted };
  } catch (error) {
    await prisma.apiSyncRun.update({
      where: { id: syncRun.id },
      data: {
        status: "failed",
        finishedAt: new Date(),
        errorMessage: error instanceof Error ? error.message : "Unknown sync error",
      },
    });
    throw error;
  }
}
