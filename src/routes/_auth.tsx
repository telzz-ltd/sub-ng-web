import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Typography } from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

const { Title, Paragraph, Text } = Typography;

const highlights = [
  "Instant airtime, data and bill payments",
  "Bank-level security on every transaction",
  "Earn commission as you pay",
];

function AuthLayout() {
  return (
    <div className="grid min-h-svh bg-white md:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-blue-700 p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-white/10" />

        <Link
          to="/"
          className="relative flex w-fit items-center rounded-xl bg-white px-4 py-2"
        >
          <img
            src="/logo.png"
            width={112}
            height={38}
            alt="Subs.NG"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <div className="relative max-w-md">
          <Title className="mb-3! text-3xl! text-white! lg:text-4xl!">
            Pay for everything. From one wallet.
          </Title>
          <Paragraph className="mb-6! text-blue-100!">
            Buy airtime, data, cable TV, electricity and exam cards in seconds
            with Subs.NG.
          </Paragraph>

          <ul className="space-y-3">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <CheckCircleFilled className="mt-1 text-blue-200" />
                <Text className="text-blue-50!">{highlight}</Text>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-2 text-sm text-blue-100">
          <SafetyCertificateOutlined />
          <span>Secure, reliable payments trusted across Nigeria.</span>
        </div>
      </aside>

      <main className="flex flex-col">
        <div className="flex items-center justify-between gap-3 p-4 md:hidden">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              width={104}
              height={34}
              alt="Subs.NG"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500"
          >
            <ArrowLeftOutlined />
            Back
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
          <div className="w-full max-w-100">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
