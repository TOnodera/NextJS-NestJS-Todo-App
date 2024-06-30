"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";
import { Provider } from "urql";
import { client } from "@/graphql/client";

interface Props {
  children: React.ReactNode;
  theme: ThemeConfig;
}
export function AppProvider({ children, theme }: Props) {
  const urqlClient = client();
  return (
    <AntdRegistry>
      <Provider value={urqlClient}>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </Provider>
    </AntdRegistry>
  );
}
