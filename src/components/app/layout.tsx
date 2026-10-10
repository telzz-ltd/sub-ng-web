"use client";

import { AppSidebar } from "@/components/app/sidebar";
import { useAuth } from "@/components/provider";
import { Avatar, Button, Typography } from "@heroui/react";
import { PropsWithChildren, useState } from "react";
import { BiSupport } from "react-icons/bi";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { PullToRefresh } from "../ui/pull-to-refresh";

type AppLayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
  onRefresh?: () => Promise<void>;
}>;

export function AppLayout({
  children,
  title,
  description,
  onRefresh,
}: AppLayoutProps) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="flex bg-mist-50">
      <AppSidebar open={open} onClose={() => setOpen(!open)} />
      <PullToRefresh
        onRefresh={onRefresh as any}
        // disabled={!!onRefresh}
        className="grow px-3 md:px-5 w-full max-w-8xl mx-auto"
      >
        <header className="flex items-center h-18 gap-4 md:mb-5">
          <div className="space-x-4 flex items-center">
            <Button
              isIconOnly
              variant="ghost"
              className="md:hidden"
              onClick={() => setOpen(true)}
            >
              <HiMenuAlt4 className="size-8" />
            </Button>
            <h3 className="text-lg hidden md:block">
              Welcome, {user?.name.split(" ")[0]}
            </h3>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" className={"size-12"}>
              <BiSupport className="size-8" />
            </Button>
            <Button variant="ghost" className="size-12">
              <IoNotificationsOutline className="size-8" />
            </Button>
            <Button variant="ghost" isIconOnly className={"size-12"}>
              <Avatar className="size-full">
                <Avatar.Fallback className={"text-lg"}>DU</Avatar.Fallback>
              </Avatar>
            </Button>
          </div>
        </header>
        <div className="mb-4">
          <Typography.Heading level={2} className="text-h3 font-black">
            {title}
          </Typography.Heading>
          <Typography.Paragraph className="text-muted">
            {description}
          </Typography.Paragraph>
        </div>
        <div className="space-y-6">{children}</div>
      </PullToRefresh>
      <footer className="py-16"></footer>
    </div>
  );
}
