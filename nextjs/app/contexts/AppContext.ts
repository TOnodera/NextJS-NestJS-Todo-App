"use client";
import { NotificationInstance } from "antd/es/notification/interface";
import { createContext } from "react";

export interface AppContextType {
  resetClient: () => void;
  setIsAuthError: (isAuthError: boolean) => void;
  isAuthError: boolean;
  isNetworkError: boolean;
  notificationApi: NotificationInstance;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
