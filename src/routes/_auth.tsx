import { ArrowRight, CheckCircle, Shield } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";


export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

const highlights = [
  "Instant airtime, data and bill payments",
  "Bank-level security on every transaction",
  "Earn commission as you pay",
];

function AuthLayout() {
  return (
    <div className="grid min-h-svh bg-white md:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-primary p-10 text-white md:flex md:flex-col md:justify-between lg:p-12">
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

        <div className="relative max-w-lg">
          <h1 className="mb-4 text-4xl leading-tight text-white lg:text-5xl">
            Pay for everything. From one wallet.
          </h1>
          <p className="mb-8 text-lg text-blue-100">
            Buy airtime, data, cable TV, electricity and exam cards in seconds
            with Subs.NG.
          </p>

          <ul className="space-y-4">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3">
                <HugeiconsIcon icon={CheckCircle} className="mt-1 text-lg text-blue-200" />
                <span className="text-base text-blue-50">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-2 text-base text-blue-100">
          <HugeiconsIcon icon={Shield} />
          <span>Secure, reliable payments trusted across Nigeria.</span>
        </div>
      </aside>

      <main className="relative flex flex-col">
        {/* <div className="absolute right-4 top-4 hidden md:block"> */}
        {/* Theme toggle */}
        {/* <ThemeToggle /> */}
        {/* </div> */}

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

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-500"
            >
              Back
              <HugeiconsIcon icon={ArrowRight} />
            </Link>
          </div>
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
