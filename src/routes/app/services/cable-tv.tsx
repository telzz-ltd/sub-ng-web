
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
import { toast } from "@/components/ui/toast";
import { cableProviders } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/services/cable-tv")({
  component: CableTvPage,
});

type CableValues = {
  provider: string;
  smartcard: string;
  plan: string;
};

function CableTvPage() {
  const [values, setValues] = useState<CableValues>({
    provider: "dstv",
    smartcard: "",
    plan: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CableValues, string>>
  >({});

  const provider = cableProviders.find(
    (item) => item.id === values.provider,
  );

  const plans = provider?.plans ?? [];
  const plan = plans.find((item) => item.id === values.plan);
  const total = plan?.price ?? 0;

  function updateField<K extends keyof CableValues>(
    field: K,
    value: CableValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
      ...(field === "provider" ? { plan: "" } : {}),
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      ...(field === "provider" ? { plan: undefined } : {}),
    }));
  }

  function validate() {
    const nextErrors: typeof errors = {};

    if (!values.provider) {
      nextErrors.provider = "Select a provider";
    }

    if (!values.smartcard) {
      nextErrors.smartcard = "Enter the smartcard number";
    } else if (values.smartcard.length < 10) {
      nextErrors.smartcard =
        "Smartcard number must be at least 10 digits";
    }

    if (!values.plan) {
      nextErrors.plan = "Select a package";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate() || !plan || !provider) return;

    toast.add({
      type: "success",
      title: "Subscription successful",
      description: `${provider.name} ${plan.name} has been activated for smartcard ${values.smartcard}.`,
    });

    setValues((current) => ({
      ...current,
      smartcard: "",
      plan: "",
    }));
  }

  return (
    <AppLayout
      title="Cable TV"
      description="Renew your DStv, GOtv or StarTimes subscription."
    >
      <ServiceLayout
        form={
          <div>
            <ServiceFormHeader
              title="Cable subscription"
              description="Select your provider, enter the smartcard number and choose a package."
            />

            <div className="space-y-5">
              <FormSection title="Provider">
                <SelectionGrid
                  columns={3}
                  value={values.provider}
                  onChange={(value) => updateField("provider", value)}
                  options={cableProviders.map((item) => ({
                    value: item.id,
                    label: item.name,
                    leading: (
                      <BrandBadge
                        label={item.name.slice(0, 3).toUpperCase()}
                        className={`${item.background} ${item.foreground}`}
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

              <div className="space-y-2">
                <Label htmlFor="smartcard">
                  Smartcard / IUC number
                </Label>
                <Input
                  id="smartcard"
                  placeholder="Enter your smartcard number"
                  inputMode="numeric"
                  maxLength={12}
                  value={values.smartcard}
                  onChange={(event) =>
                    updateField(
                      "smartcard",
                      event.target.value.replace(/\D/g, "").slice(0, 12),
                    )
                  }
                />

                {errors.smartcard && (
                  <p className="text-xs text-destructive">
                    {errors.smartcard}
                  </p>
                )}
              </div>

              <FormSection
                title="Package"
                extra={
                  <span className="text-xs text-muted-foreground">
                    {plans.length} packages
                  </span>
                }
              >
                <SelectionGrid
                  columns={2}
                  value={values.plan}
                  onChange={(value) => updateField("plan", value)}
                  options={plans.map((item) => ({
                    value: item.id,
                    label: item.name,
                    trailing: (
                      <span className="shrink-0 text-xs font-semibold text-blue-700">
                        {formatNaira(item.price, 0)}
                      </span>
                    ),
                  }))}
                />

                {errors.plan && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.plan}
                  </p>
                )}
              </FormSection>
            </div>
          </div>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Provider", value: provider?.name ?? "—" },
              { label: "Smartcard", value: values.smartcard || "—" },
              { label: "Package", value: plan?.name ?? "—" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                className="w-full"
                size="lg"
                disabled={!plan || !values.smartcard}
                onClick={handleSubmit}
              >
                Pay subscription
              </Button>
            }
            note="Subscriptions are activated instantly after payment."
          />
        }
      />
    </AppLayout>
  );
}
