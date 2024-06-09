"use server";
import "server-only";
import { redirect } from "next/navigation";
import { AccessToken, Credentials, LoginFormErrorType } from "@/app/type";
import { z } from "zod";
import { post, setAccessToken } from "@/app/utils";
import { StatusCodes } from "http-status-codes";

/**
 * バリデーションスキーマ
 */
const LoginSchema = z.object({
  email: z
    .string({
      required_error: "メールアドレスを入力してください。",
    })
    .email({
      message: "メールアドレスを入力してください。",
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

  /**
   * ログイン認証
   */
  const { status, data } = await post<Credentials, AccessToken>(
    "/auth/login",
    validatedFields.data,
  );
  // ログイン失敗時のメッセージ
  if (status !== StatusCodes.OK) {
    return { message: "認証に失敗しました。" };
  }

  // セッションにトークン設定
  await setAccessToken(data.accessToken);

  redirect("/todos");
};
