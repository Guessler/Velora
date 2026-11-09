import "server-only";
import { cookies } from "next/headers";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? "http://localhost:3100";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60;

// Набор из доков: HttpOnly + Secure + SameSite + Max-Age + Path.
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function createSession(tokens: AuthTokens) {
  const store = await cookies();

  store.set(ACCESS_COOKIE, tokens.accessToken, {
    ...cookieOptions,
    maxAge: tokens.expiresIn,
  });

  store.set(REFRESH_COOKIE, tokens.refreshToken, {
    ...cookieOptions,
    maxAge: REFRESH_MAX_AGE,
  });
}

export async function deleteSession() {
  const store = await cookies();

  store.delete({ name: ACCESS_COOKIE, path: "/" });
  store.delete({ name: REFRESH_COOKIE, path: "/" });
}

export async function getRefreshToken() {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
}

export async function getCookieHeader() {
  return (await cookies()).toString();
}

/**
 * Обновляет пару токенов и перезаписывает куки.
 * Только Server Action или Route Handler: в Server Component cookies().set() запрещён.
 */
export async function refreshSession(): Promise<boolean> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) {
      // 401 — токен мёртв, чистим. 500/сеть не трогаем, иначе разлогин при сбое сервиса.
      if (response.status === 401) {
        await deleteSession();
      }
      return false;
    }

    const tokens = (await response.json()) as AuthTokens;

    if (!tokens?.accessToken || !tokens.refreshToken) {
      return false;
    }

    await createSession(tokens);
    return true;
  } catch {
    return false;
  }
}
