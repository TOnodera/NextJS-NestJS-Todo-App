"use client";
import { UrqlProvider } from "@/app/store/urqlStore";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";

interface Props {
  children: React.ReactNode;
  theme: ThemeConfig;
}
export function AppProvider({ children, theme }: Props) {
  return (
    <AntdRegistry>
      <UrqlProvider>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </UrqlProvider>
    </AntdRegistry>
  );
}
