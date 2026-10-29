import type { TableProps } from "antd";
import { Button, Card, Flex, Table, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import {
  TransactionIcon,
  TransactionStatusBadge,
} from "@/components/app/transactions/transaction-display";
import { formatNaira } from "@/lib/format";
import type { Transaction } from "@/lib/types";

export type { Transaction } from "@/lib/types";

const { Text } = Typography;

type RecentTransactionsProps = {
  data?: Transaction[];
  loading?: boolean;
  onViewAll?: () => void;
};

const columns: TableProps<Transaction>["columns"] = [
  {
    title: "TRANSACTION",
    key: "transaction",
    render: (_, record) => (
      <Flex align="center" gap={3}>
        <TransactionIcon category={record.category} />

        <div className="min-w-0">
          <Text strong className="block truncate text-sm">
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
    responsive: ["sm"],
    render: (date: string) => (
      <Text type="secondary" className="text-sm">
        {date}
      </Text>
    ),
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    align: "right",
    render: (amount: number, record) => (
      <Text
        strong
        className={`whitespace-nowrap text-sm ${
          record.type === "credit" ? "text-emerald-700!" : "text-gray-800!"
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
    render: (status: Transaction["status"]) => (
      <TransactionStatusBadge status={status} />
    ),
  },
];

export function RecentTransactions({
  data = [],
  loading = false,
  onViewAll,
}: RecentTransactionsProps) {
  return (
    <Card
      className="rounded-2xl border-gray-200"
      styles={{ body: { padding: 0 } }}
      title={
        <div className="py-1">
          <Text strong className="block text-base">
            Recent transactions
          </Text>
          <Text type="secondary" className="text-xs font-normal">
            Your latest wallet activity
          </Text>
        </div>
      }
      extra={
        <Button
          type="link"
          onClick={onViewAll}
          className="px-0! text-sm font-medium"
        >
          View all <ArrowRightOutlined />
        </Button>
      }
    >
      <Table<Transaction>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        size="middle"
        scroll={{ x: 560 }}
        locale={{ emptyText: "No transactions yet" }}
        rowClassName={() => "transition-colors"}
      />
    </Card>
  );
}
