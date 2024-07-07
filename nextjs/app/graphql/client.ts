import { AuthenticationError } from "@/app/type";
import { Get } from "@/app/utills/forClientCompentnts";
import { AuthConfig, authExchange } from "@urql/exchange-auth";
import {
  AnyVariables,
  Client,
  CombinedError,
  Operation,
  cacheExchange,
  fetchExchange,
  mapExchange,
} from "urql";

const isAuthError = (e: CombinedError): boolean =>
  e.graphQLErrors.some((e) => e.message === "Unauthorized");

const isLoginOperation = (operation: Operation<any, AnyVariables>) =>
  operation.query.definitions.some((definition: any) => definition?.name?.value === "Login");

export const createUrqlClient = (url?: string) => {
  if (!url) {
    throw new Error("GQLエンドポイントが設定されていません。");
  }
  return new Client({
    url,
    exchanges: [
      /**
       * ここでエラーマッピングする
       */
      mapExchange({
        onError: (error, _operation) => {
          // 認証エラーが発生したかどうかチェック
          // ログイン時の認証エラーはログイン画面で制御したいので除外する
          if (!isLoginOperation(_operation) && isAuthError(error)) {
            throw new AuthenticationError();
          }
        },
      }),
      /**
       * キャッシュ用
       */
      cacheExchange,
      /**
       * 認証用
       */
      authExchange(async (utils): Promise<AuthConfig> => {
        const { data } = await Get<any, { accessToken: string }>("/token");
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
          didAuthError: (error) => isAuthError(error),
          // トークンが無効か判定
          willAuthError: () => !accessToken,
          // リフレッシュトークン発行
          refreshAuth: async () => {},
        };
      }),
      /**
       * fetch用
       */
      fetchExchange,
    ],
  });
};
