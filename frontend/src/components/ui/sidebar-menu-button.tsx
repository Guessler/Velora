"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarMenuButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label="Открыть/закрыть меню"
      className="cursor-pointer rounded-xl border border-black/20 p-2 text-black lg:text-2xl"
    >
      <Menu />
    </button>
  );
}