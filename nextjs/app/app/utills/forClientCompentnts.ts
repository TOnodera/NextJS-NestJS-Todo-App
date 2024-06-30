import pino from "pino";
import { ApiResponse } from "../type";

/**
 * fetchのラッパー(post用)
 * @param {string} path
 * @param {T} data
 * @returns {Promise<ApiResponse<R>>}
 */
export async function post<T, R>(path: string, data: T): Promise<ApiResponse<R>> {
  const trimedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${trimedPath}`;
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
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
export async function get<T extends Record<string, string>, R>(
  path: string,
  data?: T,
): Promise<ApiResponse<R>> {
  const trimedPath = path.startsWith("/") ? path.slice(1) : path;
  const query = new URLSearchParams(data);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${trimedPath}${data ? `?${query}` : ""}`;
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then(async (r) => {
    return { data: (await r.json()) as R, status: r.status };
  });
  return result;
}
