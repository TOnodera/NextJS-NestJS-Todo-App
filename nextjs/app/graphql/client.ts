import { AuthenticationError } from "@/app/type";
import { get } from "@/app/utills/forClientCompentnts";
import { AuthConfig, authExchange } from "@urql/exchange-auth";
import { Client, cacheExchange, fetchExchange, mapExchange } from "urql";

export const client = () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;

  if (!url) {
    throw new Error("認証エンドポイントが設定されていません。");
  }
  return new Client({
    url,
    exchanges: [
      cacheExchange,
      // エラーマッピング
      mapExchange({
        onError: (error, _operation) => {
          // 認証エラーが発生したかどうかチェック
          const isAuthError = error.graphQLErrors.some((e) => e.message === "Unauthorized");
          if (isAuthError) {
            throw new AuthenticationError();
          }
        },
      }),
      // 認証用
      authExchange(async (utils): Promise<AuthConfig> => {
        const { data } = await get<any, { accessToken: string }>("/token");
        const accessToken = data.accessToken;
        return {
          // ヘッダーにトークン埋め込み
          addAuthToOperation: (operation) => {
            if (!accessToken) {
              return operation;
            }
            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${accessToken}`,
            });
          },
          // 認証エラーが発生したかの判定
          didAuthError: (error) => {
            return error.graphQLErrors.some((e) => e.message === "Unauthorized");
          },
          // トークンが無効か判定
          willAuthError: () => {
            if (!accessToken) {
              return true;
            }
            return false;
          },
          // リフレッシュトークン発行
          refreshAuth: async () => {},
        };
      }),
      fetchExchange,
    ],
  });
};
