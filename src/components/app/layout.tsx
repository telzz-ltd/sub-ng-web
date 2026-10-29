
import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeftOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Flex, Layout, Typography } from "antd";

import { AppSidebar } from "@/components/app/sidebar";
import { SupportMenu } from "@/components/support-menu";
import { NotificationMenu } from "@/components/notification-menu";
import { UserMenu } from "@/components/user-menu";

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export function AppLayout({
  children,
  title,
  description,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const pathname = router.state.location.pathname.replace(/\/+$/, "");
  const isDashboard = pathname === "/app";

  function handleBack() {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/app" });
    }
  }

  return (
    <Layout className="min-h-svh bg-surface-muted!">
      <div className="hidden lg:block">
        <AppSidebar collapsed={false} />
      </div>

      <Drawer
        placement="left"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        closable={false}
        width={260}
        styles={{ body: { padding: 0 } }}
        className="lg:hidden"
      >
        <AppSidebar collapsed={false} />
      </Drawer>

      <Layout className="min-w-0 bg-surface-muted!">
        <Layout.Header className="sticky top-0 z-10 flex h-16! items-center justify-between gap-3 bg-surface-muted! px-4! sm:px-6!">
          <Flex align="center" gap={2} className="min-w-0">
            <Button
              type="text"
              icon={<MenuOutlined />}
              aria-label="Open navigation menu"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            />

            <Typography.Text className="truncate text-base! font-semibold!">
              Welcome, Usman
            </Typography.Text>
          </Flex>

          <Flex align="center" gap={8} className="shrink-0 sm:gap-3">
            <SupportMenu />
            <NotificationMenu />
            <UserMenu />
          </Flex>
        </Layout.Header>

        <Layout.Content className="mx-auto w-full max-w-screen-2xl px-4 py-5 sm:px-6 sm:py-6">
          <div className="mb-6 sm:mb-8">
            <Flex align="start" gap={2}>
              {!isDashboard && (
                <Button
                  type="text"
                  icon={<ArrowLeftOutlined />}
                  aria-label="Go back"
                  onClick={handleBack}
                  className="mt-1 shrink-0"
                />
              )}

              <div className="min-w-0">
                <Typography.Title
                  level={2}
                  className="mb-1! text-xl! font-bold! sm:text-2xl!"
                >
                  {title}
                </Typography.Title>

                {description && (
                  <Typography.Paragraph className="mb-0! text-sm! text-muted sm:text-base!">
                    {description}
                  </Typography.Paragraph>
                )}
              </div>
            </Flex>
          </div>

          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
