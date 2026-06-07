import { describe, expect, it } from "vitest";

import { validateSyncSecret } from "./sync-auth";

describe("validateSyncSecret", () => {
  it("fails closed when the sync secret is not configured", () => {
    expect(
      validateSyncSecret({
        configuredSecret: undefined,
        providedSecret: "anything",
      }),
    ).toEqual({
      ok: false,
      status: 503,
      error: "Sync secret is not configured",
    });
  });

  it("rejects requests with the wrong secret", () => {
    expect(
      validateSyncSecret({
        configuredSecret: "expected",
        providedSecret: "wrong",
      }),
    ).toEqual({
      ok: false,
      status: 401,
      error: "Unauthorized",
    });
  });

  it("accepts requests with the configured secret", () => {
    expect(
      validateSyncSecret({
        configuredSecret: "expected",
        providedSecret: "expected",
      }),
    ).toEqual({ ok: true });
  });
});
