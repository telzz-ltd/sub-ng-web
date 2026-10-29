import { useState } from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button, Drawer, Flex, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Why Subs.NG", href: "#features" },
];

function PublicLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-svh bg-white">
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="/logo.png"
              width={112}
              height={38}
              alt="Subs.NG"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Flex align="center" gap={8}>
            <Link to="/login">
              <Button type="text" className="font-medium!">
                Sign in
              </Button>
            </Link>
            <Link to="/register" className="hidden sm:inline-block">
              <Button type="primary" className="font-medium!">
                Create account
              </Button>
            </Link>
            <Button
              type="text"
              className="md:hidden!"
              icon={<MenuOutlined />}
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            />
          </Flex>
        </div>
      </header>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        placement="right"
        size={280}
        title={
          <img
            src="/logo.png"
            width={104}
            height={34}
            alt="Subs.NG"
            className="h-8 w-auto object-contain"
          />
        }
      >
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-blue-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <Button block>Sign in</Button>
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <Button type="primary" block>
              Create account
            </Button>
          </Link>
        </div>
      </Drawer>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <img
              src="/logo.png"
              width={112}
              height={38}
              alt="Subs.NG"
              className="h-9 w-auto object-contain"
            />
            <Typography.Paragraph className="mb-0! mt-3! max-w-xs text-sm! text-gray-500!">
              The simple way to pay for airtime, data, bills and subscriptions
              in Nigeria.
            </Typography.Paragraph>
          </div>

          {[
            {
              title: "Services",
              links: ["Airtime", "Data bundles", "Cable TV", "Electricity"],
            },
            {
              title: "Company",
              links: ["About us", "Contact", "Careers", "Blog"],
            },
            {
              title: "Support",
              links: ["Help center", "FAQs", "Terms", "Privacy"],
            },
          ].map((group) => (
            <div key={group.title}>
              <Typography.Text strong className="text-sm!">
                {group.title}
              </Typography.Text>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 sm:flex-row sm:px-6">
            <span>© {new Date().getFullYear()} Subs.NG. All rights reserved.</span>
            <span>Built for everyday payments in Nigeria.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
