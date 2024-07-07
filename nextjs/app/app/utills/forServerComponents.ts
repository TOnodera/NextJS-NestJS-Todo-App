import "server-only";
import { cookies } from "next/headers";
import { SessionDataType } from "../type";
import pino from "pino";
import { getRedisClient } from "./redis";
import pretty from "pino-pretty";

/**
 * Redisにアクセストークン設定
 * @param {string} sessionId
 * @param {string} accessToken
 */
const setAccessTokenInRedis = async (sessionId: string, accessToken: string) => {
  const client = await getRedisClient();
  await client.connect();
  await client.set(sessionId, JSON.stringify({ sessionId, accessToken }));
  await client.quit();
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

  const client = await getRedisClient();
  await client.connect();
  const data = await client.get(sessionId);
  await client.quit();
  if (!data) {
    return undefined;
  }

  const sessionData = JSON.parse(data) as SessionDataType;
  return sessionData.accessToken;
};

export const deleteAccessToken = async () => {
  const sessionId = cookies().get("sessionId")?.value;
  if (!sessionId) {
    return undefined;
  }

  const client = await getRedisClient();
  await client.connect();
  await client.del(sessionId);
  await client.quit();
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
