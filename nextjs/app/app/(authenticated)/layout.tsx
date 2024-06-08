import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Breadcrumb, Card, ConfigProvider, Layout, Space, ThemeConfig } from "antd";
import { Content } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import React from "react";
import SideMenu from "../components/organizations/Sider";
import Header from "../components/organizations/Header";
import Footer from "../components/organizations/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todoアプリケーション",
  description: "Next.js/Nest.jsを使ったTodoアプリケーション作成",
};

//アプリケーション全体のテーマ生成
const themeConfig: ThemeConfig = {
  /*
    token: {
      colorPrimaryBg: "#c7e3f9",
    },
    components: {
      Menu: {
        subMenuItemBg: "#fff",
      },
    },
    */
};

// サイドメニュー
const menus = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

export default function RootLayout({
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
