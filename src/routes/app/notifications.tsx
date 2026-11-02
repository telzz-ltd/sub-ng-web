import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wallet01Icon,
  ZapIcon,
  InformationCircleIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

import { AppLayout } from "@/components/app/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription } from "@/components/ui/empty";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications as initialNotifications } from "@/lib/catalog";
import type { NotificationItem } from "@/lib/types";

export const Route = createFileRoute("/app/notifications")({
  component: NotificationsPage,
});

const categoryStyles: Record<
  NotificationItem["category"],
  { icon: typeof Wallet01Icon; className: string }
> = {
  wallet: {
    icon: Wallet01Icon,
    className: "bg-emerald-50 text-emerald-600",
  },
  service: {
    icon: ZapIcon,
    className: "bg-blue-50 text-blue-600",
  },
  system: {
    icon: InformationCircleIcon,
    className: "bg-violet-50 text-violet-600",
  },
};

function NotificationsPage() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = items.filter((item) => item.unread).length;

  const visible = useMemo(
    () => (filter === "unread" ? items.filter((item) => item.unread) : items),
    [filter, items],
  );

  function markAsRead(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  }

  function markAllAsRead() {
    setItems((current) =>
      current.map((item) => ({ ...item, unread: false })),
    );
  }

  return (
    <AppLayout
      title="Notifications"
      description="Stay up to date with your wallet and service activity."
    >
      <Card className="mx-auto max-w-3xl gap-0 overflow-hidden rounded-2xl border-gray-200 py-0">
        <div className="flex items-center justify-between gap-4 border-b px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold">Inbox</h2>
            <p className="text-xs text-muted-foreground">
              {unreadCount
                ? `${unreadCount} unread`
                : "You're all caught up"}
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="shrink-0"
            >
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="size-4"
              />
              Mark all read
            </Button>
          )}
        </div>

        <CardContent className="p-0">
          <div className="border-b px-4 py-3">
            <Tabs
              value={filter}
              onValueChange={(value) =>
                setFilter(value as "all" | "unread")
              }
            >
              <TabsList>
                <TabsTrigger value="all">
                  All ({items.length})
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {visible.length === 0 ? (
            <Empty className="py-12">
              <EmptyContent>
                <EmptyDescription>
                  No notifications here
                </EmptyDescription>
              </EmptyContent>
            </Empty>
          ) : (
            <div>
              {visible.map((item) => {
                const style = categoryStyles[item.category];

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => markAsRead(item.id)}
                    className={`flex w-full gap-3 border-b border-gray-100 px-4 py-4 text-left transition-colors last:border-0 hover:bg-muted/50 ${item.unread ? "bg-blue-50/40" : ""
                      }`}
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full ${style.className}`}
                    >
                      <HugeiconsIcon
                        icon={style.icon}
                        className="size-5"
                      />
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

                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {item.description}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </AppLayout>
  );
}