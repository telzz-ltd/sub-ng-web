import { createFileRoute } from "@tanstack/react-router";
import { App, Button, Form, Input, Typography } from "antd";

import { AppLayout } from "@/components/app/layout";
import { BrandBadge } from "@/components/app/brand-badge";
import { SelectionGrid } from "@/components/app/selection-grid";
import {
  FormSection,
  ServiceFormHeader,
  ServiceLayout,
} from "@/components/app/service-layout";
import { SummaryCard } from "@/components/app/summary-card";
import { dataPlans, networks } from "@/lib/catalog";
import { formatNaira, formatPhone, isValidNgPhone } from "@/lib/format";

export const Route = createFileRoute("/app/services/data")({
  component: DataPage,
});

const { Text } = Typography;

type DataValues = {
  network: string;
  phone: string;
  plan: string;
};

function DataPage() {
  const { modal } = App.useApp();
  const [form] = Form.useForm<DataValues>();

  const networkId = Form.useWatch("network", form) ?? "mtn";
  const phone = Form.useWatch("phone", form);
  const planId = Form.useWatch("plan", form);

  const network = networks.find((item) => item.id === networkId);
  const plans = dataPlans[networkId] ?? [];
  const plan = plans.find((item) => item.id === planId);
  const total = plan?.price ?? 0;

  function handleSubmit(values: DataValues) {
    if (!plan) return;

    modal.success({
      title: "Data purchase successful",
      content: `${plan.size} (${plan.validity}) of ${network?.name} data has been sent to ${formatPhone(values.phone)}.`,
      okText: "Done",
    });

    form.resetFields(["phone", "plan"]);
  }

  return (
    <AppLayout
      title="Buy data"
      description="Choose an affordable data plan for any network."
    >
      <ServiceLayout
        form={
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{ network: "mtn", phone: "", plan: "" }}
            onValuesChange={(changed) => {
              if (changed.network) form.setFieldValue("plan", "");
            }}
            onFinish={handleSubmit}
          >
            <ServiceFormHeader
              title="Data bundle"
              description="Select a network, enter the phone number and pick a plan."
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
                title="Data plan"
                extra={
                  <Text type="secondary" className="text-xs">
                    {plans.length} plans available
                  </Text>
                }
              >
                <Form.Item
                  name="plan"
                  className="mb-0!"
                  rules={[{ required: true, message: "Select a data plan" }]}
                >
                  <SelectionGrid
                    options={plans.map((item) => ({
                      value: item.id,
                      label: item.size,
                      description: item.validity,
                      trailing: (
                        <Text strong className="shrink-0 text-xs text-blue-700">
                          {formatNaira(item.price, 0)}
                        </Text>
                      ),
                    }))}
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
              {
                label: "Data plan",
                value: plan ? `${plan.size} · ${plan.validity}` : "—",
              },
              { label: "Service fee", value: "₦0.00" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                type="primary"
                block
                size="large"
                disabled={!plan || !phone}
                onClick={() => form.submit()}
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
