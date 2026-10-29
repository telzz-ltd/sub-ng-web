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
import { cableProviders } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/services/cable-tv")({
  component: CableTvPage,
});

const { Text } = Typography;

type CableValues = {
  provider: string;
  smartcard: string;
  plan: string;
};

function CableTvPage() {
  const { modal } = App.useApp();
  const [form] = Form.useForm<CableValues>();

  const providerId = Form.useWatch("provider", form) ?? "dstv";
  const smartcard = Form.useWatch("smartcard", form);
  const planId = Form.useWatch("plan", form);

  const provider = cableProviders.find((item) => item.id === providerId);
  const plans = provider?.plans ?? [];
  const plan = plans.find((item) => item.id === planId);
  const total = plan?.price ?? 0;

  function handleSubmit(values: CableValues) {
    if (!plan) return;

    modal.success({
      title: "Subscription successful",
      content: `${provider?.name} ${plan.name} has been activated for smartcard ${values.smartcard}.`,
      okText: "Done",
    });

    form.resetFields(["smartcard", "plan"]);
  }

  return (
    <AppLayout
      title="Cable TV"
      description="Renew your DStv, GOtv or StarTimes subscription."
    >
      <ServiceLayout
        form={
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{ provider: "dstv", smartcard: "", plan: "" }}
            onValuesChange={(changed) => {
              if (changed.provider) form.setFieldValue("plan", "");
            }}
            onFinish={handleSubmit}
          >
            <ServiceFormHeader
              title="Cable subscription"
              description="Select your provider, enter the smartcard number and choose a package."
            />

            <div className="space-y-5">
              <Form.Item
                name="provider"
                label="Provider"
                rules={[{ required: true, message: "Select a provider" }]}
              >
                <SelectionGrid
                  columns={3}
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
              </Form.Item>

              <Form.Item
                name="smartcard"
                label="Smartcard / IUC number"
                normalize={(value: string) =>
                  value.replace(/\D/g, "").slice(0, 12)
                }
                rules={[
                  { required: true, message: "Enter the smartcard number" },
                  {
                    min: 10,
                    message: "Smartcard number must be at least 10 digits",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your smartcard number"
                  inputMode="numeric"
                  maxLength={12}
                />
              </Form.Item>

              <FormSection
                title="Package"
                extra={
                  <Text type="secondary" className="text-xs">
                    {plans.length} packages
                  </Text>
                }
              >
                <Form.Item
                  name="plan"
                  className="mb-0!"
                  rules={[{ required: true, message: "Select a package" }]}
                >
                  <SelectionGrid
                    options={plans.map((item) => ({
                      value: item.id,
                      label: item.name,
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
              { label: "Provider", value: provider?.name ?? "—" },
              { label: "Smartcard", value: smartcard || "—" },
              { label: "Package", value: plan?.name ?? "—" },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                type="primary"
                block
                size="large"
                disabled={!plan || !smartcard}
                onClick={() => form.submit()}
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
