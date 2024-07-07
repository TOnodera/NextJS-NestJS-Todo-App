import {
  deleteAccessToken,
  getAccessToken,
  logger,
  setAccessToken,
} from "@/app/utills/forServerComponents";
import dayjs from "dayjs";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.accessToken) {
    return Response.error();
  }
  const sessionId = uuid();
  await setAccessToken(sessionId, body.accessToken);
  const cookie = `sessionId=${sessionId}; Expires=${dayjs().add(7, "day").toISOString()}; Secure; Path=/; Strict; HttpOnly;`;
  logger.debug(`cookie: ${cookie}`);
  return Response.json(
    {},
    {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    },
  );
}
export async function GET(req: NextRequest) {
  const accessToken = await getAccessToken();
  return Response.json({ accessToken });
}
export async function DELETE(req: Request) {
  let token = await getAccessToken();
  logger.debug(`トークン削除前: token=${token}`);
  await deleteAccessToken();
  token = await getAccessToken();
  logger.debug(`トークン削除後: token=${token}`);
  return Response.json({});
}
