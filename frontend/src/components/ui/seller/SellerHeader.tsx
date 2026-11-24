
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChartNoAxesCombined,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingCart,
  Store,
  Wallet,
} from "lucide-react";
import { logout } from "@/app/actions/auth";

const navigation = [
  {
    title: "Главная",
    href: "/seller",
    icon: LayoutDashboard,
  },
  {
    title: "Товары",
    href: "/seller/products",
    icon: Package,
  },
  {
    title: "Заказы",
    href: "/seller/orders",
    icon: ShoppingCart,
  },
  {
    title: "Продажи",
    href: "/seller/sales",
    icon: Wallet,
  },
  {
    title: "Аналитика",
    href: "/seller/analytics",
    icon: ChartNoAxesCombined,
  },
];

export default function SellerHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-6 px-5 lg:px-8">

        <Link
          href="/seller"
          className="shrink-0 text-2xl font-black tracking-[0.18em] text-black"
        >
          VELORA-PARTNERS
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navigation.map(({ title, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
            >
              <Icon size={19} strokeWidth={1.8} />
              {title}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">

          <button className="relative flex size-10 items-center justify-center rounded-full text-neutral-600 transition hover:bg-neutral-100 hover:text-black">
            <Bell size={22} strokeWidth={1.7} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-9 w-px bg-neutral-200 sm:block" />

          <Link
            href="/"
            className="hidden items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-black sm:flex"
          >
            <Store size={21} strokeWidth={1.7} />
            <span>Вернуться в магазин</span>
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="flex size-10 items-center justify-center rounded-full text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
              title="Выйти"
            >
              <LogOut size={21} strokeWidth={1.7} />
            </button>
          </form>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-neutral-100 px-3 py-2 xl:hidden">
        {navigation.map(({ title, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
          >
            <Icon size={18} />
            {title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
