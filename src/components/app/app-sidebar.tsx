import { Avatar, Button, Typography } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const menus = [
  { label: "Home", link: "/app", icon: "hugeicons:dashboard-square-01" },
  {
    label: "Transactions",
    link: "/app/transactions",
    icon: "hugeicons:dashboard-square-01",
  },
  {
    label: "Airtime",
    link: "/app/services/airtime",
    icon: "hugeicons:dashboard-square-01",
  },
  {
    label: "Recharge Card",
    link: "/app/services/recharge-card",
    icon: "hugeicons:dashboard-square-01",
  },
  {
    label: "Cable TV",
    link: "/app/services/cable-tv",
    icon: "hugeicons:dashboard-square-01",
  },
  {
    label: "Wallet",
    link: "/app/wallet",
    icon: "hugeicons:dashboard-square-01",
  },
  {
    label: "Commissions",
    link: "/app/commission",
    icon: "hugeicons:dashboard-square-01",
  },
  {
    label: "More",
    link: "/app/services",
    icon: "hugeicons:dashboard-square-01",
  },
];

export function AppSidebar() {
  return (
    <div className="border-r w-90 bg-mist-100 p-3 h-screen sticky top-0 flex flex-col gap-3">
      <div className="h-18 py-3">
        <Link href="/">
          <Image src="/logo.png" width={150} height={80} alt="Subs.NG logo" />
        </Link>
      </div>

      <div className="grow overflow-y-auto">
        <ul>
          <li className="text-sm text-muted">Dashboad Menu</li>
          {menus.map((menu) => (
            <li
              key={menu.link}
              className="h-11 hover:bg-accent-soft group rounded-2xl"
            >
              <Link
                href={menu.link}
                className="flex items-center gap-3 h-full pl-2"
              >
                <Icon
                  icon={menu.icon}
                  className="size-6! group-hover:text-accent text-gray-600"
                />
                <span className="text-base text-gray-600 group-hover:text-accent">
                  {menu.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <ul className="space-y-3">
          <li>
            <Link
              href="/app/settings"
              className="flex items-center gap-3 p-2 hover:bg-accent-soft w-full rounded-2xl cursor-pointer"
            >
              <Avatar>
                <Avatar.Image
                  alt="Bob"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                />
                <Avatar.Fallback>DU</Avatar.Fallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <Typography.Heading level={6}>
                  Uthmman Muhammad
                </Typography.Heading>
                <p className="text-sm text-muted">Manage Settings</p>
              </div>
            </Link>
          </li>
          <div className="bg-accent flex flex-col items-start gap-1 p-4 rounded-2xl text-background">
            <h3 className="font-medium">Download the App</h3>
            <p className="text-sm text-muted-background">
              Download the app for better mobile experience
            </p>
            <Link href="/" className="w-full mt-3">
              <Button variant="secondary" className="w-full">
                <Icon icon="logos:google-play-icon" className="text-2xl" />
                Google Play
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="secondary" className="w-full">
                <Icon
                  icon="ant-design:apple-filled"
                  className="text-2xl! size-6"
                />
                AppStore
              </Button>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}
