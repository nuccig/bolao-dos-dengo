import Link from "next/link";

import { joinPoolAction } from "@/features/pools/actions";

export const dynamic = "force-dynamic";

export default function JoinPoolPage() {
  return (
    <main className="m-page">
      <section className="m-narrow flex min-h-screen flex-col justify-center py-16">
      <Link className="m-link mb-8" href="/pools">
        ← Voltar
      </Link>
      <p className="m-eyebrow">
        Convite
      </p>
      <h1 className="m-display mt-3 text-5xl">
        Entre no bolão da galera.
      </h1>
      <form action={joinPoolAction} className="m-card mt-8 grid gap-4 p-6">
        <label className="grid gap-2">
          <span className="m-eyebrow">Código do convite</span>
          <input
            className="m-input uppercase"
            name="inviteCode"
            placeholder="ABC123"
            required
          />
        </label>
        <button className="m-button w-full" type="submit">
          Entrar no bolão
        </button>
      </form>
      </section>
    </main>
  );
}
