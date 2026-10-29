import { createFileRoute } from "@tanstack/react-router";
import { Button, Card, Collapse, Typography } from "antd";
import {
  ClockCircleOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

import { AppLayout } from "@/components/app/layout";

export const Route = createFileRoute("/app/support")({
  component: SupportPage,
});

const { Text, Title } = Typography;

const contactOptions = [
  {
    title: "Live chat",
    description: "Chat with our team on WhatsApp.",
    icon: MessageOutlined,
    action: "Start chat",
    href: "https://wa.me/2348000000000",
  },
  {
    title: "Email support",
    description: "We usually reply within a few hours.",
    icon: MailOutlined,
    action: "Send email",
    href: "mailto:support@subs.ng",
  },
  {
    title: "Call us",
    description: "Available Monday to Saturday, 8am – 8pm.",
    icon: PhoneOutlined,
    action: "Call now",
    href: "tel:+2348000000000",
  },
];

const faqs = [
  {
    key: "1",
    label: "How long does wallet funding take?",
    children:
      "Bank transfers are confirmed automatically within a few minutes. If your wallet is not credited after 15 minutes, contact support with your transfer reference.",
  },
  {
    key: "2",
    label: "What should I do if my data or airtime did not arrive?",
    children:
      "Most orders are delivered instantly. If your order is still pending, wait a few minutes and refresh the transaction. If it fails, the amount is reversed automatically.",
  },
  {
    key: "3",
    label: "How do I withdraw my commission?",
    children:
      "Open the Commissions page, enter the amount and your bank details, then submit your withdrawal request. Funds are sent to your bank account within minutes.",
  },
  {
    key: "4",
    label: "Can I use one account for my family?",
    children:
      "Yes. Your wallet can pay for any network and any meter or smartcard number. Just enter the correct details before confirming each payment.",
  },
];

function SupportPage() {
  return (
    <AppLayout
      title="Help & support"
      description="We are available every day to help with your account and transactions."
    >
      <div className="mx-auto max-w-4xl space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          {contactOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Card
                key={option.title}
                className="h-full rounded-2xl border-gray-200"
                styles={{ body: { padding: 20 } }}
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
                  <Icon />
                </div>
                <Title level={5} className="mb-1! mt-4!">
                  {option.title}
                </Title>
                <Text type="secondary" className="block text-sm">
                  {option.description}
                </Text>

                <Button
                  block
                  className="mt-4!"
                  href={option.href}
                  target={option.href.startsWith("https://") ? "_blank" : undefined}
                  rel={
                    option.href.startsWith("https://")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {option.action}
                </Button>
              </Card>
            );
          })}
        </div>

        <Card className="rounded-2xl border-gray-200" styles={{ body: { padding: 20 } }}>
          <Title level={5} className="mb-1!">
            Frequently asked questions
          </Title>
          <Text type="secondary" className="text-sm">
            Quick answers to the questions we get most often.
          </Text>

          <Collapse
            ghost
            className="mt-2"
            items={faqs.map((faq) => ({
              key: faq.key,
              label: <Text strong>{faq.label}</Text>,
              children: (
                <Text type="secondary" className="text-sm">
                  {faq.children}
                </Text>
              ),
            }))}
          />
        </Card>

        <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3">
          <ClockCircleOutlined className="text-gray-500" />
          <Text type="secondary" className="text-sm">
            Average response time: under 10 minutes during support hours.
          </Text>
        </div>
      </div>
    </AppLayout>
  );
}
