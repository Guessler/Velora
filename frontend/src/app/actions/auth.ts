"use server";

import { redirect } from "next/navigation";
import {
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/definitions";
import {
  createSession,
  deleteSession,
  getRefreshToken,
} from "@/lib/session";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? "http://localhost:3100";

export async function signup(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        message: Array.isArray(data?.message)
          ? data.message.join(", ")
          : (data?.message ?? "Ошибка при регистрации"),
      };
    }
  } catch {
    return { message: "Сервер недоступен. Попробуйте позже." };
  }

  redirect("/auth/sign-in");
}

export async function signin(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message;

      return {
        message:
          response.status === 401
            ? "Неверный email или пароль"
            : response.status === 429
              ? "Слишком много попыток. Попробуйте через минуту"
              : (message ?? "Не удалось войти"),
      };
    }

    if (
      !data?.accessToken ||
      !data?.refreshToken ||
      typeof data.expiresIn !== "number"
    ) {
      return { message: "Некорректный ответ Auth Service" };
    }

    await createSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
    });
  } catch {
    return { message: "Сервер недоступен. Попробуйте позже." };
  }

  redirect("/");
}

export async function logout(): Promise<void> {
  const refreshToken = await getRefreshToken();

  if (refreshToken) {
    await fetch(`${AUTH_SERVICE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }).catch(() => undefined);
  }

  await deleteSession();
  redirect("/auth/sign-in");
}
