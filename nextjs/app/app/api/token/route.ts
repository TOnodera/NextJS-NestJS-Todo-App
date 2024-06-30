import { getAccessToken, setAccessToken } from "@/app/utills/forServerComponents";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.accessToken) {
    return Response.error();
  }
  await setAccessToken(body.accessToken);
  return Response.json({});
}
export async function GET() {
  const accessToken = await getAccessToken();
  return Response.json({ accessToken });
}
