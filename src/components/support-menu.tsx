import {
    ArrowRight01Icon,
    HeadphonesIcon,
    HelpCircleIcon,
    Mail01Icon,
    Message01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const supportOptions = [
    {
        key: "chat",
        icon: Message01Icon,
        title: "Live support",
        description: "Get help from our support team",
        href: "https://wa.me/2348000000000",
    },
    {
        key: "faq",
        icon: HelpCircleIcon,
        title: "Help center",
        description: "Find answers to common questions",
        href: "/app/support",
    },
    {
        key: "email",
        icon: Mail01Icon,
        title: "Email us",
        description: "support@subs.ng",
        href: "mailto:support@subs.ng",
    },
];

export function SupportMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                aria-label="Customer support"
                className="size-10 hover:bg-white flex items-center justify-center rounded-full"
            >
                <HugeiconsIcon
                    icon={HeadphonesIcon}
                    className="size-7 text-muted-foreground"
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl p-0"
            >
                <div className="border-b px-4 py-4">
                    <p className="text-base font-semibold">How can we help?</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Find support for your account and transactions.
                    </p>
                </div>

                <div className="p-2">
                    {supportOptions.map((option) => {
                        const external = option.href.startsWith("https://");

                        return (
                            <a
                                key={option.key}
                                href={option.href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted"
                            >
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                    <HugeiconsIcon icon={option.icon} className="size-4.5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold">{option.title}</p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        {option.description}
                                    </p>
                                </div>

                                <HugeiconsIcon
                                    icon={ArrowRight01Icon}
                                    className="size-4 shrink-0 text-muted-foreground"
                                />
                            </a>
                        );
                    })}
                </div>

                <div className="border-t bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-2">
                        <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                        <p className="text-xs text-muted-foreground">
                            Need help with a transaction? Include your reference number.
                        </p>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}