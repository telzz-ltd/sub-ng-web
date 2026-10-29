
import type { TableProps } from "antd";
import { Button, Card, Flex, Table, Typography } from "antd";
import {
    ArrowDownLeft,
    ArrowUpRight,
    CreditCard,
    ReceiptText,
    Zap
} from "lucide-react";

const { Text } = Typography;

export type Transaction = {
    id: string;
    description: string;
    reference: string;
    date: string;
    amount: number;
    type: "credit" | "debit";
    status: "Successful" | "Pending" | "Failed";
    category?: "funding" | "airtime" | "data" | "electricity" | "other";
};

type RecentTransactionsProps = {
    data?: Transaction[];
    loading?: boolean;
    onViewAll?: () => void;
};

const formatNaira = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const categoryStyle = {
    funding: {
        icon: ArrowDownLeft,
        className: "bg-emerald-50 text-emerald-700",
    },
    airtime: {
        icon: CreditCard,
        className: "bg-blue-50 text-blue-700",
    },
    data: {
        icon: Zap,
        className: "bg-violet-50 text-violet-700",
    },
    electricity: {
        icon: Zap,
        className: "bg-amber-50 text-amber-700",
    },
    other: {
        icon: ReceiptText,
        className: "bg-gray-100 text-gray-600",
    },
};

function Status({ status }: { status: Transaction["status"] }) {
    const styles = {
        Successful: "bg-emerald-50 text-emerald-700",
        Pending: "bg-amber-50 text-amber-700",
        Failed: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
        >
            <span
                className={`size-1.5 rounded-full ${status === "Successful"
                    ? "bg-emerald-500"
                    : status === "Pending"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
            />
            {status}
        </span>
    );
}

const columns: TableProps<Transaction>["columns"] = [
    {
        title: "TRANSACTION",
        key: "transaction",
        render: (_, record) => {
            const style = categoryStyle[record.category ?? "other"];
            const Icon = style.icon;

            return (
                <Flex align="center" gap={3}>
                    <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${style.className}`}
                    >
                        <Icon size={18} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                        <Text strong className="block truncate text-sm">
                            {record.description}
                        </Text>
                        <Text type="secondary" className="text-xs">
                            {record.reference}
                        </Text>
                    </div>
                </Flex>
            );
        },
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
                className={`whitespace-nowrap text-sm ${record.type === "credit" ? "text-emerald-700!" : "text-gray-800!"
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
        render: (status: Transaction["status"]) => <Status status={status} />,
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
                    View all <ArrowUpRight size={15} />
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
