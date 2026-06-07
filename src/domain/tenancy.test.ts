import { describe, expect, it } from "vitest";

import { assertPoolMembership, canManagePool } from "./tenancy";

describe("pool tenancy", () => {
  const memberships = [
    { poolId: "pool-a", role: "admin" as const },
    { poolId: "pool-b", role: "member" as const },
  ];

  it("allows a user to access pools where they are a member", () => {
    expect(assertPoolMembership(memberships, "pool-b")).toEqual({
      poolId: "pool-b",
      role: "member",
    });
  });

  it("rejects access to pools outside the user's memberships", () => {
    expect(() => assertPoolMembership(memberships, "pool-c")).toThrow(
      "User is not a member of this pool",
    );
  });

  it("allows only admins to manage a pool", () => {
    expect(canManagePool(memberships, "pool-a")).toBe(true);
    expect(canManagePool(memberships, "pool-b")).toBe(false);
  });
});
