import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Card, Flex, Typography } from "antd";
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  LockOutlined,
  MobileOutlined,
  PlayCircleOutlined,
  RiseOutlined,
  SafetyCertificateOutlined,
  SwapOutlined,
  ThunderboltOutlined,
  WifiOutlined,
} from "@ant-design/icons";

export const Route = createFileRoute("/_public/")({
  component: LandingPage,
});

const { Title, Paragraph, Text } = Typography;

const services = [
  {
    icon: MobileOutlined,
    title: "Airtime",
    description: "Top up any network instantly at the best rates.",
    tone: "bg-blue-50 text-blue-600",
  },
  {
    icon: WifiOutlined,
    title: "Data bundles",
    description: "Affordable data plans for MTN, Airtel, Glo and 9mobile.",
    tone: "bg-violet-50 text-violet-600",
  },
  {
    icon: CreditCardOutlined,
    title: "Recharge cards",
    description: "Generate recharge PINs for any network in seconds.",
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: SwapOutlined,
    title: "Airtime to cash",
    description: "Convert unused airtime into money in your wallet.",
    tone: "bg-lime-50 text-lime-700",
  },
  {
    icon: PlayCircleOutlined,
    title: "Cable TV",
    description: "Renew DStv, GOtv and StarTimes subscriptions.",
    tone: "bg-cyan-50 text-cyan-600",
  },
  {
    icon: ThunderboltOutlined,
    title: "Electricity",
    description: "Pay prepaid and postpaid bills across all discos.",
    tone: "bg-amber-50 text-amber-600",
  },
  {
    icon: FileTextOutlined,
    title: "Exam cards",
    description: "Buy WAEC, NECO, JAMB and NABTEB result checkers.",
    tone: "bg-pink-50 text-pink-600",
  },
  {
    icon: RiseOutlined,
    title: "Commissions",
    description: "Earn on every transaction you complete.",
    tone: "bg-indigo-50 text-indigo-600",
  },
];

const features = [
  {
    icon: LockOutlined,
    title: "Secure by design",
    description:
      "Every transaction is protected with encryption and real-time monitoring.",
  },
  {
    icon: ClockCircleOutlined,
    title: "Instant delivery",
    description:
      "Airtime, data and tokens are delivered the moment you pay.",
  },
  {
    icon: RiseOutlined,
    title: "Earn as you spend",
    description:
      "Get commission on transactions and withdraw directly to your bank.",
  },
  {
    icon: CustomerServiceOutlined,
    title: "Support that shows up",
    description:
      "Our team is available every day to help with any transaction.",
  },
];

const steps = [
  {
    title: "Create your account",
    description: "Sign up in under a minute with your name and email address.",
  },
  {
    title: "Fund your wallet",
    description: "Add money with a bank transfer or card payment.",
  },
  {
    title: "Pay for anything",
    description: "Buy airtime, data, TV, electricity and exam cards instantly.",
  },
];

