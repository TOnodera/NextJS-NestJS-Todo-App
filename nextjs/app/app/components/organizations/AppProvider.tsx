"use client";
import { env } from "@/app/utills/forClientCompentnts";
import { UrqlContext } from "@/contexts/UrqlContext";
import useUrqlClient from "@/hooks/useUrqlClient";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, ThemeConfig } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Provider } from "urql";

//アプリケーション全体のテーマ生成
const themeConfig: ThemeConfig = {
  token: {
    colorPrimaryBg: "#c7e3f9",
  },
  components: {
    Menu: {
      subMenuItemBg: "#fff",
    },
  },
};

interface Props {
  children: React.ReactNode;
}
export function AppProvider({ children }: Props) {
  const url = env().graphqlUrl;
  const { urqlClient, isAuthError, isNetworkError, resetClient } = useUrqlClient({ url });
  console.log("AppProvider");
  const router = useRouter();
  useEffect(() => {
    console.log("changed")
    if (isAuthError) {
      console.error("isAuthError");
      router.push("/");
    }
    if (isNetworkError) {
      console.error("isNetworkError");
      throw new Error();
    }
  }, [isAuthError, isNetworkError]);
  return (
    <Provider value={urqlClient}>
      <UrqlContext.Provider value={{ isAuthError, isNetworkError, resetClient }}>
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
        </AntdRegistry>
      </UrqlContext.Provider>
    </Provider>
  );
}
