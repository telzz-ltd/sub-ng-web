"use client";

import { Avatar, Button } from "@heroui/react";
import {
  CustomerService01Icon,
  Menu09FreeIcons,
  Notification01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { PropsWithChildren } from "react";
import { AppSidebar } from "../../components/app/app-sidebar";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex bg-mist-50">
      <AppSidebar />
      <main className="grow px-5 w-full max-w-8xl mx-auto">
        <header className="flex items-center h-18 gap-4 mb-5">
          <Button isIconOnly variant="ghost" className="md:hidden">
            <HugeiconsIcon icon={Menu09FreeIcons} className="size-8" />
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" className={"size-12"}>
              <HugeiconsIcon icon={CustomerService01Icon} className="size-8" />
            </Button>
            <Button variant="ghost" className="size-12">
              <HugeiconsIcon icon={Notification01Icon} className="size-8" />
            </Button>
            <Button variant="ghost" isIconOnly className={"size-12"}>
              <Avatar className="size-full">
                <Avatar.Fallback className={"text-lg"}>DU</Avatar.Fallback>
              </Avatar>
            </Button>
          </div>
        </header>
        <div className="space-y-6">{children}</div>
      </main>
      <footer className="py-16"></footer>
    </div>
  );
}
