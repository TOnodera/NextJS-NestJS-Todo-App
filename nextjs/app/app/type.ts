import { StatusCodes } from "http-status-codes";

// ログイン情報
export interface Credentials {
  email: String;
  password: String;
}

// ログイン成功時のレスポンス
export interface AccessToken {
  accessToken: string;
}

// ログインエラー型
export type LoginFormErrorType =
  | {
      message: string;
      errors?: {
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export type ApiResponse<T> = {
  data: T;
  status: StatusCodes;
};

// セッションデータ型
export type SessionDataType = {
  sessionId: string;
  accessToken: string | undefined;
};
