import { COOKIE_TTL_DAY } from "@/app/consts";
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
  const cookie = `sessionId=${sessionId}; Expires=${dayjs().add(COOKIE_TTL_DAY, "day").toISOString()}; Secure; Path=/; Strict; HttpOnly;`;
  logger.debug(`cookie: ${cookie}`);
  logger.debug(`save token is ${body.accessToken}`);
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
  logger.debug(`get token: ${accessToken}`);
  return Response.json({ accessToken });
}
export async function DELETE(req: Request) {
  let token = await getAccessToken();
  logger.debug(`before delete token: token=${token}`);
  await deleteAccessToken();
  token = await getAccessToken();
  logger.debug(`after delete token: token=${token}`);
  return Response.json({});
}
