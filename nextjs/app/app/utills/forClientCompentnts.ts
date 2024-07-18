import { ApiResponse } from "../type";

/**
 * fetchのラッパー(post用)
 * @param {string} path
 * @param {T} data
 * @returns {Promise<ApiResponse<R>>}
 */
export async function Post<T, R>(path: string, data: T): Promise<ApiResponse<R>> {
  const trimedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = `${env().apiUrl}/${trimedPath}`;
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    // cache: "no-store",
  }).then(async (r) => {
    return { data: (await r.json()) as R, status: r.status };
  });
  return result;
}

/**
 * fetchのラッパー(get用)
 * @param {string} path
 * @param {T extends Record<string, string>} data
 * @returns {Promise<ApiResponse<R>>}
 */
export async function Get<T extends Record<string, string>, R>(
  path: string,
  data?: T,
): Promise<ApiResponse<R>> {
  const trimedPath = path.startsWith("/") ? path.slice(1) : path;
  const query = new URLSearchParams(data);
  const url = `${env().apiUrl}/${trimedPath}${data ? `?${query}` : ""}`;
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    credentials: "include",
    // cache: "no-store",
  }).then(async (r) => {
    return { data: (await r.json()) as R, status: r.status };
  });
  return result;
}

/**
 * fetchのラッパー(get用)
 * @param {string} path
 * @param {T extends Record<string, string>} data
 * @returns {Promise<ApiResponse<R>>}
 */
export async function Delete<T extends Record<string, string>, R>(
  path: string,
  data?: T,
): Promise<ApiResponse<R>> {
  const trimedPath = path.startsWith("/") ? path.slice(1) : path;
  const query = new URLSearchParams(data);
  const url = `${env().apiUrl}/${trimedPath}${data ? `?${query}` : ""}`;
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    credentials: "include",
    // cache: "no-store",
  }).then(async (r) => {
    return { data: (await r.json()) as R, status: r.status };
  });
  return result;
}

/**
 * 環境変数取得
 */
interface ClientEnv {
  graphqlUrl: string;
  apiUrl: string;
}
export const env = (): ClientEnv => {
  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!graphqlUrl || !apiUrl) {
    throw new Error("環境変数が設定されていません");
  }
  return {
    graphqlUrl,
    apiUrl,
  };
};
