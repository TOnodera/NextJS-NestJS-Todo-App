"use client";
import Error from "@/app/error";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function ErrorHandler({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>;
}
