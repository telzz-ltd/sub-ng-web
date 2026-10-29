import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

import { App, ConfigProvider, theme } from "antd"
import { StyleProvider } from "@ant-design/cssinjs";

export type Auth = {
  user: any;
  accessToken: string | null;
  refreshToken?: string | null;
};

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
      // const resp = await getAuth();
      setAuth({
        accessToken: "cadbcvdahbvhb",
        user: {
          name: "Usman Muhammad",
          email: "usman@example.com",
        },
      });
    });
  }, []);

  if (isPending) {
    return <p>Loading....</p>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>
        <StyleProvider layer>
          <ConfigProvider
            componentSize="large"
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: {
                // fontSize: 15,
                // controlHeight: 28,
              },
              components: {
                Form: {
                  verticalLabelPadding: 0,
                  itemMarginBottom: 8,
                },
              },
            }}
          >
            <App>{children}</App>
          </ConfigProvider>
        </StyleProvider>
      </AuthContext.Provider>
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
