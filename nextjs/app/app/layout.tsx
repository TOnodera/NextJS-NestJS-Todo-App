import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";
import UrqlProvider from "./components/atoms/UrqlProvider";
import "./globals.scss";

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
            <UrqlProvider>{children}</UrqlProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
