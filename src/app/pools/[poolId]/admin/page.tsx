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
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-6">
      <Link className="text-sm font-bold text-[#0f7b4f]" href={`/pools/${pool.id}`}>
        Voltar ao bolão
      </Link>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-[#0f7b4f]">
        Admin
      </p>
      <h1 className="text-3xl font-black">{pool.name}</h1>

      <section className="mt-6 rounded-[1.5rem] bg-white p-5 shadow-lg shadow-black/5">
        <p className="text-sm font-bold text-[#6d5c4b]">Código de convite</p>
        <strong className="mt-2 block text-4xl font-black tracking-widest">
          {pool.inviteCode}
        </strong>
        <p className="mt-3 text-sm text-[#6d5c4b]">
          Compartilhe este código no grupo. Regeneração e remoção de membros ficam para a próxima fatia.
        </p>
      </section>

      <section className="mt-5 grid gap-3">
        <h2 className="text-xl font-black">Membros</h2>
        {pool.memberships.map((membership) => (
          <article className="rounded-2xl bg-white p-4 shadow shadow-black/5" key={membership.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-black">{membership.user.displayName}</h3>
                <p className="text-sm font-bold text-[#6d5c4b]">{membership.role}</p>
              </div>
              <time className="text-xs font-bold text-[#6d5c4b]" dateTime={membership.joinedAt.toISOString()}>
                {membership.joinedAt.toLocaleDateString("pt-BR")}
              </time>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
