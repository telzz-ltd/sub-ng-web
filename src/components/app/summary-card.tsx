import type { ReactNode } from "react";
import { Card, Divider, Typography } from "antd";

export type SummaryRow = {
  label: string;
  value: ReactNode;
};

type SummaryCardProps = {
  rows: SummaryRow[];
  total: ReactNode;
  totalLabel?: string;
  action?: ReactNode;
  note?: ReactNode;
};

export function SummaryCard({
  rows,
  total,
  totalLabel = "Total",
  action,
  note,
}: SummaryCardProps) {
  return (
    <Card
      className="rounded-2xl border-gray-200 lg:sticky lg:top-20"
      styles={{ body: { padding: 20 } }}
    >
      <div className="space-y-3">
        <Typography.Text strong className="text-base">
          Order summary
        </Typography.Text>

        <Divider className="my-0!" />

        <div className="space-y-2.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <Typography.Text type="secondary">
                {row.label}
              </Typography.Text>
              <span className="min-w-0 text-right font-medium text-gray-900">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <Typography.Text strong>{totalLabel}</Typography.Text>
          <Typography.Text strong className="text-lg! text-blue-700!">
            {total}
          </Typography.Text>
        </div>

        {action}

        {note && (
          <Typography.Text type="secondary" className="block text-xs">
            {note}
          </Typography.Text>
        )}
      </div>
    </Card>
  );
}
