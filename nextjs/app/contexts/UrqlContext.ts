"use client";
import { createContext } from "react";

export interface UrqlContextType {
  resetClient: () => void;
  setIsAuthError: (isAuthError: boolean) => void;
  isAuthError: boolean;
  isNetworkError: boolean;
}

export const UrqlContext = createContext<UrqlContextType | undefined>(undefined);
