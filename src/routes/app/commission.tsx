import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  App,
  Button,
  Card,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import type { TableProps } from "antd";
import {
  BankOutlined,
  GiftOutlined,
  RiseOutlined,
} from "@ant-design/icons";

import { AppLayout } from "@/components/app/layout";
import { StatCard } from "@/components/app/stat-card";
import { banks, commissionHistory } from "@/lib/catalog";
import type { CommissionEntry } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/commission")({
  component: CommissionPage,
});

const { Text, Title } = Typography;

const bankOptions = banks.map((bank) => ({ label: bank, value: bank }));

const columns: TableProps<CommissionEntry>["columns"] = [
  {
    title: "SOURCE",
    dataIndex: "source",
    render: (source: string) => <Text strong>{source}</Text>,
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
    render: (amount: number) => (
      <Text strong className="whitespace-nowrap text-emerald-700!">
        +{formatNaira(amount)}
      </Text>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (status: CommissionEntry["status"]) => (
      <Tag color={status === "Paid" ? "green" : "gold"}>{status}</Tag>
    ),
  },
];

type WithdrawValues = {
  amount: string;
  bank: string;
  accountNumber: string;
  accountName: string;
};

function CommissionPage() {
  const { modal, message } = App.useApp();
  const [isPending, setIsPending] = useState(false);
  const [form] = Form.useForm<WithdrawValues>();

  const available = 7350;
  const pending = commissionHistory
    .filter((entry) => entry.status === "Pending")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const totalEarned = commissionHistory.reduce(
    (sum, entry) => sum + entry.amount,
    0,
  );

  function handleWithdraw(values: WithdrawValues) {
    const amount = Number(values.amount);

    if (!Number.isFinite(amount) || amount < 1000) {
      message.error("The minimum withdrawal amount is ₦1,000.");
      return;
    }

    if (amount > available) {
      message.error("You cannot withdraw more than your available commission.");
      return;
    }

    setIsPending(true);

    window.setTimeout(() => {
      setIsPending(false);
      form.resetFields(["amount"]);
      modal.success({
        title: "Withdrawal requested",
        content: `${formatNaira(amount)} is on its way to ${values.bank} • ${values.accountNumber}.`,
        okText: "Done",
      });
    }, 900);
  }

  return (
    <AppLayout
      title="Commissions"
      description="Track what you earn and withdraw it directly to your bank."
    >
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total earned"
            value={formatNaira(totalEarned)}
            icon={<RiseOutlined />}
            hint="Lifetime commission"
            tone="green"
          />
          <StatCard
            label="Available"
            value={formatNaira(available)}
            icon={<BankOutlined />}
            hint="Ready to withdraw"
            tone="blue"
          />
          <StatCard
            label="Pending"
            value={formatNaira(pending)}
            icon={<GiftOutlined />}
            hint="Awaiting confirmation"
            tone="amber"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <Card
            className="h-fit rounded-2xl border-gray-200"
            styles={{ body: { padding: 20 } }}
          >
            <Title level={5} className="mb-1!">
              Withdraw commission
            </Title>
            <Text type="secondary" className="text-sm">
              Funds are sent to your bank account within minutes.
            </Text>

            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={handleWithdraw}
              className="mt-4"
            >
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: "Enter an amount" }]}
              >
                <Input prefix="₦" placeholder="0.00" inputMode="decimal" />
              </Form.Item>

              <Form.Item
                name="bank"
                label="Bank"
                rules={[{ required: true, message: "Select a bank" }]}
              >
                <Select placeholder="Select your bank" options={bankOptions} />
              </Form.Item>

              <Form.Item
                name="accountNumber"
                label="Account number"
                rules={[
                  { required: true, message: "Enter your account number" },
                  { len: 10, message: "Account number must be 10 digits" },
                ]}
              >
                <Input placeholder="0123456789" inputMode="numeric" maxLength={10} />
              </Form.Item>

              <Form.Item
                name="accountName"
                label="Account name"
                rules={[{ required: true, message: "Enter your account name" }]}
              >
                <Input placeholder="Name on your bank account" />
              </Form.Item>

              <Button
                htmlType="submit"
                type="primary"
                block
                loading={isPending}
              >
                Withdraw commission
              </Button>
            </Form>
          </Card>

          <Card
            className="rounded-2xl border-gray-200"
            styles={{ body: { padding: 0 } }}
            title={
              <div className="py-1">
                <Text strong className="block text-base">
                  Commission history
                </Text>
                <Text type="secondary" className="text-xs font-normal">
                  Earnings from your transactions
                </Text>
              </div>
            }
          >
            <Table<CommissionEntry>
              rowKey="id"
              columns={columns}
              dataSource={commissionHistory}
              pagination={false}
              scroll={{ x: 480 }}
            />
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
