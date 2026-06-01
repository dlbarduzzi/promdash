type Result<S, E extends { reason: string }> =
  | { ok: true, data: S }
  | { ok: false, error: E }

function ok<S>(s: S): Result<S, never> {
  return { ok: true, data: s }
}

function err<const R extends string, E extends { reason: R }>(e: E): Result<never, E> {
  return { ok: false, error: e }
}

export const result = { ok, err }
