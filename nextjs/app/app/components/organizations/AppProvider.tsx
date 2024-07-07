"use client";
import { createUrqlClient } from "@/graphql/client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";
import { Provider } from "urql";

interface Props {
  children: React.ReactNode;
  theme: ThemeConfig;
}
export function AppProvider({ children, theme }: Props) {
  const urqlClient = createUrqlClient(process.env.NEXT_PUBLIC_GRAPHQL_URL);
  return (
    <AntdRegistry>
      <Provider value={urqlClient}>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </Provider>
    </AntdRegistry>
  );
}
