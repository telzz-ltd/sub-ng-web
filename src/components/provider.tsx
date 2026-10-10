"use client";

import { Auth, getAuth } from "@/actions/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

export const AuthContext = createContext<Auth>({
  user: null,
  accessToken: null,
  refreshToken: null,
});

const queryClient = new QueryClient();

export function AppProvider({ children }: PropsWithChildren) {
  const [isPending, startTransition] = useTransition();
  const [auth, setAuth] = useState<Auth>({
    user: null,
    accessToken: null,
    refreshToken: null,
  });

  useEffect(() => {
    startTransition(async () => {
      const resp = await getAuth();
      setAuth(resp);
    });
  }, []);

  if (isPending) {
    return <p>Loading....</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
    </QueryClientProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("auth context must be used within AuthProvider");
  }
  return ctx;
}
