
import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";

import { useAuthStore } from "@/stores/auth";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    if (typeof window === "undefined") {
      return;
    }

    const session = useAuthStore.getState().session;

    if (!session?.token) {
      throw redirect({ to: "/login" });
    }
  },

  component: AppLayout,
});

function AppLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
