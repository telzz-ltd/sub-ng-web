import { Avatar, Button, cn, Typography } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { GrCreditCard } from "react-icons/gr";
import { MdConnectedTv, MdPhonelinkRing } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbMoneybagMove, TbTransactionDollar } from "react-icons/tb";

const menus = [
  { label: "Home", link: "/app", icon: RxDashboard },
  {
    label: "Transactions",
    link: "/app/transactions",
    icon: TbTransactionDollar,
  },
  {
    label: "Airtime",
    link: "/app/services/airtime",
    icon: MdPhonelinkRing,
  },
  {
    label: "Recharge Card",
    link: "/app/services/recharge-card",
    icon: GrCreditCard,
  },
  {
    label: "Cable TV",
    link: "/app/services/cable-tv",
    icon: MdConnectedTv,
  },
  {
    label: "Wallet",
    link: "/app/wallet",
    icon: GiWallet,
  },
  {
    label: "Commissions",
    link: "/app/commission",
    icon: TbMoneybagMove,
  },
];

export function AppSidebar({
  open,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={cn(
        "h-screen w-screen md:w-auto fixed md:sticky top-0 z-20 md:bg-transparent transition-all",
        open ? "bg-backdrop left-0" : "bg-transparent -left-full",
      )}
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        className={cn(
          "border-r w-3/4 md:w-80 bg-mist-100 p-3 h-full flex flex-col gap-3",
        )}
      >
        <div className="h-18 py-3">
          <Link href="/">
            <Image
              src="/logo.png"
              width={150}
              height={80}
              className=""
              alt="Subs.NG logo"
            />
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
                  <menu.icon className="size-6! group-hover:text-accent text-gray-600" />
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
            <div className="bg-accent flex flex-col items-start gap-1 p-4 rounded-2xl">
              <Typography.Heading level={6} className="text-background">
                Download the App
              </Typography.Heading>
              <p className="text-sm text-background">
                Download the app for better mobile experience
              </p>
              <Link href="/" className="w-full mt-3">
                <Button variant="secondary" className="w-full">
                  <FaGooglePlay className="size-5" />
                  <span>Google Play</span>
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="secondary" className="w-full">
                  <FaApple className="text-2xl! size-6" />
                  AppStore
                </Button>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
