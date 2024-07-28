"use client";
import { checkIsAuthError, Get } from "@/app/utills/forClientCompentnts";
import { authExchange } from "@urql/exchange-auth";
import { useEffect, useState } from "react";
import { AnyVariables, cacheExchange, Client, fetchExchange, mapExchange, Operation } from "urql";

/**
 * urqlクライアントの生成・再生成処理の実行関数や認証・ネットワーク関連のエラーの状態を保持するフック
 * 参考
 * https://commerce.nearform.com/open-source/urql/docs/basics/errors/
 * https://commerce.nearform.com/open-source/urql/docs/advanced/authentication/
 */

const checkIsLoginOperation = (operation: Operation<any, AnyVariables>) =>
  operation.query.definitions.some((definition: any) => definition?.name?.value === "Login");

interface Props {
  url: string;
}
export default function useUrqlClient({ url }: Props) {
  /**
   * 認証エラー判定用
   */
  const [isAuthError, setIsAuthError] = useState(false);
  /**
   * ネットワークエラー判定用
   */
  const [isNetworkError, setIsNetworkError] = useState(false);

  /**
   * urqlクライアントを作成する。
   * @param url
   * @returns
   */
  const createUrqlClient = (url: string) => {
    return new Client({
      url,
      requestPolicy: "network-only",
      exchanges: [
        /**
         * キャッシュ用
         */
        cacheExchange,
        /**
         * ここでエラーマッピングする
         */
        mapExchange({
          onError: (error, _operation) => {
            // 認証エラーが発生したかどうかチェック
            // ログイン時の認証エラーはログイン画面で制御したいので除外する
            if (!checkIsLoginOperation(_operation) && checkIsAuthError(error)) {
              setIsAuthError(true);
            }
            // ネットワークエラーのチェック
            if (error.networkError) {
              setIsNetworkError(true);
            }
          },
        }),
        /**
         * 認証用
         */
        authExchange(async (utils) => {
          const { data } = await Get<any, { accessToken: string }>("/token");
          console.log("data: ", data);
          const { accessToken } = data;
          return {
            // ヘッダーにトークン埋め込み
            addAuthToOperation: (operation) => {
              console.log(`addAuthToOperation()`);
              if (!accessToken) {
                console.log(`token is undefined`);
                return operation;
              }
              console.log(`set token ${accessToken}`);
              return utils.appendHeaders(operation, {
                Authorization: `Bearer ${accessToken}`,
              });
            },
            // 認証エラーが発生したかの判定
            didAuthError: (error) => checkIsAuthError(error),
            // トークンが無効か判定
            willAuthError: () => !!accessToken,
            // リフレッシュトークン発行
            refreshAuth: async () => {
              /**
               * リフレッシュトークンの生成は今回はめんどいからやんない
               */
            },
          };
        }),
        /**
         * fetch用
         */
        fetchExchange,
      ],
    });
  };
  /**
   * Urqlクライアント
   */
  const [urqlClient, setUrqlClient] = useState<Client>(createUrqlClient(url));
  /**
   * ログイン時とログアウト処理の時に新しいクライアント再生成する
   * @returns {Client} client
   */
  const resetClient = () => {
    console.log("resetClient()");
    return setUrqlClient(createUrqlClient(url));
  };

  useEffect(() => {
    console.log("isAuthError changed");
  }, [isAuthError]);

  return {
    resetClient,
    isAuthError,
    setIsAuthError,
    isNetworkError,
    urqlClient,
  };
}
