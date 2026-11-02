import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  CopyIcon,
  PlusIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { AppLayout } from "@/components/app/layout";
import { RecentTransactions } from "@/components/app/recent-transactions";
import { StatCard } from "@/components/app/stat-card";
import { WalletBalance } from "@/components/app/wallet-balance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/link";
import { toast } from "@/components/ui/toast";
import { transactions, walletAccount } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/wallet")({
  component: WalletPage,
});

const balance = 125500;
const commission = 7350;

const stats = [
  { label: "Airtime", amount: 12500 },
  { label: "Data bundles", amount: 45000 },
  { label: "Exam cards", amount: 8000 },
  { label: "Cable TV", amount: 15000 },
];

function WalletPage() {
  const navigate = useNavigate();

  const totalReceived = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalSpent = transactions
    .filter(
      (transaction) =>
        transaction.type === "debit" && transaction.status === "Successful",
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(walletAccount.number);
      toast.add({ type: "success", title: "Account number copied" });
    } catch {
      toast.add({ type: "error", title: "Unable to copy account number" });
    }
  }

  return (
    <AppLayout
      title="Wallet"
      description="Manage your balance, funding and wallet activity."
    >
      <div className="space-y-5">
        <section className="space-y-3">
          <WalletBalance
            data={{ balance, commission, stats }}
            onRefresh={() =>
              toast.add({
                type: "success",
                title: "Wallet balance is up to date",
              })
            }
          />

          <div className="flex gap-3">
            <ButtonLink to="/app/fund-wallet" className="h-11 min-w-0 flex-1 font-medium">
              <HugeiconsIcon icon={PlusIcon} />
              Fund wallet
            </ButtonLink>

            <ButtonLink
              to="/app/commission"
              variant="outline"
              className="h-11 min-w-0 flex-1 font-medium"
            >
              <HugeiconsIcon icon={ArrowUp01Icon} />
              Withdraw commission
            </ButtonLink>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Money in"
            value={formatNaira(totalReceived)}
            icon={<HugeiconsIcon icon={ArrowDown01Icon} />}
            hint="Wallet credits"
            tone="green"
          />
          <StatCard
            label="Money out"
            value={formatNaira(totalSpent)}
            icon={<HugeiconsIcon icon={ArrowUp01Icon} />}
            hint="Successful payments"
            tone="blue"
          />
          <StatCard
            label="Commission"
            value={formatNaira(commission)}
            icon={<HugeiconsIcon icon={Wallet01Icon} />}
            hint="Available to withdraw"
            tone="violet"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <RecentTransactions
            data={transactions.slice(0, 6)}
            onViewAll={() => navigate({ to: "/app/transactions" })}
          />

          <Card className="rounded-2xl border-border">
            <CardHeader>
              <CardTitle>Wallet account</CardTitle>
              <CardDescription>
                Transfer to this account to fund your wallet.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Account name</dt>
                  <dd className="font-medium">{walletAccount.name}</dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Bank</dt>
                  <dd className="font-medium">{walletAccount.bank}</dd>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Account number</dt>
                  <dd className="flex items-center gap-1">
                    <span className="font-semibold">{walletAccount.number}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={copyAccountNumber}
                      aria-label="Copy account number"
                    >
                      <HugeiconsIcon icon={CopyIcon} />
                    </Button>
                  </dd>
                </div>
              </dl>

              <p className="text-xs text-muted-foreground">
                Your wallet is credited automatically once the transfer is
                confirmed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
