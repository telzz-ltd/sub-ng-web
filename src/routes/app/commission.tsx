import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRightIcon,
  BankIcon,
  GiftIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "@/components/ui/toast";

import { AppLayout } from "@/components/app/layout";
import { StatCard } from "@/components/app/stat-card";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import { banks, commissionHistory } from "@/lib/catalog";
import type { CommissionEntry } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/commission")({
  component: CommissionPage,
});

type WithdrawValues = {
  amount: string;
  bank: string;
  accountNumber: string;
  accountName: string;
};

type FormErrors = Partial<Record<keyof WithdrawValues, string>>;

const initialValues: WithdrawValues = {
  amount: "",
  bank: "",
  accountNumber: "",
  accountName: "",
};

const available = 7350;

function CommissionPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  const pending = commissionHistory
    .filter((entry) => entry.status === "Pending")
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalEarned = commissionHistory.reduce(
    (sum, entry) => sum + entry.amount,
    0,
  );

  function updateField<K extends keyof WithdrawValues>(
    field: K,
    value: WithdrawValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    const amount = Number(values.amount);

    if (!values.amount.trim()) {
      nextErrors.amount = "Enter an amount";
    } else if (!Number.isFinite(amount) || amount < 1000) {
      nextErrors.amount = "The minimum withdrawal amount is ₦1,000";
    } else if (amount > available) {
      nextErrors.amount =
        "You cannot withdraw more than your available commission";
    }

    if (!values.bank) {
      nextErrors.bank = "Select a bank";
    }

    if (!values.accountNumber) {
      nextErrors.accountNumber = "Enter your account number";
    } else if (values.accountNumber.length !== 10) {
      nextErrors.accountNumber = "Account number must be 10 digits";
    }

    if (!values.accountName.trim()) {
      nextErrors.accountName = "Enter your account name";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleWithdraw() {
    if (!validate()) return;

    const amount = Number(values.amount);

    setIsPending(true);

    window.setTimeout(() => {
      setIsPending(false);
      setValues((current) => ({ ...current, amount: "" }));

      toast.add({
        type: "success",
        title: "Withdrawal requested",
        description: `${formatNaira(amount)} is on its way to ${values.bank} • ${values.accountNumber}.`,
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
            icon={
              <HugeiconsIcon icon={ArrowUpRightIcon} className="size-5" />
            }
            hint="Lifetime commission"
            tone="green"
          />

          <StatCard
            label="Available"
            value={formatNaira(available)}
            icon={<HugeiconsIcon icon={BankIcon} className="size-5" />}
            hint="Ready to withdraw"
            tone="blue"
          />

          <StatCard
            label="Pending"
            value={formatNaira(pending)}
            icon={<HugeiconsIcon icon={GiftIcon} className="size-5" />}
            hint="Awaiting confirmation"
            tone="amber"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)]">
          <Card className="h-fit rounded-2xl">
            <CardHeader className="pb-0">
              <h2 className="text-base font-semibold">
                Withdraw commission
              </h2>
              <p className="text-sm text-muted-foreground">
                Funds are sent to your bank account within minutes.
              </p>
            </CardHeader>

            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleWithdraw();
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                      ₦
                    </span>
                    <Input
                      id="amount"
                      className="pl-8"
                      placeholder="0.00"
                      inputMode="decimal"
                      value={values.amount}
                      onChange={(event) =>
                        updateField(
                          "amount",
                          event.target.value.replace(/[^\d.]/g, ""),
                        )
                      }
                      aria-invalid={!!errors.amount}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-destructive">
                      {errors.amount}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Bank</Label>
                  <Select
                    value={values.bank}
                    onValueChange={(value) =>
                      updateField("bank", value ?? "")
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bank && (
                    <p className="text-sm text-destructive">{errors.bank}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-number">Account number</Label>
                  <Input
                    id="account-number"
                    placeholder="0123456789"
                    inputMode="numeric"
                    maxLength={10}
                    value={values.accountNumber}
                    onChange={(event) =>
                      updateField(
                        "accountNumber",
                        event.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    aria-invalid={!!errors.accountNumber}
                  />
                  {errors.accountNumber && (
                    <p className="text-sm text-destructive">
                      {errors.accountNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-name">Account name</Label>
                  <Input
                    id="account-name"
                    placeholder="Name on your bank account"
                    value={values.accountName}
                    onChange={(event) =>
                      updateField("accountName", event.target.value)
                    }
                    aria-invalid={!!errors.accountName}
                  />
                  {errors.accountName && (
                    <p className="text-sm text-destructive">
                      {errors.accountName}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? "Processing..." : "Withdraw commission"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-2xl gap-0 overflow-hidden">
            <CardHeader>
              <h2 className="text-base font-semibold">
                Commission history
              </h2>
              <p className="text-xs text-muted-foreground">
                Earnings from your transactions
              </p>
            </CardHeader>

            <div className="overflow-x-auto">
              <Table className="min-w-120">
                <TableHeader>
                  <TableRow>
                    <TableHead>SOURCE</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      DATE
                    </TableHead>
                    <TableHead className="text-right">AMOUNT</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {commissionHistory.map((entry: CommissionEntry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {entry.source}
                      </TableCell>

                      <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                        {entry.date}
                      </TableCell>

                      <TableCell className="whitespace-nowrap text-right font-semibold text-emerald-700">
                        +{formatNaira(entry.amount)}
                      </TableCell>

                      <TableCell>
                        <span
                          className={
                            entry.status === "Paid"
                              ? "inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                              : "inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
                          }
                        >
                          {entry.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}

                  {commissionHistory.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-24 text-center text-muted-foreground"
                      >
                        No commission history yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}