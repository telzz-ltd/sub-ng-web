
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Typography, message } from "antd";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/components/provider";
import type { MenuProps } from "antd";

function getInitials(name: string) {
    return name
        .split(" ")
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export function UserMenu() {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const { user } = useAuth();

    const name = user?.name ?? "Guest";
    const email = user?.email ?? "";

    const items: MenuProps["items"] = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "My profile",
            onClick: () => {
                void navigate({ to: "/app/settings" });
            },
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Account settings",
            onClick: () => {
                void navigate({ to: "/app/settings" });
            },
        },
        {
            key: "security",
            icon: <SafetyCertificateOutlined />,
            label: "Security",
            onClick: () => {
                void navigate({ to: "/app/settings" });
            },
        },
        { type: "divider" },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            danger: true,
            label: "Sign out",
            onClick: () => {
                messageApi.success("Signed out");
                void navigate({ to: "/login" });
            },
        },
    ];

    return (
        <>
            {contextHolder}

            <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                menu={{ items }}
                popupRender={(menu) => (
                    <div className="w-[260px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                        <div className="border-b border-gray-100 px-4 py-4">
                            <Flex align="center" gap={3}>
                                <Avatar
                                    size={44}
                                    className="!bg-blue-100 !text-blue-700"
                                >
                                    {getInitials(name)}
                                </Avatar>

                                <div className="min-w-0">
                                    <Typography.Text strong className="block truncate text-sm!">
                                        {name}
                                    </Typography.Text>
                                    <Typography.Text
                                        type="secondary"
                                        className="block truncate text-xs!"
                                    >
                                        {email}
                                    </Typography.Text>
                                </div>
                            </Flex>
                        </div>

                        <div className="p-1.5">{menu}</div>
                    </div>
                )}
            >
                <Button
                    type="text"
                    shape="circle"
                    aria-label="Open user menu"
                    className="!flex !h-9 !w-9 !items-center !justify-center !p-0"
                >
                    <Avatar size={34} className="!bg-blue-100 !text-blue-700">
                        {getInitials(name)}
                    </Avatar>
                </Button>
            </Dropdown>
        </>
    );
}
