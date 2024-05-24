import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Button, ConfigProvider, Layout, ThemeConfig } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import "antd/dist/reset.css";
import variables from "./variables.module.scss";

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
  // const themeConfig: ThemeConfig = {
  //   token: {
  //     colorPrimary: variables.primaryColor,
  //   },
  // };
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider>
            <Layout style={{ minHeight: "100vh" }}>
              <Header />
              {children}
              <Footer />
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
