import "server-only";
import { cookies } from "next/headers";
import { SessionDataType } from "../type";
import pino from "pino";
import { getRedisConnection } from "./redis";
import pretty from "pino-pretty";

/**
 * Redisにアクセストークン設定
 * @param {string} sessionId
 * @param {string} accessToken
 */
const setAccessTokenInRedis = async (sessionId: string, accessToken: string) => {
  const conn = await getRedisConnection();
  await conn.set(sessionId, JSON.stringify({ sessionId, accessToken }));
};

export const setAccessToken = async (sessionId: string, accessToken: string): Promise<void> => {
  await setAccessTokenInRedis(sessionId, accessToken);
};

/**
 * アクセストークン取得
 * @returns {string | undefined}
 */
export const getAccessToken = async (): Promise<string | undefined> => {
  const sessionId = cookies().get("sessionId")?.value;
  if (!sessionId) {
    return undefined;
  }

  const conn = await getRedisConnection();
  const data = await conn.get(sessionId);
  if (!data) {
    return undefined;
  }

  const sessionData = JSON.parse(data) as SessionDataType;
  return sessionData.accessToken;
};

export const deleteAccessToken = async () => {
  const sessionId = cookies().get("sessionId")?.value;
  if (!sessionId) {
    return;
  }

  const conn = await getRedisConnection();
  await conn.del(sessionId);
};

/**
 * ロガー
 */
export const logger = pino(
  {
    level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  },
  pretty(),
);
