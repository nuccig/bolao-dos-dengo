import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const displayName =
    user.user_metadata.name ??
    user.user_metadata.full_name ??
    user.email?.split("@")[0] ??
    "Dengo";

  await prisma.userProfile.upsert({
    where: { id: user.id },
    update: {
      displayName,
      avatarUrl: user.user_metadata.avatar_url ?? null,
    },
    create: {
      id: user.id,
      displayName,
      avatarUrl: user.user_metadata.avatar_url ?? null,
    },
  });

  return user;
}
