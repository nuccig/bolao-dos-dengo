"use client";

import { useState, useTransition } from "react";

import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function signInWithEmail() {
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/pools`,
        },
      });

      setMessage(error ? error.message : "Confira seu email para entrar.");
    });
  }

  function signInWithGoogle() {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/pools`,
        },
      });
    });
  }

  return (
    <div className="grid gap-3">
      <input
        className="rounded-2xl border border-black/10 bg-white px-4 py-4"
        inputMode="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="seu@email.com"
        type="email"
        value={email}
      />
      <button
        className="rounded-2xl bg-[#0f7b4f] px-5 py-4 font-black text-white disabled:opacity-60"
        disabled={isPending || !email}
        onClick={signInWithEmail}
        type="button"
      >
        Receber magic link
      </button>
      <button
        className="rounded-2xl border border-black/10 bg-white px-5 py-4 font-black"
        disabled={isPending}
        onClick={signInWithGoogle}
        type="button"
      >
        Entrar com Google
      </button>
      {message ? <p className="text-sm font-bold text-[#0f7b4f]">{message}</p> : null}
    </div>
  );
}
