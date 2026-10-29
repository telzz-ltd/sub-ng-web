import { createFileRoute } from "@tanstack/react-router";
import { App, Button, Form, Input, InputNumber, Typography } from "antd";

import { AppLayout } from "@/components/app/layout";
import { BrandBadge } from "@/components/app/brand-badge";
import { SelectionGrid } from "@/components/app/selection-grid";
import {
  FormSection,
  ServiceFormHeader,
  ServiceLayout,
} from "@/components/app/service-layout";
import { SummaryCard } from "@/components/app/summary-card";
import { examProviders } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/services/exam-card")({
  component: ExamCardPage,
});

const { Text } = Typography;

type ExamValues = {
  provider: string;
  quantity: number;
  email: string;
};

function generatePin() {
  return Math.random().toString(36).slice(2, 14).toUpperCase();
}

function ExamCardPage() {
  const { modal } = App.useApp();
  const [form] = Form.useForm<ExamValues>();

  const providerId = Form.useWatch("provider", form) ?? "waec";
  const quantity = Number(Form.useWatch("quantity", form) ?? 1);

  const provider = examProviders.find((item) => item.id === providerId);
  const total = (provider?.price ?? 0) * quantity;

  function handleSubmit(values: ExamValues) {
    if (!provider) return;

    const pins = Array.from({ length: values.quantity }, generatePin);

    modal.success({
      title: "Exam cards purchased",
      width: 460,
      content: (
        <div className="space-y-2">
          <Text type="secondary">
            {values.quantity} × {provider.name} card
            {values.quantity > 1 ? "s" : ""} sent to {values.email}
          </Text>

          <div className="rounded-xl bg-gray-50 p-3 font-mono text-sm">
            {pins.map((pin) => (
              <div key={pin}>{pin}</div>
            ))}
          </div>
        </div>
      ),
      okText: "Done",
    });

    form.resetFields(["quantity", "email"]);
  }

  return (
    <AppLayout
      title="Exam cards"
      description="Buy WAEC, NECO, JAMB and NABTEB result checker PINs."
    >
      <ServiceLayout
        form={
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{ provider: "waec", quantity: 1, email: "" }}
            onFinish={handleSubmit}
          >
            <ServiceFormHeader
              title="Buy exam card"
              description="Select an exam body and the number of cards you need."
            />

            <div className="space-y-5">
              <Form.Item
                name="provider"
                label="Exam body"
                rules={[{ required: true, message: "Select an exam body" }]}
              >
                <SelectionGrid
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
              </Form.Item>

              <FormSection title="Quantity">
                <Form.Item
                  name="quantity"
                  className="mb-0!"
                  rules={[{ required: true, message: "Enter a quantity" }]}
                >
                  <InputNumber min={1} max={5} className="w-full!" />
                </Form.Item>
              </FormSection>

              <Form.Item
                name="email"
                label="Delivery email"
                rules={[
                  { required: true, message: "Enter your email address" },
                  { type: "email", message: "Enter a valid email address" },
                ]}
              >
                <Input placeholder="name@example.com" autoComplete="email" />
              </Form.Item>
            </div>
          </Form>
        }
        summary={
          <SummaryCard
            rows={[
              { label: "Exam body", value: provider?.name ?? "—" },
              { label: "Unit price", value: formatNaira(provider?.price ?? 0) },
              { label: "Quantity", value: quantity },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                type="primary"
                block
                size="large"
                disabled={!provider || total <= 0}
                onClick={() => form.submit()}
              >
                Buy exam card
              </Button>
            }
            note="Your PINs will be sent to the email address provided."
          />
        }
      />
    </AppLayout>
  );
}
