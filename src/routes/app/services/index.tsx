import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, Typography } from "antd";
import {
  CreditCardOutlined,
  FileTextOutlined,
  MobileOutlined,
  PlayCircleOutlined,
  SwapOutlined,
  ThunderboltOutlined,
  WifiOutlined,
} from "@ant-design/icons";

import { AppLayout } from "@/components/app/layout";

export const Route = createFileRoute("/app/services/")({
  component: ServicesPage,
});

const { Text, Paragraph } = Typography;

const services = [
  {
    to: "/app/services/airtime",
    title: "Airtime",
    description: "Top up any network instantly.",
    icon: MobileOutlined,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    to: "/app/services/data",
    title: "Data bundles",
    description: "Affordable plans for every network.",
    icon: WifiOutlined,
    tone: "bg-violet-50 text-violet-600",
  },
  {
    to: "/app/services/recharge-card",
    title: "Recharge cards",
    description: "Generate PINs in seconds.",
    icon: CreditCardOutlined,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    to: "/app/services/airtime-to-cash",
    title: "Airtime to cash",
    description: "Convert unused airtime to money.",
    icon: SwapOutlined,
    tone: "bg-lime-50 text-lime-700",
  },
  {
    to: "/app/services/cable-tv",
    title: "Cable TV",
    description: "Renew DStv, GOtv and StarTimes.",
    icon: PlayCircleOutlined,
    tone: "bg-cyan-50 text-cyan-600",
  },
  {
    to: "/app/services/electricity",
    title: "Electricity",
    description: "Pay prepaid and postpaid bills.",
    icon: ThunderboltOutlined,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    to: "/app/services/exam-card",
    title: "Exam cards",
    description: "Buy WAEC, NECO, JAMB and NABTEB.",
    icon: FileTextOutlined,
    tone: "bg-pink-50 text-pink-600",
  },
] as const;

function ServicesPage() {
  return (
    <AppLayout
      title="Services"
      description="Everything you can pay for with your Subs.NG wallet."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <Link key={service.to} to={service.to} className="block">
              <Card
                hoverable
                className="h-full rounded-2xl border-gray-200"
                styles={{ body: { padding: 20 } }}
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-xl text-lg ${service.tone}`}
                >
                  <Icon />
                </div>
                <Text strong className="mt-4 block text-base">
                  {service.title}
                </Text>
                <Paragraph className="mb-0! mt-1! text-sm! text-gray-500!">
                  {service.description}
                </Paragraph>
              </Card>
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
}
