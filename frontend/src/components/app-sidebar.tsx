"use client";

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
} from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="z-40 mt-24.5">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Каталог
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Grid2X2 className="size-5" />
                <span>Все товары</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Shirt className="size-5" />
                <span>Одежда</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Footprints className="size-5" />
                <span>Обувь</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Watch className="size-5" />
                <span>Аксессуары</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Smartphone className="size-5" />
                <span>Электроника</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Sparkles className="size-5" />
                <span>Новинки</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Percent className="size-5" />
                <span>Скидки</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Мои покупки
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Heart className="size-5" />
                <span>Избранное</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <ShoppingBag className="size-5" />
                <span>Корзина</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Package className="size-5" />
                <span>Мои заказы</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Аккаунт
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <UserRound className="size-5" />
                <span>Личный кабинет</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <MapPin className="size-5" />
                <span>Адреса доставки</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            Информация
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <CircleHelp className="size-5" />
                <span>Помощь и поддержка</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="text-base">
                <Info className="size-5" />
                <span>О Velora</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-base">
              <LogIn className="size-5" />
              <span>Войти в аккаунт</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <p className="px-2 text-sm text-neutral-400">
          © 2026 Velora
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
