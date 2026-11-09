import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";

import { getCookieHeader } from "./session";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? "http://localhost:3100";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
};

/**
 * Текущий пользователь или null.
 * Только чтение — куки не пишет, поэтому безопасно в Server Components.
 */
export const getSession = cache(async (): Promise<AuthUser | null> => {
  const cookie = await getCookieHeader();

  if (!cookie) {
    return null;
  }

  const response = await fetch(`${AUTH_SERVICE_URL}/user/me`, {
    headers: { cookie },
    cache: "no-store",
  });

  // 401/403 — это «не авторизован», а не сбой приложения.
  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Auth service responded with ${response.status}`);
  }

  return (await response.json()) as AuthUser;
});

/** Для страниц: без сессии уводит на вход. */
export async function requireSession(next = "/"): Promise<AuthUser> {
  const user = await getSession();

  if (!user) {
    redirect(`/auth/sign-in?next=${encodeURIComponent(next)}`);
  }

  return user;
}
