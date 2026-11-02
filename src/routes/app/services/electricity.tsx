
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { toast } from "@/components/ui/toast";
import { electricityProviders } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/services/electricity")({
  component: ElectricityPage,
});

const presets = [1000, 2000, 5000, 10000, 20000, 50000];

type ElectricityValues = {
  provider: string;
  meterType: "prepaid" | "postpaid";
  meterNumber: string;
  amount: string;
};

function ElectricityPage() {
  const [values, setValues] = useState<ElectricityValues>({
    provider: "ikeja",
    meterType: "prepaid",
    meterNumber: "",
    amount: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ElectricityValues, string>>
  >({});

  const provider = electricityProviders.find(
    (item) => item.id === values.provider,
  );

  const amount = Number(values.amount);
  const total = Number.isFinite(amount) ? amount : 0;

  function updateField<K extends keyof ElectricityValues>(
    field: K,
    value: ElectricityValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
      ...(field === "provider" ? { amount: "" } : {}),
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      ...(field === "provider" ? { amount: undefined } : {}),
    }));
  }

  function validate() {
    const nextErrors: typeof errors = {};

    if (!values.provider) {
      nextErrors.provider = "Select a provider";
    }

    if (!values.meterNumber) {
      nextErrors.meterNumber = "Enter your meter number";
    } else if (values.meterNumber.length < 10) {
      nextErrors.meterNumber =
        "Meter number must be at least 10 digits";
    }

    if (!values.amount) {
      nextErrors.amount = "Enter an amount";
    } else if (!Number.isFinite(amount) || amount < 500) {
      nextErrors.amount = "The minimum amount is ₦500";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate() || !provider) return;

    toast.add({
      type: "success",
      title: "Payment successful",
      description:
        values.meterType === "prepaid"
          ? `${formatNaira(amount)} has been paid to ${provider.name}. Your prepaid token was sent to your email.`
          : `${formatNaira(amount)} has been paid to ${provider.name} for meter ${values.meterNumber}.`,
    });

    setValues((current) => ({
      ...current,
      meterNumber: "",
      amount: "",
    }));
  }

  return (
    <AppLayout
      title="Electricity"
      description="Pay prepaid and postpaid bills across all distribution companies."
    >
      <ServiceLayout
        form={
          <div>
            <ServiceFormHeader
              title="Electricity bill"
              description="Select your distribution company and enter your meter details."
            />

            <div className="space-y-5">
              <FormSection title="Distribution company">
                <SelectionGrid
                  columns={2}
                  value={values.provider}
                  onChange={(value) => updateField("provider", value)}
                  options={electricityProviders.map((item) => ({
                    value: item.id,
                    label: item.name,
                    description: item.short,
                    leading: (
                      <BrandBadge
                        label={item.short.slice(0, 3)}
                        className="bg-amber-50 text-amber-700"
                      />
                    ),
                  }))}
                />

                {errors.provider && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.provider}
                  </p>
                )}
              </FormSection>

              <FormSection title="Meter type">
                <RadioGroup
                  value={values.meterType}
                  onValueChange={(value) =>
                    updateField(
                      "meterType",
                      value as ElectricityValues["meterType"],
                    )
                  }
                  className="grid grid-cols-2 gap-3"
                >
                  <Label
                    htmlFor="prepaid"
                    className="flex cursor-pointer items-center gap-3 rounded-xl border p-3"
                  >
                    <RadioGroupItem
                      value="prepaid"
                      id="prepaid"
                    />
                    <span className="text-sm font-medium">
                      Prepaid
                    </span>
                  </Label>

                  <Label
                    htmlFor="postpaid"
                    className="flex cursor-pointer items-center gap-3 rounded-xl border p-3"
                  >
                    <RadioGroupItem
                      value="postpaid"
                      id="postpaid"
                    />
                    <span className="text-sm font-medium">
                      Postpaid
                    </span>
                  </Label>
                </RadioGroup>
              </FormSection>

              <div className="space-y-2">
                <Label htmlFor="meter-number">Meter number</Label>
                <Input
                  id="meter-number"
                  placeholder="Enter your meter number"
                  inputMode="numeric"
                  value={values.meterNumber}
                  maxLength={13}
                  onChange={(event) =>
                    updateField(
                      "meterNumber",
                      event.target.value.replace(/\D/g, "").slice(0, 13),
                    )
                  }
                />

                {errors.meterNumber && (
                  <p className="text-xs text-destructive">
                    {errors.meterNumber}
                  </p>
                )}
              </div>

              <FormSection
                title="Amount"
                extra={
                  <span className="text-xs text-muted-foreground">
                    {values.meterType === "prepaid"
                      ? "Prepaid"
                      : "Postpaid"}
                  </span>
                }
              >
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset}
                      className="w-full"
                      size="sm"
                      variant={
                        amount === preset ? "default" : "outline"
                      }
                      onClick={() =>
                        updateField("amount", String(preset))
                      }
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
          </div>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Provider", value: provider?.name ?? "—" },
              {
                label: "Meter type",
                value:
                  values.meterType === "prepaid"
                    ? "Prepaid"
                    : "Postpaid",
              },
              {
                label: "Meter number",
                value: values.meterNumber || "—",
              },
              { label: "Service fee", value: "₦0.00" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                className="w-full"
                size="lg"
                disabled={
                  !provider ||
                  total < 500 ||
                  !values.meterNumber
                }
                onClick={handleSubmit}
              >
                Pay electricity bill
              </Button>
            }
            note="Prepaid tokens are delivered to your email immediately."
          />
        }
      />
    </AppLayout>
  );
}
