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
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-6">
      <Link className="text-sm font-bold text-[#0f7b4f]" href={`/pools/${pool.id}`}>
        Voltar ao bolão
      </Link>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-[#0f7b4f]">
        Ranking
      </p>
      <h1 className="text-3xl font-black">{pool.name}</h1>

      <section className="mt-6 grid gap-3">
        {ranking.map((entry) => (
          <article className="rounded-[1.5rem] bg-white p-4 shadow-lg shadow-black/5" key={entry.userId}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-[#0f7b4f]">#{entry.rank}</p>
                <h2 className="text-xl font-black">{entry.displayName}</h2>
              </div>
              <strong className="text-3xl font-black">{entry.totalPoints}</strong>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-center text-sm font-bold text-[#6d5c4b]">
              <span className="rounded-xl bg-[#fff8ef] px-3 py-2">
                {entry.exactScoreHits} cravados
              </span>
              <span className="rounded-xl bg-[#fff8ef] px-3 py-2">
                {entry.outcomeHits} resultados
              </span>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
