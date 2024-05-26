"use client";
import { theme } from "antd";
import { Footer as AntdFooter } from "antd/es/layout/layout";
export default function Footer() {
  const { token } = theme.useToken();
  return (
    <AntdFooter
      style={{
        textAlign: "center",
        // backgroundColor: token.colorPrimaryBg,
        height: token.lineHeightSM,
      }}
    >
      t.onodera ©{new Date().getFullYear()} Created by Ant UED
    </AntdFooter>
  );
}
