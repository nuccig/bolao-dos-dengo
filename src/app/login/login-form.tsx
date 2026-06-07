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
        className="m-input"
        inputMode="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="seu@email.com"
        type="email"
        value={email}
      />
      <button
        className="m-button w-full disabled:opacity-60"
        disabled={isPending || !email}
        onClick={signInWithEmail}
        type="button"
      >
        Receber magic link
      </button>
      <button
        className="m-button m-button-secondary w-full"
        disabled={isPending}
        onClick={signInWithGoogle}
        type="button"
      >
        Entrar com Google
      </button>
      {message ? <p className="m-body text-sm">{message}</p> : null}
    </div>
  );
}
