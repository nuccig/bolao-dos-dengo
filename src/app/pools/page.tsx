import Link from "next/link";

import { requireCurrentUser } from "@/features/auth/user";
import { listUserPools } from "@/features/pools/queries";

export const dynamic = "force-dynamic";

export default async function PoolsPage() {
  const user = await requireCurrentUser();
  const pools = await listUserPools(user.id);

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0f7b4f]">
            Meus grupos
          </p>
          <h1 className="text-3xl font-black">Bolões</h1>
        </div>
        <Link className="rounded-full bg-[#0f7b4f] px-4 py-2 text-sm font-bold text-white" href="/pools/new">
          Novo
        </Link>
      </header>

      <div className="mt-6 grid gap-3">
        <Link className="rounded-2xl border border-dashed border-black/20 bg-white/70 px-4 py-4 text-center font-black" href="/join">
          Entrar com código
        </Link>
        {pools.map((pool) => (
          <Link
            className="rounded-[1.5rem] bg-white p-5 shadow-lg shadow-black/5"
            href={`/pools/${pool.id}`}
            key={pool.id}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">{pool.name}</h2>
                <p className="text-sm font-bold text-[#6d5c4b]">
                  {pool.memberships[0]?.role === "admin" ? "Admin" : "Membro"}
                </p>
              </div>
              <span className="rounded-full bg-[#f4b63f]/25 px-3 py-1 text-sm font-black text-[#6d4b09]">
                #{pool.inviteCode}
              </span>
            </div>
          </Link>
        ))}
        {pools.length === 0 ? (
          <p className="rounded-2xl bg-white p-4 text-center text-sm font-semibold text-[#6d5c4b]">
            Crie seu primeiro bolão ou entre com um convite.
          </p>
        ) : null}
      </div>
    </main>
  );
}
