"use client";
import { theme } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";

const { useToken } = theme;

export default function Header() {
  const { token } = useToken();
  return (
    <AntdHeader
      style={{
        // backgroundColor: token.colorPrimaryBg,
        paddingLeft: token.paddingXS,
      }}
    >
      <h1 style={{ color: token.colorTextLightSolid }}>Todo App</h1>
    </AntdHeader>
  );
}
