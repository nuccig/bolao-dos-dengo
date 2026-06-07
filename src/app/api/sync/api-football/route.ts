import { NextResponse, type NextRequest } from "next/server";

import { validateSyncSecret } from "@/features/api-football/sync-auth";
import { syncWorldCupFixtures } from "@/features/api-football/sync";
import { getServerEnv } from "@/lib/env";

export async function POST(request: NextRequest) {
  const env = getServerEnv();
  const auth = validateSyncSecret({
    configuredSecret: env.SYNC_SECRET,
    providedSecret: request.headers.get("x-sync-secret"),
  });

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const result = await syncWorldCupFixtures();

  return NextResponse.json(result);
}
