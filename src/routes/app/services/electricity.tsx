import { createFileRoute } from "@tanstack/react-router";
import { App, Button, Form, Input, Segmented, Typography } from "antd";

import { AppLayout } from "@/components/app/layout";
import { BrandBadge } from "@/components/app/brand-badge";
import { SelectionGrid } from "@/components/app/selection-grid";
import {
  FormSection,
  ServiceFormHeader,
  ServiceLayout,
} from "@/components/app/service-layout";
import { SummaryCard } from "@/components/app/summary-card";
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
  const { modal } = App.useApp();
  const [form] = Form.useForm<ElectricityValues>();

  const providerId = Form.useWatch("provider", form) ?? "ikeja";
  const meterType = Form.useWatch("meterType", form) ?? "prepaid";
  const meterNumber = Form.useWatch("meterNumber", form);
  const amount = Number(Form.useWatch("amount", form) ?? 0);

  const provider = electricityProviders.find((item) => item.id === providerId);
  const total = Number.isFinite(amount) ? amount : 0;

  function handleSubmit(values: ElectricityValues) {
    modal.success({
      title: "Payment successful",
      content:
        values.meterType === "prepaid"
          ? `${formatNaira(Number(values.amount))} has been paid to ${provider?.name}. Your prepaid token was sent to your email.`
          : `${formatNaira(Number(values.amount))} has been paid to ${provider?.name} for meter ${values.meterNumber}.`,
      okText: "Done",
    });

    form.resetFields(["meterNumber", "amount"]);
  }

  return (
    <AppLayout
      title="Electricity"
      description="Pay prepaid and postpaid bills across all distribution companies."
    >
      <ServiceLayout
        form={
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              provider: "ikeja",
              meterType: "prepaid",
              meterNumber: "",
              amount: "",
            }}
            onValuesChange={(changed) => {
              if (changed.provider) form.setFieldValue("amount", "");
            }}
            onFinish={handleSubmit}
          >
            <ServiceFormHeader
              title="Electricity bill"
              description="Select your distribution company and enter your meter details."
            />

            <div className="space-y-5">
              <Form.Item
                name="provider"
                label="Distribution company"
                rules={[{ required: true, message: "Select a provider" }]}
              >
                <SelectionGrid
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
              </Form.Item>

              <FormSection title="Meter type">
                <Form.Item name="meterType" className="mb-0!">
                  <Segmented
                    block
                    options={[
                      { label: "Prepaid", value: "prepaid" },
                      { label: "Postpaid", value: "postpaid" },
                    ]}
                  />
                </Form.Item>
              </FormSection>

              <Form.Item
                name="meterNumber"
                label="Meter number"
                normalize={(value: string) =>
                  value.replace(/\D/g, "").slice(0, 13)
                }
                rules={[
                  { required: true, message: "Enter your meter number" },
                  {
                    min: 10,
                    message: "Meter number must be at least 10 digits",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your meter number"
                  inputMode="numeric"
                  maxLength={13}
                />
              </Form.Item>

              <FormSection
                title="Amount"
                extra={
                  <Typography.Text type="secondary" className="text-xs">
                    {meterType === "prepaid" ? "Prepaid" : "Postpaid"}
                  </Typography.Text>
                }
              >
                <div className="mb-3 grid grid-cols-3 gap-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset}
                      block
                      type={amount === preset ? "primary" : "default"}
                      onClick={() =>
                        form.setFieldValue("amount", String(preset))
                      }
                    >
                      {formatNaira(preset, 0)}
                    </Button>
                  ))}
                </div>

                <Form.Item
                  name="amount"
                  className="mb-0!"
                  normalize={(value: string) =>
                    value.replace(/[^\d.]/g, "")
                  }
                  rules={[
                    { required: true, message: "Enter an amount" },
                    {
                      validator: (_, value: string) => {
                        const numeric = Number(value);

                        if (!value) return Promise.resolve();

                        if (!Number.isFinite(numeric) || numeric < 500) {
                          return Promise.reject(
                            new Error("The minimum amount is ₦500"),
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    prefix="₦"
                    placeholder="Enter a custom amount"
                    inputMode="decimal"
                  />
                </Form.Item>
              </FormSection>
            </div>
          </Form>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Provider", value: provider?.name ?? "—" },
              {
                label: "Meter type",
                value: meterType === "prepaid" ? "Prepaid" : "Postpaid",
              },
              { label: "Meter number", value: meterNumber || "—" },
              { label: "Service fee", value: "₦0.00" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                type="primary"
                block
                size="large"
                disabled={!provider || total < 500 || !meterNumber}
                onClick={() => form.submit()}
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
