"use client";

import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarBackdrop() {
  const { open, openMobile, isMobile, setOpen, setOpenMobile } = useSidebar();
  const isOpen = isMobile ? openMobile : open;

  useEffect(() => {
    if (!isOpen || isMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isMobile]);

  if (!isOpen || isMobile) return null;

  return (
    <div
      data-slot="sidebar-backdrop"
      aria-hidden="true"
      onClick={() => (isMobile ? setOpenMobile(false) : setOpen(false))}
      className="fixed inset-0 z-[5] bg-black/20"
    />
  );
}
