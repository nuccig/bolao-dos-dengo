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
    <main className="m-page">
      <section className="m-container py-10 md:py-16">
      <header className="border-b pb-6 m-hairline">
        <Link className="m-link" href="/pools">
          ← Meus bolões
        </Link>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="m-eyebrow">
              Bolão
            </p>
            <h1 className="m-display mt-2 text-5xl">{pool.name}</h1>
            <p className="m-body mt-3 text-sm">
              Convite #{pool.inviteCode}
            </p>
          </div>
          {isAdmin ? (
            <Link className="m-button m-button-secondary" href={`/pools/${pool.id}/admin`}>
              Admin
            </Link>
          ) : null}
        </div>
        <nav className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link className="m-button" href={`/pools/${pool.id}/ranking`}>
            Ranking
          </Link>
          <Link className="m-button m-button-secondary" href="/join">
            Outro convite
          </Link>
        </nav>
      </header>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {matches.map((match) => {
          const prediction = match.predictions[0];
          const editable = canEditPrediction({ kickoffAt: match.kickoffAt });

          return (
            <article className="m-card p-6" key={match.id}>
              <div className="flex items-center justify-between gap-3">
                <span className="m-eyebrow">{match.round ?? "Copa 2026"}</span>
                <time className="m-body text-sm" dateTime={match.kickoffAt.toISOString()}>
                  {match.kickoffAt.toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </time>
              </div>
              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-t pt-6 text-center m-hairline">
                <strong className="text-xl font-bold uppercase">{match.homeTeam.name}</strong>
                <span className="m-eyebrow">x</span>
                <strong className="text-xl font-bold uppercase">{match.awayTeam.name}</strong>
              </div>
              <form action={savePredictionAction} className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                <input name="poolId" type="hidden" value={pool.id} />
                <input name="matchId" type="hidden" value={match.id} />
                <label className="grid gap-2">
                  <span className="m-eyebrow text-xs">Casa</span>
                  <input
                    className="m-input text-center text-2xl font-bold disabled:opacity-60"
                    defaultValue={prediction?.homeScore ?? ""}
                    disabled={!editable}
                    min={0}
                    name="homeScore"
                    required
                    type="number"
                  />
                </label>
                <span className="m-eyebrow pb-3 text-center">x</span>
                <label className="grid gap-2">
                  <span className="m-eyebrow text-xs">Fora</span>
                  <input
                    className="m-input text-center text-2xl font-bold disabled:opacity-60"
                    defaultValue={prediction?.awayScore ?? ""}
                    disabled={!editable}
                    min={0}
                    name="awayScore"
                    required
                    type="number"
                  />
                </label>
                <button
                  className="m-button col-span-3 w-full"
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
          <p className="m-body m-card p-6 text-center text-sm">
            Nenhuma partida sincronizada ainda. Rode o sync da API-Football para preencher a tabela.
          </p>
        ) : null}
      </section>
      </section>
    </main>
  );
}