function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.10),transparent_55%)]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
              <CheckCircleFilled />
              Trusted by thousands of Nigerians
            </span>

            <Title className="mt-5! mb-4! text-4xl! font-bold! leading-tight! tracking-tight! sm:text-5xl!">
              Pay bills, buy airtime and data — all in one place.
            </Title>

            <Paragraph className="mb-8! max-w-lg text-base! text-gray-600! sm:text-lg!">
              Subs.NG is the simple, reliable way to manage everyday payments.
              Fund your wallet once and pay for airtime, data, cable TV,
              electricity and exam cards in seconds.
            </Paragraph>

            <Flex wrap gap={12}>
              <Link to="/register">
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                  className="h-12! px-6! font-medium!"
                >
                  Get started free
                </Button>
              </Link>

              <Link to="/login">
                <Button size="large" className="h-12! px-6! font-medium!">
                  Sign in
                </Button>
              </Link>
            </Flex>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { value: "50k+", label: "Active users" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label}>
                  <Text strong className="block text-xl! text-gray-900!">
                    {stat.value}
                  </Text>
                  <Text type="secondary" className="text-xs">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-blue-100 via-sky-50 to-transparent" />

            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-xl shadow-blue-100/60">
              <img
                src="/app-mockup.png"
                alt="Subs.NG dashboard preview"
                className="max-h-[480px] w-full rounded-2xl object-cover object-top"
              />
            </div>

            <Card
              className="absolute -bottom-6 -left-4 w-56 rounded-2xl border-gray-100 shadow-lg sm:-left-8"
              styles={{ body: { padding: 16 } }}
            >
              <Flex align="center" gap={12}>
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <ThunderboltOutlined />
                </div>
                <div>
                  <Text type="secondary" className="block text-xs">
                    Data delivered
                  </Text>
                  <Text strong>10GB · MTN</Text>
                </div>
              </Flex>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="border-y border-gray-100 bg-gray-50/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Text className="text-xs! font-semibold! uppercase! tracking-widest! text-blue-600!">
              Everything you need
            </Text>
            <Title level={2} className="mt-2! mb-3!">
              One wallet for everyday payments
            </Title>
            <Paragraph className="mb-0! text-gray-600!">
              From airtime to electricity, pay for the things that matter
              without leaving the app.
            </Paragraph>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Card
                  key={service.title}
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
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Text className="text-xs! font-semibold! uppercase! tracking-widest! text-blue-600!">
              Why Subs.NG
            </Text>
            <Title level={2} className="mt-2! mb-3!">
              Built to make payments feel effortless
            </Title>
            <Paragraph className="mb-0! text-gray-600!">
              We focus on the details that make every transaction faster,
              safer and easier to manage.
            </Paragraph>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-gray-100 bg-white p-4"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon />
                    </div>
                    <Text strong className="mt-3 block">
                      {feature.title}
                    </Text>
                    <Text type="secondary" className="mt-1 block text-sm">
                      {feature.description}
                    </Text>
                  </div>
                );
              })}
            </div>
          </div>

          <Card
            className="rounded-3xl border-gray-100 bg-gray-50"
            styles={{ body: { padding: 24 } }}
          >
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <Flex align="center" justify="space-between">
                <div>
                  <Text type="secondary" className="text-xs">
                    Wallet balance
                  </Text>
                  <Title level={3} className="mb-0! mt-1!">
                    ₦125,500.00
                  </Title>
                </div>
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CreditCardOutlined />
                </div>
              </Flex>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-emerald-50 p-3">
                  <Text type="secondary" className="text-xs">
                    Received
                  </Text>
                  <Text strong className="mt-1 block text-emerald-700">
                    ₦20,350.00
                  </Text>
                </div>
                <div className="rounded-xl bg-blue-50 p-3">
                  <Text type="secondary" className="text-xs">
                    Spent
                  </Text>
                  <Text strong className="mt-1 block text-blue-700">
                    ₦9,000.00
                  </Text>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { name: "MTN Data · 10GB", amount: "−₦6,000", tone: "text-violet-600" },
                  { name: "Wallet funding", amount: "+₦20,000", tone: "text-emerald-600" },
                  { name: "DStv Compact", amount: "−₦19,000", tone: "text-cyan-600" },
                ].map((item) => (
                  <Flex key={item.name} align="center" justify="space-between">
                    <Flex align="center" gap={10}>
                      <span className="size-2 rounded-full bg-gray-300" />
                      <Text className="text-sm">{item.name}</Text>
                    </Flex>
                    <Text strong className={`text-sm ${item.tone}`}>
                      {item.amount}
                    </Text>
                  </Flex>
                ))}
              </div>
            </div>

            <Flex align="center" gap={8} className="mt-4 px-1">
              <SafetyCertificateOutlined className="text-emerald-600" />
              <Text type="secondary" className="text-xs">
                Bank-level security on every transaction.
              </Text>
            </Flex>
          </Card>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-gray-100 bg-gray-50/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Text className="text-xs! font-semibold! uppercase! tracking-widest! text-blue-600!">
              Get started
            </Text>
            <Title level={2} className="mt-2! mb-3!">
              Three steps to your first payment
            </Title>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card
                key={step.title}
                className="h-full rounded-2xl border-gray-200"
                styles={{ body: { padding: 24 } }}
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                  {index + 1}
                </div>
                <Text strong className="mt-4 block text-base">
                  {step.title}
                </Text>
                <Paragraph className="mb-0! mt-1! text-sm! text-gray-500!">
                  {step.description}
                </Paragraph>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-blue-600 px-6 py-10 text-center sm:px-12">
            <Title level={2} className="mb-2! text-white!">
              Ready to simplify your payments?
            </Title>
            <Paragraph className="mx-auto mb-6! max-w-xl text-blue-100!">
              Join thousands of people using Subs.NG to pay for airtime, data,
              bills and subscriptions every day.
            </Paragraph>
            <Link to="/register">
              <Button
                size="large"
                icon={<ArrowRightOutlined />}
                iconPlacement="end"
                className="h-12! border-white! bg-white! px-6! font-semibold! text-blue-700!"
              >
                Create your free account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
