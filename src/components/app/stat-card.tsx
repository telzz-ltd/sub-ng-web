import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="h-full rounded-2xl border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              {label}
            </p>

            <div className="mt-1 wrap-break-word text-2xl font-semibold tracking-tight">
              {value}
            </div>

            {hint && (
              <div className="mt-1 text-xs text-muted-foreground">
                {hint}
              </div>
            )}
          </div>

          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-lg ${tones[tone]}`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}