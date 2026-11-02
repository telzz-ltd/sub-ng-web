import { useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app/sidebar";
import { NotificationMenu } from "@/components/notification-menu";
import { SupportMenu } from "@/components/support-menu";
import { UserMenu } from "@/components/user-menu";
import { getAuthSession } from "@/stores/auth";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export function AppLayout({ children, title, description }: AppLayoutProps) {
  const user = getAuthSession()?.user;
  const router = useRouter();

  const firstName = user?.name?.split(" ")[0] ?? "there";

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
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full p-4 sm:p-6 space-y-4 sm:space-y-8 bg-accent">
        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger />
            <span className="truncate sm:text-xl font-semibold">
              Welcome, {firstName}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <SupportMenu />
            <NotificationMenu />
            <UserMenu />
          </div>
        </header>

        {/* Main content */}
        <main className="mx-auto w-full max-w-screen-2xl flex-1">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-start gap-2">
              {!isDashboard && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Go back"
                  onClick={handleBack}
                  className="mt-0.5 shrink-0"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
                </Button>
              )}

              <div className="min-w-0">
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {title}
                </h1>

                {description && (
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {children}
        </main>
      </main>
    </SidebarProvider>
  );
}
