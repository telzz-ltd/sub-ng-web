"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import {
  CustomerService01Icon,
  Menu09Icon,
  Notification01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function AppHeader({ title }: { title: string }) {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="w-full flex items-center h-18 gap-4 px-5 max-w-7xl mx-auto mb-5">
      <Button size={"icon-sm"} variant="ghost" onClick={toggleSidebar}>
        <HugeiconsIcon icon={Menu09Icon} className="size-8" />
      </Button>
      <h3 className="text-h3">{title}</h3>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" className={"size-12"}>
          <HugeiconsIcon icon={CustomerService01Icon} className="size-8" />
        </Button>
        <Button variant="ghost" className="size-12">
          <HugeiconsIcon icon={Notification01Icon} className="size-8" />
        </Button>
        <Button variant="ghost" size={"icon-lg"} className={"size-12"}>
          <Avatar className="size-full">
            <AvatarFallback className={"text-lg"}>DU</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
