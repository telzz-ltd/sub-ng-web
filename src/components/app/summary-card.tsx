import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
    <Card className="rounded-2xl lg:sticky lg:top-20">
      <CardContent className="space-y-3 p-5">
        <h3 className="text-base font-semibold">Order summary</h3>

        <Separator />

        <div className="space-y-2.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <span className="text-muted-foreground">{row.label}</span>

              <span className="min-w-0 text-right font-medium">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
          <span className="font-semibold">{totalLabel}</span>

          <span className="text-lg font-semibold text-primary">
            {total}
          </span>
        </div>

        {action}

        {note && (
          <p className="text-xs text-muted-foreground">{note}</p>
        )}
      </CardContent>
    </Card>
  );
}