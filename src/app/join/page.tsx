import Link from "next/link";

import { joinPoolAction } from "@/features/pools/actions";

export const dynamic = "force-dynamic";

export default function JoinPoolPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-8">
      <Link className="mb-8 text-sm font-bold text-[#0f7b4f]" href="/pools">
        Voltar
      </Link>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0f7b4f]">
        Convite
      </p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">
        Entre no bolão da galera.
      </h1>
      <form action={joinPoolAction} className="mt-8 grid gap-3 rounded-[2rem] bg-white p-5 shadow-xl shadow-black/5">
        <label className="grid gap-2 text-sm font-bold">
          Código do convite
          <input
            className="rounded-2xl border border-black/10 bg-white px-4 py-4 uppercase"
            name="inviteCode"
            placeholder="ABC123"
            required
          />
        </label>
        <button className="rounded-2xl bg-[#0f7b4f] px-5 py-4 font-black text-white" type="submit">
          Entrar no bolão
        </button>
      </form>
    </main>
  );
}
