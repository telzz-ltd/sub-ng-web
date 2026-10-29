import { createFileRoute } from "@tanstack/react-router";
import { App, Button, Form, InputNumber, Typography } from "antd";

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
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/app/services/recharge-card")({
  component: RechargeCardPage,
});

const { Text } = Typography;

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
  const { modal } = App.useApp();
  const [form] = Form.useForm<RechargeValues>();

  const networkId = Form.useWatch("network", form) ?? "mtn";
  const denomination = Number(Form.useWatch("denomination", form) ?? 0);
  const quantity = Number(Form.useWatch("quantity", form) ?? 1);

  const network = networks.find((item) => item.id === networkId);
  const total = denomination * quantity;

  function handleSubmit(values: RechargeValues) {
    const pins = Array.from({ length: values.quantity }, generatePin);

    modal.success({
      title: "Recharge cards generated",
      width: 460,
      content: (
        <div className="space-y-2">
          <Text type="secondary">
            {values.quantity} × {formatNaira(Number(values.denomination), 0)}{" "}
            {network?.name} PIN{values.quantity > 1 ? "s" : ""}
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

    form.setFieldsValue({ denomination: "100", quantity: 1 });
  }

  return (
    <AppLayout
      title="Recharge cards"
      description="Generate recharge PINs for any network in seconds."
    >
      <ServiceLayout
        form={
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={{ network: "mtn", denomination: "100", quantity: 1 }}
            onFinish={handleSubmit}
          >
            <ServiceFormHeader
              title="Buy recharge card"
              description="Pick a network, denomination and quantity."
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

              <FormSection title="Denomination">
                <Form.Item
                  name="denomination"
                  className="mb-0!"
                  rules={[{ required: true, message: "Select a denomination" }]}
                >
                  <SelectionGrid
                    columns={3}
                    options={denominations.map((value) => ({
                      value: String(value),
                      label: formatNaira(value, 0),
                    }))}
                  />
                </Form.Item>
              </FormSection>

              <FormSection title="Quantity">
                <Form.Item
                  name="quantity"
                  className="mb-0!"
                  rules={[{ required: true, message: "Enter a quantity" }]}
                >
                  <InputNumber min={1} max={5} className="w-full!" />
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
                label: "Denomination",
                value: formatNaira(denomination, 0),
              },
              { label: "Quantity", value: quantity },
              {
                label: "Unit price",
                value: formatNaira(denomination, 0),
              },
            ]}
            total={formatNaira(total)}
            action={
              <Button
                type="primary"
                block
                size="large"
                disabled={!network || total <= 0}
                onClick={() => form.submit()}
              >
                Generate PINs
              </Button>
            }
            note="Your PINs will be displayed immediately after purchase."
          />
        }
      />
    </AppLayout>
  );
}
