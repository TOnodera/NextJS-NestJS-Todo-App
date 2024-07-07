import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from "redis";

let redisClient:
  | RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>
  | undefined = undefined;
/**
 * redisクライアント生成
 * クライアントはシングルトンで使いまわす。
 * @returns {RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts> | undefined} redisClient
 */
export const getRedisClient = async () => {
  if (redisClient) {
    return redisClient;
  }
  redisClient = await createClient({ url: process.env.REDIS_URL });
  return redisClient;
};
