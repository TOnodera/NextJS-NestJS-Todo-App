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
export type LoginFormStateType = {
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export type ApiResponse<T> = {
  data: T;
  status: StatusCodes;
};

// セッションデータ型
export type SessionDataType = {
  sessionId: string;
  accessToken: string | undefined;
};

abstract class BaseError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 認証エラー型
export class AuthenticationError extends BaseError {}
