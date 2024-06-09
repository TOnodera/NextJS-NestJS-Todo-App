import { Client, cacheExchange, fetchExchange } from "urql";

const url = process.env.GRAPHQL_URL;
export const client = (accessToken: string) => {
  if (!url) {
    throw new Error("GRAPHQLのエンドポイントが設定されていません。");
  }
  return new Client({
    url,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    exchanges: [cacheExchange, fetchExchange],
  });
};
