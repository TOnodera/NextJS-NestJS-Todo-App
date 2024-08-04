"use client";
import { Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import { CheckSquareOutlined, UserOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import SideMenu from "../components/organizations/Sider";
import Header from "../components/organizations/Header";
import Footer from "../components/organizations/Footer";
import Link from "next/link";
import SuspenseWrapper from "../components/atoms/SuspenceWrapper";
import { AppContext } from "@/contexts/AppContext";

// サイドメニュー
const menus = [
  {
    key: "users",
    label: <Link href="/users">ユーザー管理</Link>,
    icon: <UserOutlined />,
    role: ["admin"],
  },
  {
    key: "todos",
    label: <Link href="/todos">TODO管理</Link>,
    icon: <CheckSquareOutlined />,
    role: ["user", "admin"],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appState = useContext(AppContext);
  const user = appState.getUser();
  return (
    <Layout style={{ height: "100vh" }}>
      <Header />
      <Layout hasSider>
        <SideMenu menus={menus.filter((menu) => menu.role.includes(user?.roleId as string))} />
        <Layout>
          <Content style={{ marginTop: "3rem", padding: "3rem" }}>
            <Card
              style={{
                width: "100%",
                marginTop: "1rem",
                height: "100%",
                margin: "0 auto",
                overflowY: "auto",
              }}
            >
              <SuspenseWrapper>{children}</SuspenseWrapper>
            </Card>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}
