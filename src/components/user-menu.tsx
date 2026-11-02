import { toast } from "@/components/ui/toast";
import {
    Logout01Icon,
    Settings01Icon,
    Shield01Icon,
    UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "@tanstack/react-router";

import { getAuthSession } from "@/stores/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
    const navigate = useNavigate();
    const user = getAuthSession()?.user;

    const initials = user?.name.split(" ").map(e => e[0]).join("")

    const handleLogout = () => {
        toast.add({ type: "success", description: "Signed out" });
        void navigate({ to: "/login" });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar size="lg">
                    <AvatarFallback className="bg-blue-100 text-lg text-primary">
                        {initials}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60 rounded-xl p-1.5">
                <div className="flex items-center gap-3 px-2.5 py-3">
                    <Avatar className="size-11">
                        <AvatarFallback className="bg-blue-100 text-lg text-primary">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{user?.name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() => void navigate({ to: "/app/settings" })}
                >
                    <HugeiconsIcon icon={UserIcon} className="size-4" />
                    My profile
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => void navigate({ to: "/app/settings" })}
                >
                    <HugeiconsIcon icon={Settings01Icon} className="size-4" />
                    Account settings
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => void navigate({ to: "/app/settings" })}
                >
                    <HugeiconsIcon icon={Shield01Icon} className="size-4" />
                    Security
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                >
                    <HugeiconsIcon icon={Logout01Icon} className="size-4" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}