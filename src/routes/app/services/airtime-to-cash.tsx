import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AppLayout } from "@/components/app/layout";
import { BrandBadge } from "@/components/app/brand-badge";
import { SelectionGrid } from "@/components/app/selection-grid";
import {
  FormSection,
  ServiceFormHeader,
  ServiceLayout,
} from "@/components/app/service-layout";
import { SummaryCard } from "@/components/app/summary-card";

import { banks, networks } from "@/lib/catalog";
import {
  formatNaira,
  formatPhone,
  isValidNgPhone,
} from "@/lib/format";

export const Route = createFileRoute("/app/services/airtime-to-cash")({
  component: AirtimeToCashPage,
});

const presets = [500, 1000, 2000, 5000, 10000];
const payoutRate = 0.8;

type AirtimeToCashValues = {
  network: string;
  phone: string;
  amount: string;
  bank: string;
  accountNumber: string;
  accountName: string;
};

type FormErrors = Partial<Record<keyof AirtimeToCashValues, string>>;

const initialValues: AirtimeToCashValues = {
  network: "mtn",
  phone: "",
  amount: "",
  bank: "",
  accountNumber: "",
  accountName: "",
};

function AirtimeToCashPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const amount = Number(values.amount);
  const numericAmount = Number.isFinite(amount) ? amount : 0;

  const network = networks.find((item) => item.id === values.network);
  const payout = Math.floor(numericAmount * payoutRate);

  function updateField<K extends keyof AirtimeToCashValues>(
    field: K,
    value: AirtimeToCashValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: FormErrors = {};

    if (!values.network) {
      nextErrors.network = "Select a network";
    }

    if (!values.phone) {
      nextErrors.phone = "Enter the phone number";
    } else if (!isValidNgPhone(values.phone)) {
      nextErrors.phone = "Enter a valid Nigerian phone number";
    }

    if (!values.amount) {
      nextErrors.amount = "Enter an amount";
    } else if (!Number.isFinite(amount) || amount < 500) {
      nextErrors.amount = "The minimum amount is ₦500";
    }

    if (!values.bank) {
      nextErrors.bank = "Select your bank";
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

  function handleSubmit() {
    if (!validate()) return;

    toast.add({
      type: "success",
      title: "Airtime conversion submitted",
      description: `${formatNaira(numericAmount)} of ${network?.name} airtime is being converted. ${formatNaira(payout)} will be sent to ${values.bank} • ${values.accountNumber}.`,
    });

    setValues((current) => ({
      ...current,
      phone: "",
      amount: "",
    }));
  }

  return (
    <AppLayout
      title="Airtime to cash"
      description="Convert unused airtime into money in your bank account."
    >
      <ServiceLayout
        form={
          <div className="space-y-5">
            <ServiceFormHeader
              title="Convert airtime"
              description={`Get ${payoutRate * 100}% of your airtime value paid into your bank account.`}
            />

            <div className="space-y-2">
              <Label>Network</Label>

              <SelectionGrid
                columns={2}
                value={values.network}
                onChange={(value: string) => updateField("network", value)}
                options={networks.map((item) => ({
                  value: item.id,
                  label: item.name,
                  leading: (
                    <BrandBadge
                      label={item.short}
                      className={`${item.background} ${item.foreground}`}
                    />
                  ),
                }))}
              />

              {errors.network && (
                <p className="text-sm text-destructive">{errors.network}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                placeholder="0801 234 5678"
                inputMode="tel"
                maxLength={11}
                value={values.phone}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value.replace(/\D/g, "").slice(0, 11),
                  )
                }
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <FormSection
              title="Airtime amount"
              extra={
                <span className="text-xs text-muted-foreground">
                  Payout rate {payoutRate * 100}%
                </span>
              }
            >
              <div className="grid grid-cols-3 gap-2">
                {presets.map((preset) => (
                  <Button
                    key={preset}
                    variant={
                      values.amount === String(preset) ? "default" : "outline"
                    }
                    onClick={() => updateField("amount", String(preset))}
                  >
                    {formatNaira(preset, 0)}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Custom amount</Label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                    ₦
                  </span>
                  <Input
                    id="amount"
                    className="pl-8"
                    placeholder="Enter a custom amount"
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
                  <p className="text-sm text-destructive">{errors.amount}</p>
                )}
              </div>
            </FormSection>

            <FormSection title="Bank account">
              <div className="space-y-2">
                <Label>Bank</Label>
                <Select
                  value={values.bank}
                  onValueChange={(value) => updateField("bank", value ?? "")}
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
                  placeholder="Account number"
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
                  placeholder="Account name"
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
            </FormSection>
          </div>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Network", value: network?.name ?? "—" },
              {
                label: "Phone number",
                value: values.phone ? formatPhone(values.phone) : "—",
              },
              { label: "Airtime value", value: formatNaira(numericAmount) },
              { label: "Payout rate", value: `${payoutRate * 100}%` },
            ]}
            total={formatNaira(payout)}
            totalLabel="You receive"
            action={
              <Button
                className="w-full"
                size="lg"
                disabled={numericAmount < 500 || !values.phone}
                onClick={handleSubmit}
              >
                Convert to cash
              </Button>
            }
            note="Conversion is processed within 10 minutes."
          />
        }
      />
    </AppLayout>
  );
}