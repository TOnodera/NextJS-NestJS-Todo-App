import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import "antd/dist/reset.css";

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
  // アプリケーション全体のテーマ生成
  // const theme: ThemeConfig = {
  //   token: {
  //     colorPrimary: "#fff"
  //   }
  // };

  return (
    <html lang="ja">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider>
            <Layout>
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
