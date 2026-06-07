import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverEnvSchema = publicEnvSchema.extend({
  DATABASE_URL: z.string().min(1),
  API_FOOTBALL_BASE_URL: z.string().url().default("https://v3.football.api-sports.io"),
  API_FOOTBALL_KEY: z.string().min(1),
  API_FOOTBALL_WORLD_CUP_LEAGUE_ID: z.coerce.number().default(1),
  API_FOOTBALL_WORLD_CUP_SEASON: z.coerce.number().default(2026),
  SYNC_SECRET: z.string().min(1).optional(),
});

export function getPublicEnv() {
  return publicEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}

export function getServerEnv() {
  return serverEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    API_FOOTBALL_BASE_URL: process.env.API_FOOTBALL_BASE_URL,
    API_FOOTBALL_KEY: process.env.API_FOOTBALL_KEY,
    API_FOOTBALL_WORLD_CUP_LEAGUE_ID:
      process.env.API_FOOTBALL_WORLD_CUP_LEAGUE_ID,
    API_FOOTBALL_WORLD_CUP_SEASON: process.env.API_FOOTBALL_WORLD_CUP_SEASON,
    SYNC_SECRET: process.env.SYNC_SECRET,
  });
}
