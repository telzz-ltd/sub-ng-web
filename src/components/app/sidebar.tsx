import { Link, useRouterState } from "@tanstack/react-router";

import {
  AppWindowIcon,
  ArrowLeftRightIcon,
  BookOpenTextIcon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SmartphoneIcon,
  TagIcon,
  TrophyIcon,
  TvIcon,
  WalletIcon,
  WifiIcon,
  ZapIcon
} from "@hugeicons/core-free-icons";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";

const navigation = [
  {
    title: "Overview",
    url: "/app",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transactions",
    url: "/app/transactions",
    icon: WalletIcon,
  },
  {
    title: "Beneficiaries",
    url: "/app/beneficiaries",
    icon: BookOpenTextIcon,
  },
  {
    title: "Rewards",
    url: "/app/rewards",
    icon: TrophyIcon,
  },
];

const services = [
  {
    title: "All services",
    url: "/app/services",
    icon: AppWindowIcon,
  },
  {
    title: "Airtime",
    url: "/app/services/airtime",
    icon: SmartphoneIcon,
  },
  {
    title: "Data",
    url: "/app/services/data",
    icon: WifiIcon,
  },
  {
    title: "Recharge cards",
    url: "/app/services/recharge-card",
    icon: CreditCardIcon,
  },
  {
    title: "Airtime to cash",
    url: "/app/services/airtime-to-cash",
    icon: ArrowLeftRightIcon,
  },
  {
    title: "Cable TV",
    url: "/app/services/cable-tv",
    icon: TvIcon,
  },
  {
    title: "Electricity",
    url: "/app/services/electricity",
    icon: ZapIcon,
  },
  {
    title: "Exam cards",
    url: "/app/services/exam-card",
    icon: FileTextIcon,
  },
];

const secondaryNavigation = [
  {
    title: "Pricing",
    url: "/app/pricing",
    icon: TagIcon,
  },
  // {
  // title: "Notifications",
  // url: "/app/notifications",
  // icon: BellIcon,
  // },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void; }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isActive = (url: string) => {
    if (url === "/app") {
      return pathname === "/app";
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-18 justify-center px-4">
        <Link to="/app" className="flex items-center">
          <img
            src="/logo.png"
            width={120}
            height={40}
            alt="Subs.NG"
            className="max-h-10 max-w-full object-contain"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupLabel> WORKSPACE</SidebarGroupLabel>

          <SidebarMenu className="gap-1">
            {navigation.map((item) => {
              const active = isActive(item.url);

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    data-active={active}
                    tooltip={item.title}
                    className="h-10 rounded-lg px-3 data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
                    render={(props) => (
                      <Link
                        to={item.url}
                        onClick={onNavigate}
                        {...props}
                      >
                        <HugeiconsIcon icon={item.icon} className="size-4.5" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Services */}
        <SidebarGroup>
          <SidebarGroupLabel> SERVICES </SidebarGroupLabel>

          <SidebarMenu>
            {services.map((item) => {
              const active = isActive(item.url);

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    data-active={active}
                    tooltip={item.title}
                    className="h-10 rounded-lg px-3 data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
                    render={(props) => (
                      <Link
                        to={item.url}
                        onClick={onNavigate}
                        {...props}
                      >
                        <HugeiconsIcon icon={item.icon} className="size-4.5" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Other navigation */}
        <SidebarGroup>
          <SidebarGroupLabel> OTHERS </SidebarGroupLabel>
          <SidebarMenu>
            {secondaryNavigation.map((item) => {
              const active = isActive(item.url);

              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    data-active={active}
                    tooltip={item.title}
                    className="h-10 rounded-lg px-3 data-active:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
                    render={(props) => (
                      <Link
                        {...props}
                        to={item.url}
                        onClick={onNavigate}
                      >
                        <HugeiconsIcon icon={item.icon} className="size-4.5" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Account settings */}
      <SidebarFooter className="border-t p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              data-active={isActive("/app/settings")}
              className="h-auto min-h-12 rounded-lg px-2 py-2"
              render={(props) => (
                <Link
                  {...props}
                  to="/app/settings"
                  onClick={onNavigate}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <HugeiconsIcon icon={SettingsIcon} className="size-5" />
                  </div>

                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium">
                      Account Settings
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Manage your account
                    </span>
                  </div>
                </Link>
              )}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
