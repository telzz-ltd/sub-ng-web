import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Card,
  Descriptions,
  Flex,
  Typography,
  message,
} from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  PlusOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import { AppLayout } from "@/components/app/layout";
import { RecentTransactions } from "@/components/app/recent-transactions";
import { StatCard } from "@/components/app/stat-card";
import { WalletBalance } from "@/components/app/wallet-balance";
import { transactions, walletAccount } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/wallet")({
  component: WalletPage,
});

const { Text, Title } = Typography;

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
  const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.success("Account number copied");
    } catch {
      messageApi.error("Unable to copy account number");
    }
  }

  return (
    <AppLayout
      title="Wallet"
      description="Manage your balance, funding and wallet activity."
    >
      {contextHolder}

      <div className="space-y-5">
        <section className="space-y-3">
          <WalletBalance
            data={{ balance, commission, stats }}
            onRefresh={() => messageApi.success("Wallet balance is up to date")}
          />

          <Flex gap={12}>
            <Link to="/app/fund-wallet" className="min-w-0 flex-1">
              <Button
                type="primary"
                block
                size="large"
                icon={<PlusOutlined />}
                className="h-11! font-medium!"
              >
                Fund wallet
              </Button>
            </Link>

            <Link to="/app/commission" className="min-w-0 flex-1">
              <Button
                block
                size="large"
                icon={<ArrowUpOutlined />}
                className="h-11! font-medium!"
              >
                Withdraw commission
              </Button>
            </Link>
          </Flex>
        </section>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Money in"
            value={formatNaira(totalReceived)}
            icon={<ArrowDownOutlined />}
            hint="Wallet credits"
            tone="green"
          />
          <StatCard
            label="Money out"
            value={formatNaira(totalSpent)}
            icon={<ArrowUpOutlined />}
            hint="Successful payments"
            tone="blue"
          />
          <StatCard
            label="Commission"
            value={formatNaira(commission)}
            icon={<WalletOutlined />}
            hint="Available to withdraw"
            tone="violet"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <RecentTransactions
            data={transactions.slice(0, 6)}
            onViewAll={() => navigate({ to: "/app/transactions" })}
          />

          <Card
            className="rounded-2xl border-gray-200"
            styles={{ body: { padding: 20 } }}
          >
            <Flex vertical gap={12}>
              <div>
                <Title level={5} className="mb-1!">
                  Wallet account
                </Title>
                <Text type="secondary" className="text-sm">
                  Transfer to this account to fund your wallet.
                </Text>
              </div>

              <Descriptions
                column={1}
                size="small"
                colon={false}
                items={[
                  { key: "name", label: "Account name", children: walletAccount.name },
                  { key: "bank", label: "Bank", children: walletAccount.bank },
                  {
                    key: "number",
                    label: "Account number",
                    children: (
                      <Flex align="center" justify="space-between" gap={8}>
                        <Text strong>{walletAccount.number}</Text>
                        <Button
                          size="small"
                          type="text"
                          icon={<CopyOutlined />}
                          onClick={copyAccountNumber}
                          aria-label="Copy account number"
                        />
                      </Flex>
                    ),
                  },
                ]}
              />

              <Text type="secondary" className="text-xs">
                Your wallet is credited automatically once the transfer is
                confirmed.
              </Text>
            </Flex>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
