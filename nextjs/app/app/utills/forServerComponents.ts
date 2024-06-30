import "server-only";
import { cookies } from "next/headers";
import { SessionDataType } from "../type";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { COOKIE_TTL_DAY } from "../consts";
import { createClient } from "redis";
import pino from "pino";

/**
 * 新規セッション作成
 * @returns
 */
export const createSession = (): string => {
  const sessionId = uuid();
  cookies().set("session", sessionId, {
    httpOnly: true,
    secure: true,
    maxAge: dayjs().add(COOKIE_TTL_DAY, "day").millisecond(),
    path: "/",
  });
  return sessionId;
};

/**
 * Redisにアクセストークン設定
 * @param {string} sessionId
 * @param {string} accessToken
 */
const setAccessTokenInRedis = async (sessionId: string, accessToken: string) => {
  const client = await createClient({ url: process.env.REDIS_URL });
  await client.connect();
  await client.set(sessionId, JSON.stringify({ sessionId, accessToken }));
  await client.disconnect();
};

export const setAccessToken = async (accessToken: string): Promise<void> => {
  const sessionId = createSession();
  await setAccessTokenInRedis(sessionId, accessToken);
};

/**
 * アクセストークン取得
 * @returns {string | undefined}
 */
export const getAccessToken = async (): Promise<string | undefined> => {
  const sessionId = cookies().get("session")?.value;
  if (!sessionId) {
    return undefined;
  }

  const client = await createClient({ url: process.env.REDIS_URL });
  await client.connect();
  const data = await client.get(sessionId);
  if (!data) {
    return undefined;
  }

  const sessionData = JSON.parse(data) as SessionDataType;
  await client.disconnect();

  return sessionData.accessToken;
};

/**
 * ロガー
 */
export const logger = pino({ level: process.env.NODE_ENV === "production" ? "info" : "debug" });
