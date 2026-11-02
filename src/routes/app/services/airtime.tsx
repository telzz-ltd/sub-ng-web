import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "@/components/ui/toast";

import { AppLayout } from "@/components/app/layout";
import { BrandBadge } from "@/components/app/brand-badge";
import { SelectionGrid } from "@/components/app/selection-grid";
import {
  FormSection,
  ServiceFormHeader,
  ServiceLayout,
} from "@/components/app/service-layout";
import { SummaryCard } from "@/components/app/summary-card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { networks } from "@/lib/catalog";
import {
  formatNaira,
  formatPhone,
  isValidNgPhone,
} from "@/lib/format";

export const Route = createFileRoute("/app/services/airtime")({
  component: AirtimePage,
});

const presets = [100, 200, 500, 1000, 2000, 5000];

type AirtimeValues = {
  network: string;
  phone: string;
  amount: string;
};

type AirtimeErrors = Partial<Record<keyof AirtimeValues, string>>;

function AirtimePage() {
  const [values, setValues] = useState<AirtimeValues>({
    network: "mtn",
    phone: "",
    amount: "",
  });

  const [errors, setErrors] = useState<AirtimeErrors>({});

  const network = networks.find((item) => item.id === values.network);
  const amount = Number(values.amount);
  const total = Number.isFinite(amount) ? amount : 0;

  function updateField<K extends keyof AirtimeValues>(
    field: K,
    value: AirtimeValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      ...(field === "network" ? { amount: undefined } : {}),
    }));

    if (field === "network") {
      setValues((current) => ({ ...current, network: value, amount: "" }));
    }
  }

  function validate(): boolean {
    const nextErrors: AirtimeErrors = {};

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
    } else if (!Number.isFinite(amount) || amount < 50) {
      nextErrors.amount = "The minimum amount is ₦50";
    } else if (amount > 50000) {
      nextErrors.amount = "The maximum amount is ₦50,000";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate() || !network) return;

    toast.add({
      type: "success",
      title: "Airtime purchase successful",
      description: `${formatNaira(amount)} of ${network.name} airtime has been sent to ${formatPhone(values.phone)}.`,
    });

    setValues((current) => ({
      ...current,
      phone: "",
      amount: "",
    }));

    setErrors({});
  }

  return (
    <AppLayout
      title="Buy airtime"
      description="Top up any network instantly at the best rates."
    >
      <ServiceLayout
        form={
          <form onSubmit={handleSubmit} noValidate>
            <ServiceFormHeader
              title="Airtime top-up"
              description="Select a network and enter the phone number to top up."
            />

            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Network</Label>

                <SelectionGrid
                  columns={2}
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
                  value={values.network}
                  onChange={(value: string) => updateField("network", value)}
                />

                {errors.network && (
                  <p className="text-xs text-destructive">{errors.network}</p>
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
                  <p className="text-xs text-destructive">{errors.phone}</p>
                )}
              </div>

              <FormSection title="Amount">
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant={amount === preset ? "default" : "outline"}
                      className="w-full"
                      onClick={() => updateField("amount", String(preset))}
                    >
                      {formatNaira(preset, 0)}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Custom amount</Label>

                  <div className="relative">
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                      ₦
                    </span>

                    <Input
                      id="amount"
                      placeholder="Enter a custom amount"
                      inputMode="decimal"
                      value={values.amount}
                      onChange={(event) =>
                        updateField(
                          "amount",
                          event.target.value.replace(/[^\d.]/g, ""),
                        )
                      }
                      className="pl-8"
                      aria-invalid={!!errors.amount}
                    />
                  </div>

                  {errors.amount && (
                    <p className="text-xs text-destructive">
                      {errors.amount}
                    </p>
                  )}
                </div>
              </FormSection>
            </div>
          </form>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Network", value: network?.name ?? "—" },
              {
                label: "Phone number",
                value: values.phone ? formatPhone(values.phone) : "—",
              },
              { label: "Amount", value: formatNaira(total) },
              { label: "Service fee", value: "₦0.00" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                type="button"
                className="w-full"
                size="lg"
                disabled={!network || total < 50 || total > 50000}
                onClick={() => {
                  const form = document.querySelector<HTMLFormElement>(
                    "form",
                  );
                  form?.requestSubmit();
                }}
              >
                Buy airtime
              </Button>
            }
            note="Airtime is delivered instantly after payment."
          />
        }
      />
    </AppLayout>
  );
}