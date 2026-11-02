
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";

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
import { examProviders } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/services/exam-card")({
  component: ExamCardPage,
});

type ExamValues = {
  provider: string;
  quantity: number;
  email: string;
};

function generatePin() {
  return Math.random().toString(36).slice(2, 14).toUpperCase();
}

function ExamCardPage() {
  const [values, setValues] = useState<ExamValues>({
    provider: "waec",
    quantity: 1,
    email: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ExamValues, string>>
  >({});

  const [pins, setPins] = useState<string[]>([]);
  const [showPins, setShowPins] = useState(false);

  const provider = examProviders.find(
    (item) => item.id === values.provider,
  );

  const total = (provider?.price ?? 0) * values.quantity;

  function updateField<K extends keyof ExamValues>(
    field: K,
    value: ExamValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: typeof errors = {};

    if (!values.provider) {
      nextErrors.provider = "Select an exam body";
    }

    if (values.quantity < 1 || values.quantity > 5) {
      nextErrors.quantity = "Quantity must be between 1 and 5";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate() || !provider) return;

    setPins(Array.from({ length: values.quantity }, generatePin));
    setShowPins(true);

    setValues((current) => ({
      ...current,
      quantity: 1,
      email: "",
    }));
  }

  async function copyPins() {
    try {
      await navigator.clipboard.writeText(pins.join("\n"));
      toast.add({ type: "success", title: "PINs copied" });
    } catch {
      toast.add({ type: "error", title: "Unable to copy PINs" });
    }
  }

  return (
    <AppLayout
      title="Exam cards"
      description="Buy WAEC, NECO, JAMB and NABTEB result checker PINs."
    >
      <ServiceLayout
        form={
          <div>
            <ServiceFormHeader
              title="Buy exam card"
              description="Select an exam body and the number of cards you need."
            />

            <div className="space-y-5">
              <FormSection title="Exam body">
                <SelectionGrid
                  columns={2}
                  value={values.provider}
                  onChange={(value) => updateField("provider", value)}
                  options={examProviders.map((item) => ({
                    value: item.id,
                    label: item.name,
                    description: item.description,
                    leading: (
                      <BrandBadge
                        label={item.name.slice(0, 2)}
                        className="bg-pink-50 text-pink-700"
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

              <FormSection title="Quantity">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Number of cards</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={5}
                    value={values.quantity}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      updateField(
                        "quantity",
                        Math.min(5, Math.max(1, value || 1)),
                      );
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    You can purchase up to 5 cards per transaction.
                  </p>
                  {errors.quantity && (
                    <p className="text-xs text-destructive">
                      {errors.quantity}
                    </p>
                  )}
                </div>
              </FormSection>

              <div className="space-y-2">
                <Label htmlFor="email">Delivery email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Exam body", value: provider?.name ?? "—" },
              {
                label: "Unit price",
                value: formatNaira(provider?.price ?? 0),
              },
              { label: "Quantity", value: values.quantity },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                className="w-full"
                size="lg"
                disabled={!provider || total <= 0}
                onClick={handleSubmit}
              >
                Buy exam card
              </Button>
            }
            note="Your PINs will be sent to the email address provided."
          />
        }
      />

      {showPins && (
        <div className="mx-auto mt-5 w-full max-w-5xl rounded-2xl border bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="size-5 text-green-600"
                />
                <h3 className="font-semibold">Exam cards purchased</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {pins.length} {provider?.name} card
                {pins.length > 1 ? "s" : ""} generated.
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={copyPins}>
              <HugeiconsIcon icon={Copy01Icon} className="size-4" />
              Copy PINs
            </Button>
          </div>

          <div className="space-y-2 rounded-xl bg-muted p-4 font-mono text-sm">
            {pins.map((pin, index) => (
              <div key={`${pin}-${index}`}>{pin}</div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
}
