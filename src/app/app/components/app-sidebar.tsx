import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../../../components/ui/sidebar";

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
    <Sidebar variant="inset" className="border-r">
      <SidebarHeader>
        <Link href="/">
          <Image src="/logo.png" width={150} height={80} alt="Subs.NG logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboad Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((menu) => (
                <SidebarMenuItem key={menu.link}>
                  <SidebarMenuButton>
                    <Icon icon={menu.icon} className="size-6!" />
                    <span className="text-base">{menu.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Avatar>
                <AvatarImage
                  alt="Bob"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                />
                <AvatarFallback>DU</AvatarFallback>
              </Avatar>
              <div className="">
                <h6 className="text-h6">Uthmman Muhammad</h6>
                <p className="text-sm text-muted-foreground">
                  Settings, Preferences etc...
                </p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <div className="bg-foreground flex flex-col items-start gap-1 p-4 rounded-2xl my-3 text-background">
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
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
