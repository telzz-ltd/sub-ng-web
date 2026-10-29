
import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Typography, message } from "antd";
import type { MenuProps } from "antd";

const user = {
    name: "Usman Muhammad",
    email: "usman@example.com",
    initials: "UM",
};

export function UserMenu() {
    const [messageApi, contextHolder] = message.useMessage();

    const items: MenuProps["items"] = [
        {
            key: "profile",
            icon: <UserOutlined />,
            label: "My profile",
            onClick: () => {
                // TODO: Navigate to the profile page.
            },
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Account settings",
            onClick: () => {
                // TODO: Navigate to account settings.
            },
        },
        {
            key: "security",
            icon: <SafetyCertificateOutlined />,
            label: "Security",
            onClick: () => {
                // TODO: Navigate to security settings.
            },
        },
        { type: "divider" },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            danger: true,
            label: "Sign out",
            onClick: () => {
                messageApi.info("Connect this action to your logout flow.");
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
                                    {user.initials}
                                </Avatar>

                                <div className="min-w-0">
                                    <Typography.Text strong className="block truncate text-sm!">
                                        {user.name}
                                    </Typography.Text>
                                    <Typography.Text
                                        type="secondary"
                                        className="block truncate text-xs!"
                                    >
                                        {user.email}
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
                    <Avatar
                        size={34}
                        className="!bg-gray-100 !text-gray-600"
                        icon={<UserOutlined />}
                    />
                </Button>
            </Dropdown>
        </>
    );
}
