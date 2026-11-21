import Link from "next/link";
import {
  Heart,
  LogOut,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Input } from "./input";
import { logout } from "@/app/actions/auth";
import { cookies } from "next/headers";
import { SidebarMenuButton } from "./sidebar-menu-button";

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  return (
    <header className="relative z-20 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:h-24 lg:flex-nowrap lg:gap-10 lg:py-0">
        <div className="flex shrink-0 items-center gap-3 justify-between w-full sm:w-auto">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-[0.2em] text-black sm:text-2xl"
          >
            VELORA
          </Link>

          <SidebarMenuButton />
        </div>

        <div className="relative order-3 w-full  lg:order-none lg:max-w-5xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Найти на Velora"
            className="h-11 w-full rounded-full border-neutral-200 bg-neutral-50 pl-12 text-sm shadow-none focus-visible:ring-black sm:h-12 sm:text-base"
          />
        </div>

        <div className="hidden sm:flex shrink-0 items-center gap-4 sm:gap-6 lg:gap-7">
          {token ? (
            <>
              <button
                className="flex cursor-pointer flex-col items-center text-neutral-700 transition hover:text-black"
                onClick={logout}
              >
                <LogOut
                  size={26}
                  strokeWidth={1.7}
                  className="sm:size-[30px]"
                />
                <span className="hidden text-sm sm:block">Выйти</span>
              </button>

              <Link
                href="/cart"
                className="flex flex-col items-center text-neutral-700 transition hover:text-black"
              >
                <Heart size={26} strokeWidth={1.7} className="sm:size-[30px]" />
                <span className="hidden text-sm sm:block">Избранное</span>
              </Link>
            </>
          ) : (
            <Link
              href="/auth/sign-in"
              className="flex flex-col items-center text-neutral-700 transition hover:text-black"
            >
              <UserRound
                size={26}
                strokeWidth={1.7}
                className="sm:size-[30px]"
              />
              <span className="hidden text-sm sm:block">Войти</span>
            </Link>
          )}

          <Link
            href="/cart"
            className="flex flex-col items-center text-neutral-700 transition hover:text-black"
          >
            <ShoppingBag
              size={26}
              strokeWidth={1.7}
              className="sm:size-[30px]"
            />
            <span className="hidden text-sm sm:block">Корзина</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
