import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Empty, Flex, Segmented, Typography } from "antd";
import {
  CheckOutlined,
  InfoCircleOutlined,
  ThunderboltOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import { AppLayout } from "@/components/app/layout";
import { notifications as initialNotifications } from "@/lib/catalog";
import type { NotificationItem } from "@/lib/types";

export const Route = createFileRoute("/app/notifications")({
  component: NotificationsPage,
});

const { Text } = Typography;

const categoryStyles: Record<
  NotificationItem["category"],
  { icon: typeof WalletOutlined; className: string }
> = {
  wallet: {
    icon: WalletOutlined,
    className: "bg-emerald-50 text-emerald-600",
  },
  service: {
    icon: ThunderboltOutlined,
    className: "bg-blue-50 text-blue-600",
  },
  system: {
    icon: InfoCircleOutlined,
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

  return (
    <AppLayout
      title="Notifications"
      description="Stay up to date with your wallet and service activity."
    >
      <Card
        className="mx-auto max-w-3xl rounded-2xl border-gray-200"
        styles={{ body: { padding: 0 } }}
        title={
          <div className="py-1">
            <Text strong className="block text-base">
              Inbox
            </Text>
            <Text type="secondary" className="text-xs font-normal">
              {unreadCount ? `${unreadCount} unread` : "You're all caught up"}
            </Text>
          </div>
        }
        extra={
          unreadCount > 0 && (
            <Button
              type="link"
              icon={<CheckOutlined />}
              onClick={() =>
                setItems((current) =>
                  current.map((item) => ({ ...item, unread: false })),
                )
              }
            >
              Mark all read
            </Button>
          )
        }
      >
        <div className="border-b border-gray-100 p-4">
          <Segmented
            value={filter}
            onChange={(value) => setFilter(value as "all" | "unread")}
            options={[
              { label: `All (${items.length})`, value: "all" },
              { label: `Unread (${unreadCount})`, value: "unread" },
            ]}
          />
        </div>

        {visible.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications here"
            className="py-12"
          />
        ) : (
          <div>
            {visible.map((item) => {
              const style = categoryStyles[item.category];
              const Icon = style.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markAsRead(item.id)}
                  className={`flex w-full gap-3 border-b border-gray-50 px-4 py-4 text-left transition-colors last:border-0 hover:bg-gray-50 ${
                    item.unread ? "bg-blue-50/40" : "bg-white"
                  }`}
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg ${style.className}`}
                  >
                    <Icon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Flex align="start" justify="space-between" gap={8}>
                      <Text strong={item.unread} className="text-sm!">
                        {item.title}
                      </Text>

                      {item.unread && (
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </Flex>

                    <Text type="secondary" className="mt-0.5 block text-sm">
                      {item.description}
                    </Text>

                    <Text type="secondary" className="mt-1 block text-xs">
                      {item.time}
                    </Text>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </AppLayout>
  );
}
