import Link from "next/link";

import { createPoolAction } from "@/features/pools/actions";

export const dynamic = "force-dynamic";

export default function NewPoolPage() {
  return (
    <main className="m-page">
      <section className="m-narrow flex min-h-screen flex-col justify-center py-16">
      <Link className="m-link mb-8" href="/pools">
        ← Voltar
      </Link>
      <p className="m-eyebrow">
        Novo bolão
      </p>
      <h1 className="m-display mt-3 text-5xl">
        Crie a disputa do seu grupo.
      </h1>
      <form action={createPoolAction} className="m-card mt-8 grid gap-4 p-6">
        <label className="grid gap-2">
          <span className="m-eyebrow">Nome do bolão</span>
          <input
            className="m-input"
            name="name"
            placeholder="Família Dengo"
            required
          />
        </label>
        <button className="m-button w-full" type="submit">
          Criar bolão
        </button>
      </form>
      </section>
    </main>
  );
}
