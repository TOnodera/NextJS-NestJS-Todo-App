export const TODO_TASK_STATUS = {
  DO: "DO",
  DOING: "DOING",
  DONE: "DONE",
} as const;
export type TODO_TASK_STATUS = (typeof TODO_TASK_STATUS)[keyof typeof TODO_TASK_STATUS];

export const STATUSES: { name: string; status: TODO_TASK_STATUS }[] = [
  {
    name: "未着手",
    status: TODO_TASK_STATUS.DO,
  },
  {
    name: "着手中",
    status: TODO_TASK_STATUS.DOING,
  },
  {
    name: "完了",
    status: TODO_TASK_STATUS.DONE,
  },
] as const;

export const Roles = [
  {
    type: "admin",
    name: "管理者",
  },
  {
    type: "user",
    name: "ユーザー",
  },
] as const;

// セッション用のクッキー有効期限(日数)
export const COOKIE_TTL_DAY = 7;
