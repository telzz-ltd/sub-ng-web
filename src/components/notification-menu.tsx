import {
  BellIcon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
  Wallet01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { notifications as initialNotifications } from "@/lib/catalog";
import type { NotificationItem } from "@/lib/types";

const categoryStyles: Record<
  NotificationItem["category"],
  { icon: typeof BellIcon; color: string; background: string }
> = {
  wallet: {
    icon: Wallet01Icon,
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
  service: {
    icon: ZapIcon,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  system: {
    icon: InformationCircleIcon,
    color: "text-violet-600",
    background: "bg-violet-50",
  },
};

export function NotificationMenu() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((item) => item.unread).length;

  function markAsRead(id: string) {
    setNotifications((items) =>
      items.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  }

  function markAllAsRead() {
    setNotifications((items) =>
      items.map((item) => ({ ...item, unread: false })),
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Notifications"
        className="size-10 hover:bg-white flex items-center justify-center rounded-full relative"
      >
        <HugeiconsIcon
          icon={BellIcon}
          className="size-7 text-muted-foreground"
        />

        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-4 font-semibold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-85 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl p-0"
      >
        <div className="flex items-center justify-between gap-2 border-b px-4 py-3">
          <div>
            <p className="text-base font-semibold">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount
                ? `${unreadCount} unread notifications`
                : "You're all caught up"}
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 gap-1.5 px-2 text-xs"
            >
              <HugeiconsIcon
                icon={CheckmarkCircle01Icon}
                className="size-4"
              />
              Mark all read
            </Button>
          )}
        </div>

        <div className="max-h-90 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((item) => {
              const style = categoryStyles[item.category];

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markAsRead(item.id)}
                  className={`flex w-full gap-3 border-b border-border/50 px-4 py-3 text-left transition-colors hover:bg-muted/60 ${item.unread ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                    }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${style.background} ${style.color}`}
                  >
                    <HugeiconsIcon icon={style.icon} className="size-4.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm ${item.unread ? "font-semibold" : "font-medium"
                          }`}
                      >
                        {item.title}
                      </p>

                      {item.unread && (
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </div>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.description}
                    </p>

                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {item.time}
                    </p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-10 text-center">
              <HugeiconsIcon
                icon={BellIcon}
                className="mx-auto mb-2 size-7 text-muted-foreground/40"
              />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          )}
        </div>

        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-sm"
            onClick={() => void navigate({ to: "/app/notifications" })}
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}