import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  Search01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";

import { AppLayout } from "@/components/app/layout";
import { StatCard } from "@/components/app/stat-card";
import {
  TransactionIcon,
  TransactionStatusBadge,
} from "@/components/app/transactions/transaction-display";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { transactions } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";
import type { Transaction, TransactionStatus } from "@/lib/types";

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});

const statusOptions = [
  { label: "All status", value: "all" },
  { label: "Successful", value: "Successful" },
  { label: "Pending", value: "Pending" },
  { label: "Failed", value: "Failed" },
];

const pageSize = 8;

function TransactionsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);

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

  const pageCount = Math.ceil(filtered.length / pageSize);
  const currentPage = Math.min(page, Math.max(pageCount, 1));

  const paginatedTransactions = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateStatus(value: string | null) {
    if (!value) return;
    setStatus(value);
    setPage(1);
  }

  function updateType(value: string) {
    setType(value);
    setPage(1);
  }

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
            icon={
              <HugeiconsIcon icon={ArrowDown01Icon} className="size-5" />
            }
            hint="All credits to your wallet"
            tone="green"
          />

          <StatCard
            label="Total spent"
            value={formatNaira(totalSpent)}
            icon={
              <HugeiconsIcon icon={ArrowUp01Icon} className="size-5" />
            }
            hint="Successful debits only"
            tone="blue"
          />

          <StatCard
            label="Transactions"
            value={transactions.length}
            icon={<HugeiconsIcon icon={Wallet01Icon} className="size-5" />}
            hint="Across all services"
            tone="violet"
          />
        </div>

        <Card className="gap-0 overflow-hidden rounded-2xl border-border py-0">
          <CardHeader className="border-b px-5 py-4">
            <CardTitle className="text-base">Transaction history</CardTitle>
            <CardDescription>
              {filtered.length} of {transactions.length} transactions
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm">
                <HugeiconsIcon
                  icon={Search01Icon}
                  className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search by description or reference"
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center rounded-lg border p-1">
                  {[
                    { label: "All", value: "all" },
                    { label: "Credit", value: "credit" },
                    { label: "Debit", value: "debit" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      size="sm"
                      variant={type === option.value ? "secondary" : "ghost"}
                      className="h-7 px-3 text-xs"
                      onClick={() => updateType(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>

                <Select value={status} onValueChange={updateStatus}>
                  <SelectTrigger className="w-38">
                    <SelectValue placeholder="All status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <Table className="min-w-160">
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-11 pl-5 text-xs font-medium uppercase tracking-wide">
                      Transaction
                    </TableHead>
                    <TableHead className="hidden h-11 text-xs font-medium uppercase tracking-wide md:table-cell">
                      Date
                    </TableHead>
                    <TableHead className="hidden h-11 text-xs font-medium uppercase tracking-wide lg:table-cell">
                      Type
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
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((record: Transaction) => (
                      <TableRow key={record.id}>
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

                        <TableCell className="hidden whitespace-nowrap text-sm text-muted-foreground md:table-cell">
                          {record.date}
                        </TableCell>

                        <TableCell className="hidden text-sm capitalize lg:table-cell">
                          {record.type}
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
                          <TransactionStatusBadge
                            status={record.status as TransactionStatus}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="h-32 text-center text-sm text-muted-foreground"
                      >
                        No transactions match your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {filtered.length > 0 && (
              <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  {(currentPage - 1) * pageSize + 1}–{Math.min(
                    currentPage * pageSize,
                    filtered.length,
                  )}{" "}
                  of {filtered.length} transactions
                </p>

                {pageCount > 1 && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Previous page"
                      disabled={currentPage === 1}
                      onClick={() => setPage((value) => value - 1)}
                    >
                      <HugeiconsIcon
                        icon={ArrowLeft01Icon}
                        className="size-4"
                      />
                    </Button>

                    <span className="px-2 text-xs text-muted-foreground">
                      Page {currentPage} of {pageCount}
                    </span>

                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="Next page"
                      disabled={currentPage === pageCount}
                      onClick={() => setPage((value) => value + 1)}
                    >
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        className="size-4"
                      />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}