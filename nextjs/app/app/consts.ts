export const TODO_TASK_STATUS = {
  DO: 1,
  DOING: 2,
  DONE: 3,
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
