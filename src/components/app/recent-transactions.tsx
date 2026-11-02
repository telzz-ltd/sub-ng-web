import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import {
  TransactionIcon,
  TransactionStatusBadge,
} from "@/components/app/transactions/transaction-display";
import { formatNaira } from "@/lib/format";
import type { Transaction } from "@/lib/types";

export type { Transaction } from "@/lib/types";

type RecentTransactionsProps = {
  data?: Transaction[];
  loading?: boolean;
  onViewAll?: () => void;
};

export function RecentTransactions({
  data = [],
  loading = false,
  onViewAll,
}: RecentTransactionsProps) {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-border py-0">
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b px-5 py-4">
        <div className="min-w-0">
          <CardTitle className="text-base">Recent transactions</CardTitle>
          <CardDescription className="mt-1">
            Your latest wallet activity
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="shrink-0 px-2 text-sm"
          onClick={onViewAll}
          disabled={!onViewAll}
        >
          View all
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table className="min-w-140">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-11 pl-5 text-xs font-medium uppercase tracking-wide">
                  Transaction
                </TableHead>
                <TableHead className="hidden h-11 text-xs font-medium uppercase tracking-wide sm:table-cell">
                  Date
                </TableHead>
                <TableHead className="h-11 text-right text-xs font-medium uppercase tracking-wide">
                  Amount
                </TableHead>
                <TableHead className="h-11 pr-5 text-xs font-medium uppercase tracking-wide">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-lg" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="ml-auto h-4 w-20" />
                    </TableCell>
                    <TableCell className="pr-5">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data.length > 0 ? (
                data.map((record) => (
                  <TableRow key={record.id} className="transition-colors">
                    <TableCell className="max-w-0 pl-5">
                      <div className="flex items-center gap-3">
                        <TransactionIcon category={record.category} />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {record.description}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {record.reference}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="hidden whitespace-nowrap text-sm text-muted-foreground sm:table-cell">
                      {record.date}
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-right text-sm font-semibold">
                      <span
                        className={
                          record.type === "credit"
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-foreground"
                        }
                      >
                        {record.type === "credit" ? "+" : "−"}
                        {formatNaira(record.amount)}
                      </span>
                    </TableCell>

                    <TableCell className="pr-5">
                      <TransactionStatusBadge status={record.status} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-28 text-center text-sm text-muted-foreground"
                  >
                    No transactions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}