import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.scss";
import { AppProvider } from "./components/organizations/AppProvider";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";

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
        <ErrorBoundary fallback={<Error />}>
          <AppProvider>{children}</AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
