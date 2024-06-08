import { ApiResponse } from "./type";

export async function post<T, R>(path: string, data: T): Promise<ApiResponse<R>> {
  const trimedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = `${process.env.API_URL}/${trimedPath}`;
  const result = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(async (r) => {
    return { data: (await r.json()) as R, status: r.status };
  });
  console.log("R: ", result.data);
  return { status: result.status, data: result.data };
}
