
import { AppLayout } from "@/components/app/layout";
import { WalletBalance } from "@/components/app/wallet-balance";
import { WalletActivity } from "@/components/app/wallet-activity";
import { RecentTransactions } from "@/components/app/recent-transactions";
import { Button, Card, Flex, Typography } from "antd";
import {
  AppstoreOutlined,
  ArrowUpOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  MobileOutlined,
  PlayCircleOutlined,
  SwapOutlined,
  ThunderboltOutlined,
  WalletOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { transactions as recentTransactions } from "@/lib/catalog";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

const quickLinks = [
  {
    label: "Airtime",
    to: "/app/services/airtime",
    icon: MobileOutlined,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    label: "Data",
    to: "/app/services/data",
    icon: WifiOutlined,
    color: "text-violet-600",
    background: "bg-violet-50",
  },
  {
    label: "Airtime 2 Cash",
    to: "/app/services/airtime-to-cash",
    icon: SwapOutlined,
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
  {
    label: "Recharge Card",
    to: "/app/services/recharge-card",
    icon: CreditCardOutlined,
    color: "text-amber-600",
    background: "bg-amber-50",
  },
  {
    label: "Electricity",
    to: "/app/services/electricity",
    icon: ThunderboltOutlined,
    color: "text-orange-600",
    background: "bg-orange-50",
  },
  {
    label: "Exam Card",
    to: "/app/services/exam-card",
    icon: FileTextOutlined,
    color: "text-pink-600",
    background: "bg-pink-50",
  },
  {
    label: "Cable TV",
    to: "/app/services/cable-tv",
    icon: PlayCircleOutlined,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
  {
    label: "More",
    to: "/app/services",
    icon: AppstoreOutlined,
    color: "text-gray-600",
    background: "bg-gray-100",
  },
] as const;

function RouteComponent() {
  const navigate = useNavigate();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["app-dashboard"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        balance: 125500,
        commission: 7350,
        stats: [
          { label: "Airtime", amount: 12500 },
          { label: "Data Bundles", amount: 45000 },
          { label: "Exam Cards", amount: 8000 },
          { label: "Cable TV", amount: 15000 },
        ],
      };
    },
  });

  const dashboardTransactions = recentTransactions.slice(0, 5);

  const totalReceived = dashboardTransactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalSpent = dashboardTransactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  return (
    <AppLayout
      title="Dashboard"
      description="View insights into your activities"
    >
      <div className="space-y-6">
        <section className="space-y-3">
          <WalletBalance
            data={data}
            loading={isFetching}
            onRefresh={() => void refetch()}
          />

          <Flex gap={3}>
            <Link to="/app/fund-wallet" className="min-w-0 flex-1">
              <Button
                type="primary"
                size="large"
                block
                icon={<WalletOutlined />}
                className="h-11! font-medium!"
              >
                Fund Wallet
              </Button>
            </Link>

            <Button
              size="large"
              block
              icon={<ArrowUpOutlined />}
              className="h-11! min-w-0 flex-1 font-medium!"
              onClick={() => {
                void navigate({ to: "/app/commission" });
              }}
            >
              Withdraw Commission
            </Button>
          </Flex>
        </section>

        <section className="space-y-3">
          <div>
            <Title level={5} className="mb-1!">
              Quick links
            </Title>
            <Text type="secondary" className="text-sm">
              Your frequently used services
            </Text>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group min-w-0"
                >
                  <Card
                    hoverable
                    className="h-full! rounded-2xl! border-gray-200!"
                    styles={{ body: { padding: "16px 6px" } }}
                  >
                    <Flex
                      vertical
                      align="center"
                      justify="center"
                      gap={3}
                      className="min-h-20"
                    >
                      <div
                        className={`flex size-12 items-center justify-center rounded-2xl ${item.background} ${item.color} transition-transform group-hover:scale-105`}
                      >
                        <Icon className="size-6" />
                      </div>

                      <Text
                        strong
                        className="text-center! text-xs! leading-5! sm:text-sm!"
                      >
                        {item.label}
                      </Text>
                    </Flex>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div className="min-w-0 xl:col-span-3">
            <WalletActivity />
          </div>

          <div className="min-w-0 xl:col-span-2">
            <Card className="h-full! rounded-2xl!">
              <Flex vertical gap={4}>
                <div>
                  <Title level={5} className="mb-1!">
                    Transaction summary
                  </Title>
                  <Text type="secondary">
                    An overview of your recent wallet activity
                  </Text>
                </div>

                <div className="rounded-xl bg-green-50 p-4">
                  <Text type="secondary">Money received</Text>
                  <Title
                    level={4}
                    className="mb-0! mt-2! break-words text-green-700!"
                  >
                    ₦{totalReceived.toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                    })}
                  </Title>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <Text type="secondary">Money spent</Text>
                  <Title
                    level={4}
                    className="mb-0! mt-2! break-words text-blue-700!"
                  >
                    ₦{totalSpent.toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                    })}
                  </Title>
                </div>

                <Flex justify="space-between" align="center">
                  <Text type="secondary">Recent transactions</Text>
                  <Text strong>{dashboardTransactions.length}</Text>
                </Flex>
              </Flex>
            </Card>
          </div>
        </section>

        <RecentTransactions
          data={dashboardTransactions}
          onViewAll={() => {
            void navigate({ to: "/app/transactions" });
          }}
        />
      </div>
    </AppLayout>
  );
}
