import Link from "next/link";
import { notFound } from "next/navigation";

import { requireCurrentUser } from "@/features/auth/user";
import { getPoolForMember, getPoolRankingForMember } from "@/features/pools/queries";

export const dynamic = "force-dynamic";

export default async function RankingPage({
  params,
}: {
  params: Promise<{ poolId: string }>;
}) {
  const { poolId } = await params;
  const user = await requireCurrentUser();
  const pool = await getPoolForMember(poolId, user.id);

  if (!pool) notFound();

  const ranking = await getPoolRankingForMember(poolId, user.id);

  if (!ranking) notFound();

  return (
    <main className="m-page">
      <section className="m-container py-10 md:py-16">
      <Link className="m-link" href={`/pools/${pool.id}`}>
        ← Voltar ao bolão
      </Link>
      <p className="m-eyebrow mt-6">
        Ranking
      </p>
      <h1 className="m-display mt-2 text-5xl">{pool.name}</h1>
      <div className="m-stripe mt-8" aria-hidden="true">
        <span />
      </div>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {ranking.map((entry) => (
          <article className="m-card p-6" key={entry.userId}>
            <div className="flex items-center justify-between">
              <div>
                <p className="m-eyebrow">#{entry.rank}</p>
                <h2 className="mt-2 text-2xl font-bold uppercase">{entry.displayName}</h2>
              </div>
              <strong className="text-5xl font-bold">{entry.totalPoints}</strong>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center text-sm font-bold uppercase tracking-[1.5px]">
              <span className="m-spec-cell p-3">
                {entry.exactScoreHits} cravados
              </span>
              <span className="m-spec-cell p-3">
                {entry.outcomeHits} resultados
              </span>
            </div>
          </article>
        ))}
      </section>
      </section>
    </main>
  );
}
