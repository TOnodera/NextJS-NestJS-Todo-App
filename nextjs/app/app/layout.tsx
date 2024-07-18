import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.scss";
import { AppProvider } from "./components/organizations/AppProvider";
import ErrorHandler from "./components/organizations/PromiseErrorHandler";
import PromiseErrorHandler from "./components/organizations/PromiseErrorHandler";

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
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body className={inter.className}>
        <ErrorHandler>
          <PromiseErrorHandler>
            <AppProvider>{children}</AppProvider>
          </PromiseErrorHandler>
        </ErrorHandler>
      </body>
    </html>
  );
}
