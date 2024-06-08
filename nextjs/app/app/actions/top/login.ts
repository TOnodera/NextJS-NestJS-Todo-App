"use server";
import "server-only";
import { redirect } from "next/navigation";
import { AccessToken, Credentials, LoginFormErrorType } from "@/app/type";
import { z } from "zod";
import { post } from "@/app/utils";
import { StatusCodes } from "http-status-codes";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { createClient } from "redis";

/**
 * バリデーションスキーマ
 */
const LoginSchema = z.object({
  email: z
    .string({
      required_error: "メールアドレスを入力してください。",
    })
    .email({
      message: "不正なメールアドレスです。",
    }),
  password: z.string({
    required_error: "パスワードを入力してください。",
  }),
});

export const onLoginSubmit = async (
  _: LoginFormErrorType,
  credentials?: Credentials,
): Promise<LoginFormErrorType> => {
  // バリデーション
  const validatedFields = LoginSchema.safeParse({
    email: credentials?.email,
    password: credentials?.password,
  });
  // バリデーションに失敗した場合はエラーメッセージを次の状態として返す
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "認証に失敗しました。",
    };
  }
  const { status, data } = await post<Credentials, AccessToken>(
    "/auth/login",
    validatedFields.data,
  );
  if (status !== StatusCodes.OK) {
    return { message: "認証に失敗しました。" };
  }
  // TODO セッションにトークン詰める
  const sessionId = uuid();
  cookies().set("session", sessionId, {
    httpOnly: true,
    secure: true,
    maxAge: dayjs().add(7, "day").millisecond(),
    path: "/",
  });
  const client = await createClient({ url: process.env.REDIS_URL });
  await client.connect();
  await client.set(sessionId, JSON.stringify({ sessionId, accessToken: data.accessToken }));
  await client.disconnect();

  redirect("/todos");
};
