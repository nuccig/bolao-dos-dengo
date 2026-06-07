"use server";

import { randomBytes } from "node:crypto";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { canEditPrediction } from "@/domain/prediction-lock";
import { assertPoolMembership } from "@/domain/tenancy";
import { requireCurrentUser } from "@/features/auth/user";
import { prisma } from "@/lib/prisma";

const poolSchema = z.object({
  name: z.string().trim().min(3).max(80),
});

const joinSchema = z.object({
  inviteCode: z.string().trim().min(4).max(20),
});

const predictionSchema = z.object({
  poolId: z.string().min(1),
  matchId: z.string().min(1),
  homeScore: z.coerce.number().int().min(0).max(30),
  awayScore: z.coerce.number().int().min(0).max(30),
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function inviteCode() {
  return randomBytes(6).toString("base64url").toUpperCase();
}

export async function createPoolAction(formData: FormData) {
  const user = await requireCurrentUser();
  const input = poolSchema.parse({
    name: formData.get("name"),
  });
  const slug = `${slugify(input.name)}-${Math.random().toString(36).slice(2, 6)}`;

  const pool = await prisma.pool.create({
    data: {
      name: input.name,
      slug,
      inviteCode: inviteCode(),
      createdById: user.id,
      memberships: {
        create: {
          userId: user.id,
          role: "admin",
        },
      },
    },
  });

  revalidatePath("/pools");
  redirect(`/pools/${pool.id}`);
}

export async function joinPoolAction(formData: FormData) {
  const user = await requireCurrentUser();
  const input = joinSchema.parse({
    inviteCode: formData.get("inviteCode"),
  });

  const pool = await prisma.pool.findUnique({
    where: { inviteCode: input.inviteCode.toUpperCase() },
  });

  if (!pool) {
    throw new Error("Convite nao encontrado");
  }

  await prisma.poolMembership.upsert({
    where: {
      poolId_userId: {
        poolId: pool.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      poolId: pool.id,
      userId: user.id,
      role: "member",
    },
  });

  revalidatePath("/pools");
  redirect(`/pools/${pool.id}`);
}

export async function savePredictionAction(formData: FormData) {
  const user = await requireCurrentUser();
  const input = predictionSchema.parse({
    poolId: formData.get("poolId"),
    matchId: formData.get("matchId"),
    homeScore: formData.get("homeScore"),
    awayScore: formData.get("awayScore"),
  });

  const [memberships, match] = await Promise.all([
    prisma.poolMembership.findMany({
      where: { userId: user.id },
      select: { poolId: true, role: true },
    }),
    prisma.match.findUnique({
      where: { id: input.matchId },
      select: { kickoffAt: true },
    }),
  ]);

  assertPoolMembership(memberships, input.poolId);

  if (!match) {
    throw new Error("Partida nao encontrada");
  }

  if (!canEditPrediction({ kickoffAt: match.kickoffAt })) {
    throw new Error("Chute bloqueado para esta partida");
  }

  await prisma.prediction.upsert({
    where: {
      poolId_userId_matchId: {
        poolId: input.poolId,
        userId: user.id,
        matchId: input.matchId,
      },
    },
    update: {
      homeScore: input.homeScore,
      awayScore: input.awayScore,
    },
    create: {
      poolId: input.poolId,
      userId: user.id,
      matchId: input.matchId,
      homeScore: input.homeScore,
      awayScore: input.awayScore,
    },
  });

  revalidatePath(`/pools/${input.poolId}`);
}
