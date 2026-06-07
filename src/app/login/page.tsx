import Link from "next/link";

import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-8">
      <Link className="mb-8 text-sm font-bold text-[#0f7b4f]" href="/">
        Voltar
      </Link>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0f7b4f]">
        Entrar
      </p>
      <h1 className="mt-2 text-4xl font-black tracking-tight">
        Acesse seu bolao.
      </h1>
      <p className="mt-3 text-[#6d5c4b]">
        Use Google ou magic link por email para continuar sem senha.
      </p>
      <div className="mt-8 rounded-[2rem] bg-white p-5 shadow-xl shadow-black/5">
        <LoginForm />
      </div>
    </main>
  );
}
