import Link from "next/link";

import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="m-page">
      <section className="m-narrow flex min-h-screen flex-col justify-center py-16">
      <Link className="m-link mb-8" href="/">
        ← Voltar
      </Link>
      <p className="m-eyebrow">
        Entrar
      </p>
      <h1 className="m-display mt-3 text-5xl">
        Acesse seu bolao.
      </h1>
      <p className="m-body mt-5">
        Use Google ou magic link por email para continuar sem senha.
      </p>
      <div className="m-stripe mt-8" aria-hidden="true">
        <span />
      </div>
      <div className="m-card mt-8 p-6">
        <LoginForm />
      </div>
      </section>
    </main>
  );
}
