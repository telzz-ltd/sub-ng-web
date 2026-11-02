
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import {
  ArrowUpRightIcon,
  ArrowLeftRightIcon,
  CreditCardIcon,
  FileTextIcon,
  PlayIcon,
  SmartphoneIcon,
  WalletIcon,
  WifiIcon,
  ZapIcon,
  AppStoreIcon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { AppLayout } from "@/components/app/layout";
import { WalletBalance } from "@/components/app/wallet-balance";
import { WalletActivity } from "@/components/app/wallet-activity";
import { RecentTransactions } from "@/components/app/recent-transactions";

import { transactions as recentTransactions } from "@/lib/catalog";
import { ButtonLink } from "@/components/ui/link";
import { HugeiconsIcon } from "@hugeicons/react";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

const quickLinks = [
  {
    label: "Airtime",
    to: "/app/services/airtime",
    icon: SmartphoneIcon,
    color: "text-blue-600",
    background: "bg-blue-50",
  },
  {
    label: "Data",
    to: "/app/services/data",
    icon: WifiIcon,
    color: "text-violet-600",
    background: "bg-violet-50",
  },
  {
    label: "Airtime 2 Cash",
    to: "/app/services/airtime-to-cash",
    icon: ArrowLeftRightIcon,
    color: "text-emerald-600",
    background: "bg-emerald-50",
  },
  {
    label: "Recharge Card",
    to: "/app/services/recharge-card",
    icon: CreditCardIcon,
    color: "text-amber-600",
    background: "bg-amber-50",
  },
  {
    label: "Electricity",
    to: "/app/services/electricity",
    icon: ZapIcon,
    color: "text-orange-600",
    background: "bg-orange-50",
  },
  {
    label: "Exam Card",
    to: "/app/services/exam-card",
    icon: FileTextIcon,
    color: "text-pink-600",
    background: "bg-pink-50",
  },
  {
    label: "Cable TV",
    to: "/app/services/cable-tv",
    icon: PlayIcon,
    color: "text-cyan-600",
    background: "bg-cyan-50",
  },
  {
    label: "More",
    to: "/app/services",
    icon: AppStoreIcon,
    color: "text-gray-600",
    background: "bg-gray-100",
  },
] as const;

function formatCurrency(amount: number) {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

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
        {/* Wallet balance */}
        <section className="space-y-3">
          <WalletBalance
            data={data}
            loading={isFetching}
            onRefresh={() => void refetch()}
          />

          <div className="flex gap-3">
            <ButtonLink size="lg" to="/app/fund-wallet" className="h-11 min-w-0 flex-1 font-medium" >
              <HugeiconsIcon icon={WalletIcon} className="size-4" />
              Fund Wallet
            </ButtonLink>

            <Button
              variant="outline"
              size="lg"
              className="h-11 min-w-0 flex-1 font-medium"
              onClick={() => {
                void navigate({ to: "/app/commission" });
              }}
            >
              <HugeiconsIcon icon={ArrowUpRightIcon} className="size-4" />
              <span className="truncate">Withdraw Commission</span>
            </Button>
          </div>
        </section>

        {/* Quick links */}
        <section className="space-y-3">
          <div>
            <h2 className="text-base font-semibold">Quick links</h2>
            <p className="text-sm text-muted-foreground hidden">
              Your frequently used services
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
            {quickLinks.map((item) => (
              <Link key={item.label} to={item.to} >
                <Card className="hover:shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center gap-3">
                    <div
                      className={`flex size-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-105 ${item.background} ${item.color}`}
                    >
                      <HugeiconsIcon icon={item.icon} className="size-6" />
                    </div>
                    <span className="text-center text-xs font-medium leading-5 sm:text-sm">
                      {item.label}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Wallet activity and transaction summary */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-5">
          <div className="min-w-0 xl:col-span-3">
            <WalletActivity />
          </div>

          <div className="min-w-0 xl:col-span-2">
            <Card className="h-full rounded-2xl">
              <CardContent className="flex flex-col gap-4 p-5">
                <div>
                  <h2 className="text-base font-semibold">
                    Transaction summary
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    An overview of your recent wallet activity
                  </p>
                </div>

                {/* Received */}
                <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950/30">
                  <p className="text-sm text-muted-foreground">
                    Money received
                  </p>

                  <p className="mt-2 wrap-break-word text-2xl font-bold tracking-tight text-green-700 dark:text-green-400">
                    {formatCurrency(totalReceived)}
                  </p>
                </div>

                {/* Spent */}
                <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-950/30">
                  <p className="text-sm text-muted-foreground">
                    Money spent
                  </p>

                  <p className="mt-2 wrap-break-word text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-400">
                    {formatCurrency(totalSpent)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Recent transactions
                  </span>

                  <span className="text-sm font-semibold">
                    {dashboardTransactions.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recent transactions */}
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
