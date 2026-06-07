type SyncSecretInput = {
  configuredSecret?: string;
  providedSecret: string | null;
};

export function validateSyncSecret({
  configuredSecret,
  providedSecret,
}: SyncSecretInput) {
  if (!configuredSecret) {
    return { ok: false as const, status: 503, error: "Sync secret is not configured" };
  }

  if (providedSecret !== configuredSecret) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  return { ok: true as const };
}
