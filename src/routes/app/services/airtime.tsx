import { createFileRoute } from "@tanstack/react-router";
import { App, Button, Form, Input } from "antd";

import { AppLayout } from "@/components/app/layout";
import { BrandBadge } from "@/components/app/brand-badge";
import { SelectionGrid } from "@/components/app/selection-grid";
import {
  FormSection,
  ServiceFormHeader,
  ServiceLayout,
} from "@/components/app/service-layout";
import { SummaryCard } from "@/components/app/summary-card";
import { networks } from "@/lib/catalog";
import { formatNaira, formatPhone, isValidNgPhone } from "@/lib/format";

export const Route = createFileRoute("/app/services/airtime")({
  component: AirtimePage,
});

const presets = [100, 200, 500, 1000, 2000, 5000];

type AirtimeValues = {
  network: string;
  phone: string;
  amount: string;
};

function AirtimePage() {
  const { modal } = App.useApp();
  const [form] = Form.useForm<AirtimeValues>();

  const networkId = Form.useWatch("network", form);
  const phone = Form.useWatch("phone", form);
  const amount = Number(Form.useWatch("amount", form) ?? 0);

  const network = networks.find((item) => item.id === networkId);
  const total = Number.isFinite(amount) ? amount : 0;

  function handleSubmit(values: AirtimeValues) {
    modal.success({
      title: "Airtime purchase successful",
      content: `${formatNaira(Number(values.amount))} of ${network?.name} airtime has been sent to ${formatPhone(values.phone)}.`,
      okText: "Done",
    });

    form.resetFields(["phone", "amount"]);
  }

  return (
    <AppLayout
      title="Buy airtime"
      description="Top up any network instantly at the best rates."
    >
      <ServiceLayout
        form={
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{ network: "mtn", phone: "", amount: "" }}
            onValuesChange={(changed) => {
              if (changed.network) form.setFieldValue("amount", "");
            }}
            onFinish={handleSubmit}
          >
            <ServiceFormHeader
              title="Airtime top-up"
              description="Select a network and enter the phone number to top up."
            />

            <div className="space-y-5">
              <Form.Item
                name="network"
                label="Network"
                rules={[{ required: true, message: "Select a network" }]}
              >
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
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone number"
                normalize={(value: string) =>
                  value.replace(/\D/g, "").slice(0, 11)
                }
                rules={[
                  { required: true, message: "Enter the phone number" },
                  {
                    validator: (_, value: string) =>
                      !value || isValidNgPhone(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Enter a valid Nigerian phone number"),
                          ),
                  },
                ]}
              >
                <Input
                  placeholder="0801 234 5678"
                  inputMode="tel"
                  maxLength={11}
                />
              </Form.Item>

              <FormSection title="Amount">
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

                        if (!Number.isFinite(numeric) || numeric < 50) {
                          return Promise.reject(
                            new Error("The minimum amount is ₦50"),
                          );
                        }

                        if (numeric > 50000) {
                          return Promise.reject(
                            new Error("The maximum amount is ₦50,000"),
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
              { label: "Network", value: network?.name ?? "—" },
              {
                label: "Phone number",
                value: phone ? formatPhone(phone) : "—",
              },
              { label: "Amount", value: formatNaira(total) },
              { label: "Service fee", value: "₦0.00" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                type="primary"
                block
                size="large"
                disabled={!network || total < 50}
                onClick={() => form.submit()}
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
