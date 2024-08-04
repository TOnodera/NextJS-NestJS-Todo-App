"use client";
import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";

export interface User {
  userId: number;
  userName: string;
  roleId: string;
}
export interface AppContextType {
  resetClient: () => void;
  setIsAuthError: (isAuthError: boolean) => void;
  isAuthError: boolean;
  isNetworkError: boolean;
  notificationApi: NotificationInstance;
  setUser: (user: User) => void;
  getUser: () => User | undefined;
}

export const AppContext = createContext<AppContextType>({} as unknown as AppContextType);
