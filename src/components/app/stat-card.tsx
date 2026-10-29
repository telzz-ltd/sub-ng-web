import type { ReactNode } from "react";
import { Card, Typography } from "antd";

const tones = {
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
  rose: "bg-rose-50 text-rose-700",
} as const;

type StatCardProps = {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  hint?: ReactNode;
  tone?: keyof typeof tones;
};

export function StatCard({
  label,
  value,
  icon,
  hint,
  tone = "blue",
}: StatCardProps) {
  return (
    <Card className="h-full rounded-2xl border-gray-200" styles={{ body: { padding: 20 } }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Typography.Text type="secondary" className="text-sm">
            {label}
          </Typography.Text>
          <Typography.Title level={3} className="mb-0! mt-1! break-words">
            {value}
          </Typography.Title>
          {hint && (
            <Typography.Text type="secondary" className="mt-1 block text-xs">
              {hint}
            </Typography.Text>
          )}
        </div>

        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg ${tones[tone]}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
