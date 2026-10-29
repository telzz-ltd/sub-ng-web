
import { AppLayout } from "@/components/app/layout";
import { WalletBalance } from "@/components/app/wallet-balance";
import { WalletActivity } from "@/components/app/wallet-activity";
import {
  RecentTransactions,
  type Transaction,
} from "@/components/app/recent-transactions";
import { Button, Card, Flex, Typography } from "antd";
import {
  ArrowUpOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BsCardHeading, BsCash } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { ImConnection } from "react-icons/im";
import { MdConnectedTv, MdPhonelinkRing } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbCashBanknote } from "react-icons/tb";

const { Title, Text } = Typography;

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

const quickLinks = [
  {
    label: "Airtime",
    href: "#",
    icon: MdPhonelinkRing,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    label: "Data",
    href: "#",
    icon: ImConnection,
    color: "text-violet-600",
    background: "bg-violet-50",
  },
  {
    label: "Airtime 2 Cash",
    href: "#",
    icon: TbCashBanknote,
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
  {
    label: "Recharge Card",
    href: "#",
    icon: BsCash,
    color: "text-amber-600",
    background: "bg-amber-50",
  },
  {
    label: "Electricity",
    href: "#",
    icon: HiOutlineLightBulb,
    color: "text-orange-600",
    background: "bg-orange-50",
  },
  {
    label: "Exam Card",
    href: "#",
    icon: BsCardHeading,
    color: "text-pink-600",
    background: "bg-pink-50",
  },
  {
    label: "Cable TV",
    href: "#",
    icon: MdConnectedTv,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
  {
    label: "More",
    href: "#",
    icon: RxDashboard,
    color: "text-gray-600",
    background: "bg-gray-100",
  },
];

const recentTransactions: Transaction[] = [
  {
    id: "1",
    description: "Wallet Funding",
    reference: "TXN-100234",
    date: "Oct 28, 2026",
    amount: 20000,
    type: "credit",
    status: "Successful",
  },
  {
    id: "2",
    description: "MTN Data Bundle",
    reference: "TXN-100233",
    date: "Oct 28, 2026",
    amount: 2500,
    type: "debit",
    status: "Successful",
  },
  {
    id: "3",
    description: "Airtime Purchase",
    reference: "TXN-100232",
    date: "Oct 27, 2026",
    amount: 1000,
    type: "debit",
    status: "Pending",
  },
  {
    id: "4",
    description: "Commission",
    reference: "TXN-100231",
    date: "Oct 27, 2026",
    amount: 350,
    type: "credit",
    status: "Successful",
  },
  {
    id: "5",
    description: "Electricity Bill",
    reference: "TXN-100230",
    date: "Oct 26, 2026",
    amount: 5000,
    type: "debit",
    status: "Failed",
  },
];

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

  const totalReceived = recentTransactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalSpent = recentTransactions
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
                // TODO: Connect the commission withdrawal flow.
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
                <a
                  key={item.label}
                  href={item.href}
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
                </a>
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
                  <Text strong>{recentTransactions.length}</Text>
                </Flex>
              </Flex>
            </Card>
          </div>
        </section>

        <RecentTransactions
          data={recentTransactions}
          onViewAll={() => {
            // TODO: Navigate to your transaction history route.
            void navigate({ to: "/app/" });
          }}
        />
      </div>
    </AppLayout>
  );
}
