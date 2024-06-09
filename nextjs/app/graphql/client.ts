import { Client, cacheExchange, fetchExchange } from "urql";

export const client = (accessToken: string) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;

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
