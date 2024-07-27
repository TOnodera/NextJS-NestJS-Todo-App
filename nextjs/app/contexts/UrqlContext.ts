"use client";
import { createContext } from "react";

export interface UrqlContextType {
  resetClient: () => void;
  isAuthError: boolean;
  isNetworkError: boolean;
}

export const UrqlContext = createContext<UrqlContextType | undefined>(undefined);
