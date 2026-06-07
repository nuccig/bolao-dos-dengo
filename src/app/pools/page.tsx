import Link from "next/link";

import { requireCurrentUser } from "@/features/auth/user";
import { listUserPools } from "@/features/pools/queries";

export const dynamic = "force-dynamic";

export default async function PoolsPage() {
  const user = await requireCurrentUser();
  const pools = await listUserPools(user.id);

  return (
    <main className="m-page">
      <section className="m-container py-10 md:py-16">
      <header className="flex items-center justify-between border-b pb-6 m-hairline">
        <div>
          <p className="m-eyebrow">
            Meus grupos
          </p>
          <h1 className="m-display mt-2 text-5xl">Bolões</h1>
        </div>
        <Link className="m-button hidden sm:inline-flex" href="/pools/new">
          Novo
        </Link>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Link className="m-card border-dashed p-6" href="/join">
          <p className="m-eyebrow">Convite</p>
          <h2 className="mt-4 text-2xl font-bold uppercase">
          Entrar com código
          </h2>
        </Link>
        {pools.map((pool) => (
          <Link
            className="m-card p-6"
            href={`/pools/${pool.id}`}
            key={pool.id}
          >
            <div className="m-stripe mb-6 max-w-20" aria-hidden="true">
              <span />
            </div>
            <h2 className="text-2xl font-bold uppercase leading-tight">
              {pool.name}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <span className="m-spec-cell p-3 text-center text-xs font-bold uppercase tracking-[1.5px]">
                {pool.memberships[0]?.role === "admin" ? "Admin" : "Membro"}
              </span>
              <span className="m-spec-cell p-3 text-center text-xs font-bold uppercase tracking-[1.5px]">
                #{pool.inviteCode}
              </span>
            </div>
          </Link>
        ))}
        {pools.length === 0 ? (
          <p className="m-body m-card p-6 text-center text-sm">
            Crie seu primeiro bolão ou entre com um convite.
          </p>
        ) : null}
      </div>
      <Link className="m-button mt-6 flex sm:hidden" href="/pools/new">
        Novo bolão
      </Link>
      </section>
    </main>
  );
}
