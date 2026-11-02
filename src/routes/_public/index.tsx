import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/link";
import {
  AffiliateIcon,
  ArrowRight02Icon,
  ComputerVideoIcon,
  CreditCard,
  CustomerService01Icon,
  FlashIcon,
  Rocket01Icon,
  SchoolReportCardIcon,
  SecurityLockIcon,
  ShieldCheckIcon,
  SignalFull02Icon,
  SmartPhone01Icon,
  Wifi01Icon
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
  component: LandingPage,
});

const services = [
  {
    icon: SmartPhone01Icon,
    title: "Airtime Top-Up",
    description: "Instant recharge for MTN, Airtel, Glo & 9mobile at the best rates.",
    tone: "bg-primary-light text-primary",
  },
  {
    icon: SignalFull02Icon,
    title: "Data Bundles",
    description: "Buy cheap data plans for all networks in seconds.",
    tone: "bg-primary-light text-primary",
  },
  {
    icon: ComputerVideoIcon,
    title: "Cable TV",
    description: "Pay for DStv, GOtv & StarTimes subscriptions easily.",
    tone: "bg-primary-light text-primary",
  },
  {
    icon: FlashIcon,
    title: "Electricity Bills",
    description: "Pay prepaid & postpaid bills for all DISCOs across Nigeria.",
    tone: "bg-primary-light text-primary",
  },
  {
    icon: Wifi01Icon,
    title: "Internet Subscriptions",
    description: "Renew your Smile, Spectranet & other internet plans.",
    tone: "bg-primary-light text-primary",
  },
  {
    icon: SchoolReportCardIcon,
    title: "Exam Pins",
    description: "Buy WAEC, NECO, JAMB & NABTEB scratch cards instantly.",
    tone: "bg-primary-light text-primary",
  },
];

const features = [
  {
    icon: SecurityLockIcon,
    title: "Secure & Reliable",
    description: "Your transactions are protected with bank-level security.",
  },
  {
    icon: Rocket01Icon,
    title: "Instant Delivery",
    description: "Airtime, data & tokens delivered instantly after payment.",
  },
  {
    icon: AffiliateIcon,
    title: "Earn Commissions",
    description: "Earn on every successful transaction with our reseller plan.",
  },
  {
    icon: CustomerService01Icon,
    title: "24/7 Support",
    description: "Friendly support team ready to help when you need it.",
  },
];

const steps = [
  {
    title: "Create Account",
    description: "Sign up for free with your details in under a minute.",
  },
  {
    title: "Fund Wallet",
    description: "Add funds via bank transfer or card payment.",
  },
  {
    title: "Start Paying",
    description: "Buy airtime, data, pay bills & subscriptions instantly.",
  },
];

function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              className="mb-6 h-7 px-3 text-sm border-primary/30 bg-primary-light text-primary hover:bg-primary-light [&>svg]:size-4!"
              variant="outline"
            >
              <HugeiconsIcon icon={ShieldCheckIcon} strokeWidth={2} className="mr-1" />
              Nigeria's Trusted VTU Platform
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Buy Airtime, Data & Pay Bills{" "}
              <span className="text-primary">Instantly</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
              Subs.NG makes it easy to buy airtime, data bundles, pay cable TV,
              electricity bills and more. All from one simple platform.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink size="lg" to="/register" className="h-12 px-8">
                Get Started Free
                <HugeiconsIcon icon={ArrowRight02Icon} />
              </ButtonLink>
              <ButtonLink
                size="lg"
                to="/login"
                variant="outline"
                className="h-12 px-8"
              >
                Sign In
              </ButtonLink>
            </div>

            <div className="mt-12 hidden grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { value: "50K+", label: "Customers" },
                { value: "₦2B+", label: "Transactions" },
                { value: "99.9%", label: "Uptime" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              All Your Digital Services In One Place
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Fast, reliable and affordable VTU services for everyone
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-sm"
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-lg ${service.tone}`}
                >
                  <HugeiconsIcon icon={service.icon} size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose Subs.NG
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                We make digital payments simple, fast and reliable for
                Nigerians.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                      <HugeiconsIcon icon={feature.icon} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm text-neutral-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <p className="text-sm text-neutral-500">Wallet Balance</p>
                  <p className="mt-1 text-2xl font-bold">₦125,450.00</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <HugeiconsIcon icon={CreditCard} />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { service: "MTN Data - 2GB", amount: "-₦1,000", status: "Success" },
                  { service: "Airtel Airtime - ₦500", amount: "-₦500", status: "Success" },
                  { service: "DStv Subscription", amount: "-₦4,900", status: "Success" },
                ].map((txn) => (
                  <div
                    key={txn.service}
                    className="flex items-center justify-between rounded-lg border border-neutral-100 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{txn.service}</p>
                      <p className="text-xs text-primary">{txn.status}</p>
                    </div>
                    <p className="text-sm font-medium text-neutral-900">
                      {txn.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get Started in 3 Easy Steps
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Start buying airtime, data and paying bills in minutes
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-primary px-6 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Start Saving?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-light">
              Join thousands of Nigerians who trust Subs.NG for all their VTU
              needs
            </p>
            <div className="mt-8">
              <ButtonLink
                size="lg"
                to="/register"
                variant="secondary"
                className="h-12 px-8 bg-white text-primary hover:bg-primary-light"
              >
                Create Free Account
                <HugeiconsIcon icon={ArrowRight02Icon} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
