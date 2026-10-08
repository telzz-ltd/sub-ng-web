"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { CSSProperties, PropsWithChildren } from "react";
import { AppHeader } from "./components/app-header";
import { appHeadings } from "./components/app-headings";
import { AppSidebar } from "./components/app-sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as CSSProperties
      }
    >
      <AppSidebar />
      <div className="min-h-screen flex flex-col w-full">
        <AppHeader title={appHeadings[pathname]} />
        <main className="grow px-5 w-full max-w-7xl mx-auto">{children}</main>
        <footer className="py-16"></footer>
      </div>
    </SidebarProvider>
  );
}
