"use client";

import { Card } from "../ui/card";
import { Aurora } from "@/components/ui/aurora";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/actions/auth";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <Aurora className="min-h-screen w-full flex items-center justify-center bg-neutral-950 px-0 py-0 sm:px-6 sm:py-10">
      <div className="w-full max-w-6xl mx-auto">
        <Card className="w-full rounded-none border-0 bg-transparent shadow-none p-5 backdrop-blur-0 sm:rounded-3xl sm:border sm:border-white/20 sm:bg-white/[0.07] sm:shadow-[0_8px_60px_rgba(0,0,0,0.3)] sm:p-10 sm:backdrop-blur-2xl md:p-14">
          <div className="sm:mb-10 space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Зарегистрироваться
            </h1>

            <p className="text-base sm:text-lg text-white/50">
              Хороший выбор начинается с первого шага
            </p>
          </div>

          <form action={action} className="flex flex-col gap-5">
            <Input
              placeholder="Логин"
              id="name"
              name="name"
              autoComplete="name"
              disabled={pending}
              className="h-14 px-4 sm:px-5 text-lg text-white placeholder:text-white/40 bg-white/[0.06] border-white/15 rounded-lg sm:rounded-xl focus-visible:ring-white/30"
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-400/90 px-1 -mt-3">
                {state.errors.name.join(", ")}
              </p>
            )}
            <Input
              placeholder="Почта"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              disabled={pending}
              className="h-14 px-4 sm:px-5 text-lg text-white placeholder:text-white/40 bg-white/[0.06] border-white/15 rounded-lg sm:rounded-xl focus-visible:ring-white/30"
            />
            {state?.errors?.email && (
              <p className="text-sm text-red-400/90 px-1 -mt-3">
                {state.errors.email.join(", ")}
              </p>
            )}
            <Input
              placeholder="Пароль"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              disabled={pending}
              className="h-14 px-4 sm:px-5 text-lg text-white placeholder:text-white/40 bg-white/[0.06] border-white/15 rounded-lg sm:rounded-xl focus-visible:ring-white/30"
            />
            {state?.errors?.password && (
              <div>
                <p className="text-sm text-red-400/90 px-1 -mt-3">
                  Password must:
                </p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li
                      className="text-sm text-red-400/90 px-1 -mt-3"
                      key={error}
                    >
                      - {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {state?.message && (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm leading-relaxed text-white/80"
              >
                {state.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="w-full cursor-pointer h-14 mt-2 rounded-xl bg-white text-black hover:bg-white/85 text-lg font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Создаём аккаунт…" : "Создать аккаунт"}
            </Button>

            <div className="flex items-center gap-5 py-3">
              <div className="h-px flex-1 bg-white/15" />
              <span className="text-sm tracking-widest text-white/40">ИЛИ</span>
              <div className="h-px flex-1 bg-white/15" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer h-14 rounded-xl border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.1] hover:text-white text-lg transition-all"
            >
              Продолжить с Google
            </Button>

            <p className="text-center text-base text-white/50 mt-5">
              Уже есть аккаунт?{" "}
              <Link
                href="/auth/sign-in"
                className="text-white font-semibold hover:underline underline-offset-4"
              >
                Войти
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </Aurora>
  );
}
