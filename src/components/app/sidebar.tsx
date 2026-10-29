import {
  AppstoreOutlined,
  BellOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  DollarOutlined,
  FileTextOutlined,
  MobileOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  SwapOutlined,
  ThunderboltOutlined,
  TransactionOutlined,
  WalletOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Avatar,
  ConfigProvider,
  Layout,
  Menu,
  Typography,
  theme,
} from "antd";
import type { MenuProps } from "antd";

const { Sider } = Layout;
const { Text } = Typography;

const navigation = [
  { key: "/app", label: "Overview", icon: DashboardOutlined },
  { key: "/app/wallet", label: "Wallet", icon: WalletOutlined },
  {
    key: "/app/transactions",
    label: "Transactions",
    icon: TransactionOutlined,
  },
  {
    key: "/app/commission",
    label: "Commissions",
    icon: DollarOutlined,
  },
  {
    label: "Services",
    children: [
      {
        key: "/app/services",
        label: "All services",
        icon: AppstoreOutlined,
      },
      { key: "/app/services/airtime", label: "Airtime", icon: MobileOutlined },
      { key: "/app/services/data", label: "Data", icon: WifiOutlined },
      {
        key: "/app/services/recharge-card",
        label: "Recharge cards",
        icon: CreditCardOutlined,
      },
      {
        key: "/app/services/airtime-to-cash",
        label: "Airtime to cash",
        icon: SwapOutlined,
      },
      {
        key: "/app/services/cable-tv",
        label: "Cable TV",
        icon: PlayCircleOutlined,
      },
      {
        key: "/app/services/electricity",
        label: "Electricity",
        icon: ThunderboltOutlined,
      },
      {
        key: "/app/services/exam-card",
        label: "Exam cards",
        icon: FileTextOutlined,
      },
    ],
  },
  {
    key: "/app/notifications",
    label: "Notifications",
    icon: BellOutlined,
  },
];

function createMenuItems(
  entries: typeof navigation,
): MenuProps["items"] {
  return entries.map((entry) => {
    if ("children" in entry) {
      return {
        key: entry.label,
        label: entry.label,
        type: "group" as const,
        children: createMenuItems(entry.children as typeof navigation),
      };
    }

    const Icon = entry.icon;

    return {
      key: entry.key,
      icon: <Icon />,
      label: <Link to={entry.key}>{entry.label}</Link>,
    };
  });
}

function getRoutes(entries: typeof navigation): string[] {
  return entries.flatMap((entry) =>
    "children" in entry ? getRoutes(entry.children as typeof navigation) : [entry.key],
  );
}

const menuItems = createMenuItems(navigation);
const routes = getRoutes(navigation).sort((a, b) => b.length - a.length);

export function AppSidebar({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const selectedKey =
    routes.find(
      (route) =>
        pathname === route ||
        (route !== "/app" && pathname.startsWith(`${route}/`)),
    ) ?? "/app";

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#2563eb",
          borderRadius: 10,
          controlHeight: 38,
          fontSize: 14,
        },
        components: {
          Menu: {
            itemHeight: 42,
            itemBorderRadius: 10,
            itemMarginBlock: 3,
            itemMarginInline: 0,
            itemPaddingInline: 12,
            itemColor: "#64748b",
            itemSelectedColor: "#2563eb",
            itemSelectedBg: "#eff6ff",
            itemHoverBg: "#f8fafc",
            itemHoverColor: "#2563eb",
            groupTitleColor: "#94a3b8",
            activeBarWidth: 0,
            iconSize: 18,
          },
        },
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        collapsedWidth={80}
        theme="light"
        className="sticky top-0 inset-s-0 h-svh overflow-y-auto border-e border-border bg-background"
      >
        <div className="flex min-h-full flex-col">
          <Link
            to="/app"
            onClick={onNavigate}
            className="flex h-18 shrink-0 items-center px-4"
          >
            <img
              src="/logo.png"
              width={collapsed ? 36 : 120}
              height={40}
              alt="Subs.NG"
              className="max-w-full object-contain"
            />
          </Link>

          <nav className="px-3 pb-3">
            {!collapsed && (
              <Text className="mb-2! block! px-3! text-xs! font-medium! tracking-wider! text-muted!">
                WORKSPACE
              </Text>
            )}

            <Menu
              mode="inline"
              inlineCollapsed={collapsed}
              selectedKeys={[selectedKey]}
              items={menuItems}
              onClick={onNavigate}
              className="border-e-0! bg-transparent!"
            />
          </nav>

          <Link
            to="/app/settings"
            onClick={onNavigate}
            className="mt-auto flex shrink-0 items-center gap-3 border-t border-border p-4 transition-colors hover:bg-surface-muted"
          >
            <Avatar
              size={collapsed ? 40 : 42}
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
              icon={<SettingOutlined />}
            />

            {!collapsed && (
              <div className="flex min-w-0 flex-1 flex-col">
                <Text strong className="truncate">
                  Account Settings
                </Text>
                <Text type="secondary" className="truncate text-xs">
                  Manage your account
                </Text>
              </div>
            )}
          </Link>
        </div>
      </Sider>
    </ConfigProvider>
  );
}