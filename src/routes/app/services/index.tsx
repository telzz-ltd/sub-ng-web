
import { createFileRoute, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wifi01Icon,
  CreditCardIcon,
  ArrowLeftRightIcon,
  PlayCircleIcon,
  ZapIcon,
  File02Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons";

import { AppLayout } from "@/components/app/layout";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/app/services/")({
  component: ServicesPage,
});

const services = [
  {
    to: "/app/services/airtime",
    title: "Airtime",
    description: "Top up any network instantly.",
    icon: SmartPhone01Icon,
    tone: "bg-blue-50 text-blue-600",
  },
  {
    to: "/app/services/data",
    title: "Data bundles",
    description: "Affordable plans for every network.",
    icon: Wifi01Icon,
    tone: "bg-violet-50 text-violet-600",
  },
  {
    to: "/app/services/recharge-card",
    title: "Recharge cards",
    description: "Generate PINs in seconds.",
    icon: CreditCardIcon,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    to: "/app/services/airtime-to-cash",
    title: "Airtime to cash",
    description: "Convert unused airtime to money.",
    icon: ArrowLeftRightIcon,
    tone: "bg-lime-50 text-lime-700",
  },
  {
    to: "/app/services/cable-tv",
    title: "Cable TV",
    description: "Renew DStv, GOtv and StarTimes.",
    icon: PlayCircleIcon,
    tone: "bg-cyan-50 text-cyan-600",
  },
  {
    to: "/app/services/electricity",
    title: "Electricity",
    description: "Pay prepaid and postpaid bills.",
    icon: ZapIcon,
    tone: "bg-amber-50 text-amber-600",
  },
  {
    to: "/app/services/exam-card",
    title: "Exam cards",
    description: "Buy WAEC, NECO, JAMB and NABTEB.",
    icon: File02Icon,
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
        {services.map((service) => (
          <Link
            key={service.to}
            to={service.to}
            className="block h-full"
          >
            <Card className="h-full rounded-2xl transition-colors hover:border-primary/40 hover:bg-muted/30">
              <CardContent className="p-5">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl ${service.tone}`}
                >
                  <HugeiconsIcon
                    icon={service.icon}
                    className="size-5"
                  />
                </div>

                <h3 className="mt-4 text-base font-semibold">
                  {service.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
