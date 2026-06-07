export type PoolMembershipRole = "admin" | "member";

export type PoolMembershipSummary = {
  poolId: string;
  role: PoolMembershipRole;
};

export function assertPoolMembership(
  memberships: PoolMembershipSummary[],
  poolId: string,
) {
  const membership = memberships.find((item) => item.poolId === poolId);

  if (!membership) {
    throw new Error("User is not a member of this pool");
  }

  return membership;
}

export function canManagePool(
  memberships: PoolMembershipSummary[],
  poolId: string,
) {
  return assertPoolMembership(memberships, poolId).role === "admin";
}
