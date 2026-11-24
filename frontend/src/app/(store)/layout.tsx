import { Suspense } from "react";
import Header from "@/components/ui/header";
import { SidebarBackdrop } from "@/components/ui/sidebar-backdrop";
import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HeaderSkeleton } from "@/components/skeletons/HeaderSkeleton";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex flex-col" defaultOpen={false}>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <SidebarBackdrop />
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
