import { AuthenticationError } from "@/app/type";
import { AuthConfig, authExchange } from "@urql/exchange-auth";
import { Client, cacheExchange, fetchExchange, mapExchange } from "urql";

export const client = (accessToken: string) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  if (!url) {
    throw new Error("認証エンドポイントが設定されていません。");
  }
  return new Client({
    url,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    exchanges: [
      cacheExchange,
      // エラーマッピング
      mapExchange({
        onError: (error, _operation) => {
          // 認証エラーが発生したかどうかチェック
          const isAuthError = error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN");
          if (isAuthError) {
            throw new AuthenticationError();
          }
        },
      }),
      // 認証用
      authExchange(async (utils): Promise<AuthConfig> => {
        const token = "";
        return {
          // ヘッダーにトークン埋め込み
          addAuthToOperation: (operation) => {
            if (!token) {
              return operation;
            }
            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${token}`,
            });
          },
          // 認証エラーが発生したかの判定
          didAuthError: (error) =>
            error.graphQLErrors.some((e) => e.extensions?.code === "FORBIDDEN"),
          // トークンが無効か判定
          willAuthError: () => false,
          // リフレッシュトークン発行
          refreshAuth: async () => {},
        };
      }),
      fetchExchange,
    ],
  });
};
