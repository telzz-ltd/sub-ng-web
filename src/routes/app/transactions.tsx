import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  Flex,
  Input,
  Segmented,
  Select,
  Table,
  Typography,
} from "antd";
import type { TableProps } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
  WalletOutlined,
} from "@ant-design/icons";

import { AppLayout } from "@/components/app/layout";
import { StatCard } from "@/components/app/stat-card";
import {
  TransactionIcon,
  TransactionStatusBadge,
} from "@/components/app/transactions/transaction-display";
import { transactions } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";
import type { Transaction, TransactionStatus } from "@/lib/types";

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});

const { Text } = Typography;

const statusOptions = [
  { label: "All status", value: "all" },
  { label: "Successful", value: "Successful" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
];

const columns: TableProps<Transaction>["columns"] = [
  {
    title: "TRANSACTION",
    key: "transaction",
    render: (_, record) => (
      <Flex align="center" gap={12}>
        <TransactionIcon category={record.category} />
        <div className="min-w-0">
          <Text strong className="block truncate">
            {record.description}
          </Text>
          <Text type="secondary" className="text-xs">
            {record.reference}
          </Text>
        </div>
      </Flex>
    ),
  },
  {
    title: "DATE",
    dataIndex: "date",
    responsive: ["md"],
    render: (date: string) => (
      <Text type="secondary" className="text-sm">
        {date}
      </Text>
    ),
  },
  {
    title: "TYPE",
    dataIndex: "type",
    responsive: ["lg"],
    render: (type: Transaction["type"]) => (
      <Text className="text-sm capitalize">{type}</Text>
    ),
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    align: "right",
    render: (amount: number, record) => (
      <Text
        strong
        className={`whitespace-nowrap ${
          record.type === "credit" ? "text-emerald-700!" : "text-gray-900!"
        }`}
      >
        {record.type === "credit" ? "+" : "−"}
        {formatNaira(amount)}
      </Text>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (status: TransactionStatus) => (
      <TransactionStatusBadge status={status} />
    ),
  },
];

function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  const filtered = useMemo(
    () =>
      transactions.filter((transaction) => {
        const matchesQuery = `${transaction.description} ${transaction.reference}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus =
          status === "all" || transaction.status === status;
        const matchesType = type === "all" || transaction.type === type;

        return matchesQuery && matchesStatus && matchesType;
      }),
    [query, status, type],
  );

  const totalReceived = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalSpent = transactions
    .filter(
      (transaction) =>
        transaction.type === "debit" && transaction.status === "Successful",
    )
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <AppLayout
      title="Transactions"
      description="Search, filter and review every transaction on your account."
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Total received"
            value={formatNaira(totalReceived)}
            icon={<ArrowDownOutlined />}
            hint="All credits to your wallet"
            tone="green"
          />
          <StatCard
            label="Total spent"
            value={formatNaira(totalSpent)}
            icon={<ArrowUpOutlined />}
            hint="Successful debits only"
            tone="blue"
          />
          <StatCard
            label="Transactions"
            value={transactions.length}
            icon={<WalletOutlined />}
            hint="Across all services"
            tone="violet"
          />
        </div>

        <Card
          className="rounded-2xl border-gray-200"
          styles={{ body: { padding: 0 } }}
          title={
            <div className="py-1">
              <Text strong className="block text-base">
                Transaction history
              </Text>
              <Text type="secondary" className="text-xs font-normal">
                {filtered.length} of {transactions.length} transactions
              </Text>
            </div>
          }
        >
          <div className="border-b border-gray-100 p-4">
            <Flex wrap gap={10} align="center" justify="space-between">
              <Input
                allowClear
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search by description or reference"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="max-w-sm"
              />

              <Flex wrap gap={10} align="center">
                <Segmented
                  value={type}
                  onChange={(value) => setType(String(value))}
                  options={[
                    { label: "All", value: "all" },
                    { label: "Credit", value: "credit" },
                    { label: "Debit", value: "debit" },
                  ]}
                />

                <Select
                  value={status}
                  onChange={setStatus}
                  options={statusOptions}
                  className="w-38"
                />
              </Flex>
            </Flex>
          </div>

          <Table<Transaction>
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            scroll={{ x: 640 }}
            pagination={{ pageSize: 8, hideOnSinglePage: true }}
            locale={{ emptyText: "No transactions match your filters" }}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
