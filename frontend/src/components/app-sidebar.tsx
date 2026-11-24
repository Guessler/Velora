"use client";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Grid2X2,
  Shirt,
  Footprints,
  Watch,
  Smartphone,
  Heart,
  ShoppingBag,
  Package,
  UserRound,
  MapPin,
  CircleHelp,
  Info,
  Percent,
  Sparkles,
  LogIn,
  Store,
} from "lucide-react";

export default function AppSidebar() {
  return (
    <Sidebar className="z-40 mt-24.5">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Каталог
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/catalog" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Grid2X2 className="size-5 shrink-0" />
                  <span>Все товары</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/catalog/clothing" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Shirt className="size-5 shrink-0" />
                  <span>Одежда</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/catalog/shoes" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Footprints className="size-5 shrink-0" />
                  <span>Обувь</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link
                href="/catalog/accessories"
                className="block cursor-pointer"
              >
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Watch className="size-5 shrink-0" />
                  <span>Аксессуары</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link
                href="/catalog/electronics"
                className="block cursor-pointer"
              >
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Smartphone className="size-5 shrink-0" />
                  <span>Электроника</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/new" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Sparkles className="size-5 shrink-0" />
                  <span>Новинки</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/discounts" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Percent className="size-5 shrink-0" />
                  <span>Скидки</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Мои покупки
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/favorites" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Heart className="size-5 shrink-0" />
                  <span>Избранное</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/cart" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <ShoppingBag className="size-5 shrink-0" />
                  <span>Корзина</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/orders" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Package className="size-5 shrink-0" />
                  <span>Мои заказы</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Аккаунт
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/profile" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <UserRound className="size-5 shrink-0" />
                  <span>Личный кабинет</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/profile/addresses" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <MapPin className="size-5 shrink-0" />
                  <span>Адреса доставки</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Для продавцов
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/seller/request" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Store className="size-5 shrink-0" />
                  <span>Как стать продавцом?</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/seller" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Store className="size-5 shrink-0" />
                  <span>Панель продавца</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Информация
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/information/support" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <CircleHelp className="size-5 shrink-0" />
                  <span>Помощь и поддержка</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/information/about" className="block cursor-pointer">
                <SidebarMenuButton className="w-full cursor-pointer text-base">
                  <Info className="size-5 shrink-0" />
                  <span>О Velora</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/login" className="block cursor-pointer">
              <SidebarMenuButton className="w-full cursor-pointer text-base">
                <LogIn className="size-5 shrink-0" />
                <span>Войти в аккаунт</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        <p className="px-2 text-sm text-neutral-400">© 2026 Velora</p>
      </SidebarFooter>
    </Sidebar>
  );
}
