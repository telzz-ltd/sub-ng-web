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

import { dataPlans, networks } from "@/lib/catalog";
import {
  formatNaira,
  formatPhone,
  isValidNgPhone,
} from "@/lib/format";

export const Route = createFileRoute("/app/services/data")({
  component: DataPage,
});

type DataValues = {
  network: string;
  phone: string;
  plan: string;
};

type FormErrors = Partial<Record<keyof DataValues, string>>;

const initialValues: DataValues = {
  network: "mtn",
  phone: "",
  plan: "",
};

function DataPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const network = networks.find((item) => item.id === values.network);
  const plans = dataPlans[values.network] ?? [];
  const plan = plans.find((item) => item.id === values.plan);
  const total = plan?.price ?? 0;

  function updateField<K extends keyof DataValues>(
    field: K,
    value: DataValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
      ...(field === "network" ? { plan: "" } : {}),
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      ...(field === "network" ? { plan: undefined } : {}),
    }));
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

    if (!values.plan) {
      nextErrors.plan = "Select a data plan";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate() || !plan) return;

    toast.add({
      type: "success",
      title: "Data purchase successful",
      description: `${plan.size} (${plan.validity}) of ${network?.name} data has been sent to ${formatPhone(values.phone)}.`,
    });

    setValues((current) => ({
      ...current,
      phone: "",
      plan: "",
    }));
  }

  return (
    <AppLayout
      title="Buy data"
      description="Choose an affordable data plan for any network."
    >
      <ServiceLayout
        form={
          <div className="space-y-5">
            <ServiceFormHeader
              title="Data bundle"
              description="Select a network, enter the phone number and pick a plan."
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
              title="Data plan"
              extra={
                <span className="text-xs text-muted-foreground">
                  {plans.length} plans available
                </span>
              }
            >
              <SelectionGrid
                value={values.plan}
                onChange={(value: string) => updateField("plan", value)}
                options={plans.map((item) => ({
                  value: item.id,
                  label: item.size,
                  description: item.validity,
                  trailing: (
                    <span className="shrink-0 text-xs font-semibold text-primary">
                      {formatNaira(item.price, 0)}
                    </span>
                  ),
                }))}
              />

              {errors.plan && (
                <p className="mt-2 text-sm text-destructive">
                  {errors.plan}
                </p>
              )}
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
              {
                label: "Data plan",
                value: plan ? `${plan.size} · ${plan.validity}` : "—",
              },
              { label: "Service fee", value: "₦0.00" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                className="w-full"
                size="lg"
                disabled={!plan || !values.phone}
                onClick={handleSubmit}
              >
                Buy data
              </Button>
            }
            note="Data is delivered instantly after payment."
          />
        }
      />
    </AppLayout>
  );
}