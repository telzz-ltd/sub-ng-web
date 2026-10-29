
import { useState } from "react";
import {
    BellOutlined,
    CheckOutlined,
    WalletOutlined,
    ThunderboltOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Flex, Typography } from "antd";

const initialNotifications = [
    {
        id: 1,
        title: "Wallet funded successfully",
        description: "Your wallet has been credited with ₦5,000.00.",
        time: "5 min ago",
        icon: <WalletOutlined />,
        color: "text-emerald-600",
        background: "bg-emerald-50",
        unread: true,
    },
    {
        id: 2,
        title: "Data purchase successful",
        description: "Your 10GB MTN data bundle is now active.",
        time: "1 hour ago",
        icon: <ThunderboltOutlined />,
        color: "text-blue-600",
        background: "bg-blue-50",
        unread: true,
    },
    {
        id: 3,
        title: "Welcome to Subs.NG",
        description: "You can now buy airtime, data and pay bills.",
        time: "Yesterday",
        icon: <InfoCircleOutlined />,
        color: "text-violet-600",
        background: "bg-violet-50",
        unread: false,
    },
];

export function NotificationMenu() {
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter((item) => item.unread).length;

    function markAllAsRead() {
        setNotifications((items) =>
            items.map((item) => ({ ...item, unread: false })),
        );
    }

    const menu = (
        <div className="w-[340px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
            <Flex
                align="center"
                justify="space-between"
                className="border-b border-gray-100 px-4 py-3"
            >
                <div>
                    <Typography.Text strong className="text-base!">
                        Notifications
                    </Typography.Text>
                    <Typography.Text type="secondary" className="block text-xs!">
                        {unreadCount
                            ? `${unreadCount} unread notifications`
                            : "You're all caught up"}
                    </Typography.Text>
                </div>

                {unreadCount > 0 && (
                    <Button
                        type="text"
                        size="small"
                        icon={<CheckOutlined />}
                        onClick={markAllAsRead}
                        className="!text-xs"
                    >
                        Mark all read
                    </Button>
                )}
            </Flex>

            <div className="max-h-[360px] overflow-y-auto">
                {notifications.length ? (
                    notifications.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                                setNotifications((items) =>
                                    items.map((notification) =>
                                        notification.id === item.id
                                            ? { ...notification, unread: false }
                                            : notification,
                                    ),
                                )
                            }
                            className={`flex w-full gap-3 border-b border-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${item.unread ? "bg-blue-50/40" : "bg-white"
                                }`}
                        >
                            <div
                                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${item.background} ${item.color}`}
                            >
                                {item.icon}
                            </div>

                            <div className="min-w-0 flex-1">
                                <Flex align="start" justify="between" gap={2}>
                                    <Typography.Text
                                        strong={item.unread}
                                        className="text-sm!"
                                    >
                                        {item.title}
                                    </Typography.Text>

                                    {item.unread && (
                                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-blue-600" />
                                    )}
                                </Flex>

                                <Typography.Paragraph
                                    type="secondary"
                                    className="mb-1! mt-0.5! text-xs!"
                                >
                                    {item.description}
                                </Typography.Paragraph>

                                <Typography.Text type="secondary" className="text-[11px]!">
                                    {item.time}
                                </Typography.Text>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="px-4 py-10 text-center">
                        <BellOutlined className="mb-2 text-2xl! text-gray-300!" />
                        <Typography.Text type="secondary" className="block text-sm!">
                            No notifications yet
                        </Typography.Text>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-100 p-2">
                <Button
                    type="text"
                    block
                    onClick={() => {
                        // TODO: Navigate to the notifications page.
                    }}
                    className="!text-sm"
                >
                    View all notifications
                </Button>
            </div>
        </div>
    );

    return (
        <Dropdown
            popupRender={() => menu}
            trigger={["click"]}
            placement="bottomRight"
        >
            <Badge count={unreadCount} size="small" offset={[-3, 3]}>
                <Button
                    shape="circle"
                    type="text"
                    aria-label="Notifications"
                    icon={<BellOutlined className="text-xl! text-gray-600!" />}
                />
            </Badge>
        </Dropdown>
    );
}
