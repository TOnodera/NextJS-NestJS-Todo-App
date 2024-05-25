import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  ConfigProvider,
  Layout,
  Menu,
  MenuProps,
  Slider,
  ThemeConfig,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import variables from "./variables.module.scss";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
import Sider from "antd/es/layout/Sider";
import SideMenu from "./components/organizations/Sider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todoアプリケーション",
  description: "Next.js/Nest.jsを使ったTodoアプリケーション作成",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //アプリケーション全体のテーマ生成
  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: variables.primaryColor,
    },
  };
  // サイドメニュー
  const menus = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }));
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider>
            <Layout style={{ height: "100vh" }} hasSider>
              <SideMenu menus={menus} />
              <Layout>
                <Header />
                <Content>
                  <div>content</div>
                  <div>content</div>
                  <div>content</div>
                  <div>content</div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
