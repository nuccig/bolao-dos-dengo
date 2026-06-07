import Link from "next/link";
import { notFound } from "next/navigation";

import { canEditPrediction } from "@/domain/prediction-lock";
import { requireCurrentUser } from "@/features/auth/user";
import { savePredictionAction } from "@/features/pools/actions";
import { getPoolForMember, listPoolMatches } from "@/features/pools/queries";

export const dynamic = "force-dynamic";

export default async function PoolDetailPage({
  params,
}: {
  params: Promise<{ poolId: string }>;
}) {
  const { poolId } = await params;
  const user = await requireCurrentUser();
  const [pool, matches] = await Promise.all([
    getPoolForMember(poolId, user.id),
    listPoolMatches(poolId, user.id),
  ]);

  if (!pool) notFound();

  const membership = pool.memberships.find((item) => item.userId === user.id);
  const isAdmin = membership?.role === "admin";

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-6">
      <header>
        <Link className="text-sm font-bold text-[#0f7b4f]" href="/pools">
          Meus bolões
        </Link>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0f7b4f]">
              Bolão
            </p>
            <h1 className="text-3xl font-black">{pool.name}</h1>
            <p className="mt-1 text-sm font-bold text-[#6d5c4b]">
              Convite #{pool.inviteCode}
            </p>
          </div>
          {isAdmin ? (
            <Link className="rounded-full bg-white px-4 py-2 text-sm font-black shadow" href={`/pools/${pool.id}/admin`}>
              Admin
            </Link>
          ) : null}
        </div>
        <nav className="mt-5 grid grid-cols-2 gap-3">
          <Link className="rounded-2xl bg-[#20130a] px-4 py-3 text-center font-black text-white" href={`/pools/${pool.id}/ranking`}>
            Ranking
          </Link>
          <Link className="rounded-2xl bg-white px-4 py-3 text-center font-black" href="/join">
            Outro convite
          </Link>
        </nav>
      </header>

      <section className="mt-6 grid gap-4">
        {matches.map((match) => {
          const prediction = match.predictions[0];
          const editable = canEditPrediction({ kickoffAt: match.kickoffAt });

          return (
            <article className="rounded-[1.5rem] bg-white p-4 shadow-lg shadow-black/5" key={match.id}>
              <div className="flex items-center justify-between gap-3 text-sm font-bold text-[#6d5c4b]">
                <span>{match.round ?? "Copa 2026"}</span>
                <time dateTime={match.kickoffAt.toISOString()}>
                  {match.kickoffAt.toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </time>
              </div>
              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <strong>{match.homeTeam.name}</strong>
                <span className="font-black text-[#6d5c4b]">x</span>
                <strong>{match.awayTeam.name}</strong>
              </div>
              <form action={savePredictionAction} className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                <input name="poolId" type="hidden" value={pool.id} />
                <input name="matchId" type="hidden" value={match.id} />
                <label className="grid gap-2 text-xs font-black uppercase tracking-wide text-[#6d5c4b]">
                  Casa
                  <input
                    className="rounded-2xl border border-black/10 bg-[#fff8ef] px-3 py-3 text-center text-2xl font-black disabled:opacity-60"
                    defaultValue={prediction?.homeScore ?? ""}
                    disabled={!editable}
                    min={0}
                    name="homeScore"
                    required
                    type="number"
                  />
                </label>
                <span className="pb-3 font-black">x</span>
                <label className="grid gap-2 text-xs font-black uppercase tracking-wide text-[#6d5c4b]">
                  Fora
                  <input
                    className="rounded-2xl border border-black/10 bg-[#fff8ef] px-3 py-3 text-center text-2xl font-black disabled:opacity-60"
                    defaultValue={prediction?.awayScore ?? ""}
                    disabled={!editable}
                    min={0}
                    name="awayScore"
                    required
                    type="number"
                  />
                </label>
                <button
                  className="col-span-3 rounded-2xl bg-[#0f7b4f] px-4 py-3 font-black text-white disabled:bg-black/20"
                  disabled={!editable}
                  type="submit"
                >
                  {editable ? "Salvar chute" : "Chute bloqueado"}
                </button>
              </form>
            </article>
          );
        })}
        {matches.length === 0 ? (
          <p className="rounded-2xl bg-white p-4 text-center text-sm font-semibold text-[#6d5c4b]">
            Nenhuma partida sincronizada ainda. Rode o sync da API-Football para preencher a tabela.
          </p>
        ) : null}
      </section>
    </main>
  );
}
