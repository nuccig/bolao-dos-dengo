import Link from "next/link";
import { notFound } from "next/navigation";

import { canManagePool } from "@/domain/tenancy";
import { requireCurrentUser } from "@/features/auth/user";
import { getPoolForMember } from "@/features/pools/queries";

export const dynamic = "force-dynamic";

export default async function PoolAdminPage({
  params,
}: {
  params: Promise<{ poolId: string }>;
}) {
  const { poolId } = await params;
  const user = await requireCurrentUser();
  const pool = await getPoolForMember(poolId, user.id);

  if (!pool) notFound();

  const memberships = pool.memberships.map((membership) => ({
    poolId: pool.id,
    role: membership.role,
  }));

  if (!canManagePool(memberships, pool.id)) notFound();

  return (
    <main className="m-page">
      <section className="m-container py-10 md:py-16">
      <Link className="m-link" href={`/pools/${pool.id}`}>
        ← Voltar ao bolão
      </Link>
      <p className="m-eyebrow mt-6">
        Admin
      </p>
      <h1 className="m-display mt-2 text-5xl">{pool.name}</h1>

      <section className="m-card mt-8 p-6">
        <p className="m-eyebrow">Código de convite</p>
        <div className="m-stripe mt-4" aria-hidden="true">
          <span />
        </div>
        <strong className="mt-6 block text-5xl font-bold tracking-widest">
          {pool.inviteCode}
        </strong>
        <p className="m-body mt-4 text-sm">
          Compartilhe este código no grupo. Regeneração e remoção de membros ficam para a próxima fatia.
        </p>
      </section>

      <section className="mt-10 grid gap-4">
        <h2 className="m-eyebrow">Membros</h2>
        {pool.memberships.map((membership) => (
          <article className="m-card p-5" key={membership.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold uppercase">{membership.user.displayName}</h3>
                <p className="m-body text-sm">{membership.role}</p>
              </div>
              <time className="m-eyebrow text-xs" dateTime={membership.joinedAt.toISOString()}>
                {membership.joinedAt.toLocaleDateString("pt-BR")}
              </time>
            </div>
          </article>
        ))}
      </section>
      </section>
    </main>
  );
}
