import type { Metadata } from "next";
import { Card, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import { CheckSquareOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import SideMenu from "../components/organizations/Sider";
import Header from "../components/organizations/Header";
import Footer from "../components/organizations/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Todoアプリケーション",
  description: "Next.js/Nest.jsを使ったTodoアプリケーション作成",
};

// サイドメニュー
const menus = [
  {
    key: "users",
    label: <Link href="/users">ユーザー管理</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "todos",
    label: <Link href="/todos">TODO管理</Link>,
    icon: <CheckSquareOutlined />,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header />
      <Layout hasSider>
        <SideMenu menus={menus} />
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
              {children}
            </Card>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
}
