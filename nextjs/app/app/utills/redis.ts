import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "redis";
import { logger } from "./forServerComponents";

let redisConnection:
  | RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>
  | undefined = undefined;
/**
 * redisコネクション生成
 * コネクションはシングルトンで使いまわす。
 * @returns {RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts> | undefined} redisClient
 */
export const getRedisConnection = async () => {
  if (redisConnection) {
    return redisConnection;
  }
  redisConnection = await createClient({ url: process.env.REDIS_URL })
    // エラーハンドラだけ実装しとく
    .on("error", async (e) => {
      logger.fatal(`redisでエラーが発生しました: ${e}`);
    })
    .connect();
  return redisConnection;
};
