"use client";

import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
    },
  },
};

const queryClient = new QueryClient(config);

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
