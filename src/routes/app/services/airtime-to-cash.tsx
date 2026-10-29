import { createFileRoute } from "@tanstack/react-router";
import { App, Button, Form, Input, Select, Typography } from "antd";

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
import { formatNaira, formatPhone, isValidNgPhone } from "@/lib/format";

export const Route = createFileRoute("/app/services/airtime-to-cash")({
  component: AirtimeToCashPage,
});

const { Text } = Typography;

const presets = [500, 1000, 2000, 5000, 10000];
const payoutRate = 0.8;

const bankOptions = banks.map((bank) => ({ label: bank, value: bank }));

type AirtimeToCashValues = {
  network: string;
  phone: string;
  amount: string;
  bank: string;
  accountNumber: string;
  accountName: string;
};

function AirtimeToCashPage() {
  const { modal } = App.useApp();
  const [form] = Form.useForm<AirtimeToCashValues>();

  const networkId = Form.useWatch("network", form) ?? "mtn";
  const phone = Form.useWatch("phone", form);
  const amount = Number(Form.useWatch("amount", form) ?? 0);

  const network = networks.find((item) => item.id === networkId);
  const payout = Math.floor((Number.isFinite(amount) ? amount : 0) * payoutRate);

  function handleSubmit(values: AirtimeToCashValues) {
    const value = Number(values.amount);

    modal.success({
      title: "Airtime conversion submitted",
      content: `${formatNaira(value)} of ${network?.name} airtime from ${formatPhone(values.phone)} is being converted. ${formatNaira(Math.floor(value * payoutRate))} will be sent to ${values.bank} • ${values.accountNumber}.`,
      okText: "Done",
    });

    form.resetFields(["phone", "amount"]);
  }

  return (
    <AppLayout
      title="Airtime to cash"
      description="Convert unused airtime into money in your bank account."
    >
      <ServiceLayout
        form={
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{
              network: "mtn",
              phone: "",
              amount: "",
              bank: undefined,
              accountNumber: "",
              accountName: "",
            }}
            onFinish={handleSubmit}
          >
            <ServiceFormHeader
              title="Convert airtime"
              description={`Get ${payoutRate * 100}% of your airtime value paid into your bank account.`}
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

              <FormSection
                title="Airtime amount"
                extra={
                  <Text type="secondary" className="text-xs">
                    Payout rate {payoutRate * 100}%
                  </Text>
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

              <FormSection title="Bank account">
                <Form.Item
                  name="bank"
                  rules={[{ required: true, message: "Select your bank" }]}
                >
                  <Select placeholder="Select your bank" options={bankOptions} />
                </Form.Item>

                <Form.Item
                  name="accountNumber"
                  normalize={(value: string) =>
                    value.replace(/\D/g, "").slice(0, 10)
                  }
                  rules={[
                    { required: true, message: "Enter your account number" },
                    { len: 10, message: "Account number must be 10 digits" },
                  ]}
                >
                  <Input
                    placeholder="Account number"
                    inputMode="numeric"
                    maxLength={10}
                  />
                </Form.Item>

                <Form.Item
                  name="accountName"
                  className="mb-0!"
                  rules={[
                    { required: true, message: "Enter your account name" },
                  ]}
                >
                  <Input placeholder="Account name" />
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
              { label: "Airtime value", value: formatNaira(amount) },
              { label: "Payout rate", value: `${payoutRate * 100}%` },
            ]}
            total={formatNaira(payout)}
            totalLabel="You receive"
            action={
              <Button
                type="primary"
                block
                size="large"
                disabled={amount < 500 || !phone}
                onClick={() => form.submit()}
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
