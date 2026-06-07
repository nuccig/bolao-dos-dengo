import { getServerEnv } from "@/lib/env";

export type ApiFootballFixture = {
  fixture: {
    id: number;
    date: string;
    venue?: {
      name?: string | null;
    };
    status?: {
      short?: string | null;
      elapsed?: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    season: number;
    round?: string | null;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo?: string | null;
    };
    away: {
      id: number;
      name: string;
      logo?: string | null;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score?: {
    penalty?: {
      home: number | null;
      away: number | null;
    };
  };
};

type ApiFootballResponse = {
  response: ApiFootballFixture[];
};

export async function fetchWorldCupFixtures() {
  const env = getServerEnv();
  const url = new URL("/fixtures", env.API_FOOTBALL_BASE_URL);
  url.searchParams.set("league", String(env.API_FOOTBALL_WORLD_CUP_LEAGUE_ID));
  url.searchParams.set("season", String(env.API_FOOTBALL_WORLD_CUP_SEASON));

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": env.API_FOOTBALL_KEY,
    },
    next: {
      revalidate: 0,
    },
  });

  if (!response.ok) {
    throw new Error(`API-Football request failed with ${response.status}`);
  }

  const payload = (await response.json()) as ApiFootballResponse;
  return payload.response;
}
