"use client";
import { env } from "@/app/utills/forClientCompentnts";
import { AppContext } from "@/contexts/AppContext";
import useUrqlClient from "@/hooks/useUrqlClient";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, notification, ThemeConfig } from "antd";
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
  // antdのtoastっぽいやつ使うために必要
  const [notificationApi, contextHolder] = notification.useNotification();
  const url = env().graphqlUrl;
  const { urqlClient, setIsAuthError, isAuthError, isNetworkError, resetClient } = useUrqlClient({
    url,
  });
  const router = useRouter();
  useEffect(() => {
    if (isAuthError) {
      notificationApi.open({
        message: "認証エラーが発生しました",
        description: "許可されていない操作が実行されました。再ログインしてください。",
        duration: 0,
      });
      router.push("/");
    }
    if (isNetworkError) {
      throw new Error();
    }
  }, [isAuthError, isNetworkError]);
  return (
    <Provider value={urqlClient}>
      <AppContext.Provider
        value={{ setIsAuthError, isAuthError, isNetworkError, resetClient, notificationApi }}
      >
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>
            {contextHolder}
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </AppContext.Provider>
    </Provider>
  );
}
