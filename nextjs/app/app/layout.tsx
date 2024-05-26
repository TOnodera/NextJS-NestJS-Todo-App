import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  Breadcrumb,
  Card,
  ConfigProvider,
  Layout,
  Space,
  ThemeConfig,
} from "antd";
import { Content } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React from "react";
import SideMenu from "./components/organizations/Sider";
import Header from "./components/organizations/Header";
import Footer from "./components/organizations/Footer";
import { token2CSSVar } from "@ant-design/cssinjs";
import { evalManifestWithRetries } from "next/dist/server/load-components";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>
            <Layout style={{ height: "100vh" }}>
              <Header />
              <Layout hasSider>
                <SideMenu menus={menus} />
                <Layout>
                  <Content style={{ marginTop: "3rem", padding: "3rem" }}>
                    <Breadcrumb
                      items={[
                        { title: "top" },
                        { title: "todo" },
                        { title: "create" },
                      ]}
                    />
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
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
