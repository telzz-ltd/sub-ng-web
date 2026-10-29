
import {
    CustomerServiceOutlined,
    MessageOutlined,
    QuestionCircleOutlined,
    MailOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Typography } from "antd";

const supportOptions = [
    {
        key: "chat",
        icon: <MessageOutlined />,
        title: "Live support",
        description: "Get help from our support team",
        href: "https://wa.me/2348000000000",
    },
    {
        key: "faq",
        icon: <QuestionCircleOutlined />,
        title: "FAQs",
        description: "Find answers to common questions",
        href: "/help",
    },
    {
        key: "email",
        icon: <MailOutlined />,
        title: "Email us",
        description: "support@subs.ng",
        href: "mailto:support@subs.ng",
    },
];

export function SupportMenu() {
    const menu = (
        <div className="w-[320px] max-w-[calc(100vw-32px)] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-4 py-4">
                <Typography.Text strong className="text-base!">
                    How can we help?
                </Typography.Text>
                <Typography.Text type="secondary" className="mt-1 block text-xs!">
                    Find support for your account and transactions.
                </Typography.Text>
            </div>

            <div className="p-2">
                {supportOptions.map((option) => (
                    <a
                        key={option.key}
                        href={option.href}
                        target={option.href.startsWith("https://") ? "_blank" : undefined}
                        rel={
                            option.href.startsWith("https://")
                                ? "noopener noreferrer"
                                : undefined
                        }
                        className="flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-50"
                    >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                            {option.icon}
                        </div>

                        <div className="min-w-0 flex-1">
                            <Typography.Text strong className="block text-sm!">
                                {option.title}
                            </Typography.Text>
                            <Typography.Text
                                type="secondary"
                                className="block truncate text-xs!"
                            >
                                {option.description}
                            </Typography.Text>
                        </div>

                        <RightOutlined className="text-xs! text-gray-400!" />
                    </a>
                ))}
            </div>

            <div className="border-t border-gray-100 bg-gray-50/70 px-4 py-3">
                <Flex align="center" gap={2}>
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <Typography.Text type="secondary" className="text-xs!">
                        Need help with a transaction? Include your reference number.
                    </Typography.Text>
                </Flex>
            </div>
        </div>
    );

    return (
        <Dropdown
            popupRender={() => menu}
            trigger={["click"]}
            placement="bottomRight"
        >
            <Button
                shape="circle"
                type="text"
                aria-label="Customer support"
                icon={
                    <CustomerServiceOutlined className="text-xl! text-gray-600!" />
                }
            />
        </Dropdown>
    );
}
