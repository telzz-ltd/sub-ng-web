import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, Copy01Icon } from "@hugeicons/core-free-icons";

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
import { networks } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/services/recharge-card")({
  component: RechargeCardPage,
});

const denominations = [100, 200, 500, 1000, 2000, 5000];

type RechargeValues = {
  network: string;
  denomination: string;
  quantity: number;
};

function generatePin() {
  return Array.from({ length: 4 }, () =>
    Math.floor(1000 + Math.random() * 9000),
  ).join("-");
}

function RechargeCardPage() {
  const [values, setValues] = useState<RechargeValues>({
    network: "mtn",
    denomination: "100",
    quantity: 1,
  });
  const [pins, setPins] = useState<string[]>([]);
  const [showPins, setShowPins] = useState(false);

  const network = networks.find((item) => item.id === values.network);
  const denomination = Number(values.denomination);
  const total = denomination * values.quantity;

  function updateField<K extends keyof RechargeValues>(
    field: K,
    value: RechargeValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit() {
    if (!network || denomination <= 0 || values.quantity < 1) return;

    setPins(Array.from({ length: values.quantity }, generatePin));
    setShowPins(true);
    setValues((current) => ({ ...current, denomination: "100", quantity: 1 }));
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
      title="Recharge cards"
      description="Generate recharge PINs for any network in seconds."
    >
      <ServiceLayout
        form={
          <div>
            <ServiceFormHeader
              title="Buy recharge card"
              description="Pick a network, denomination and quantity."
            />

            <div className="space-y-5">
              <FormSection title="Network">
                <SelectionGrid
                  columns={2}
                  value={values.network}
                  onChange={(value) => updateField("network", value)}
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
              </FormSection>

              <FormSection title="Denomination">
                <SelectionGrid
                  columns={3}
                  value={values.denomination}
                  onChange={(value) => updateField("denomination", value)}
                  options={denominations.map((value) => ({
                    value: String(value),
                    label: formatNaira(value, 0),
                  }))}
                />
              </FormSection>

              <FormSection title="Quantity">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Number of PINs</Label>
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
                    You can generate up to 5 PINs per transaction.
                  </p>
                </div>
              </FormSection>
            </div>
          </div>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Network", value: network?.name ?? "—" },
              {
                label: "Denomination",
                value: formatNaira(denomination, 0),
              },
              { label: "Quantity", value: values.quantity },
              {
                label: "Unit price",
                value: formatNaira(denomination, 0),
              },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                className="w-full"
                size="lg"
                disabled={!network || total <= 0}
                onClick={handleSubmit}
              >
                Generate PINs
              </Button>
            }
            note="Your PINs will be displayed immediately after purchase."
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
                <h3 className="font-semibold">Recharge cards generated</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {pins.length} recharge card{pins.length > 1 ? "s" : ""} for{" "}
                {network?.name}.
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