"use client";

import { AuthenticationError } from "@/app/type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function PromiseErrorHandler({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    /**
     * 捕捉されなかった非同期エラーを処理する
     * @param {PromiseRejectionEvent} event
     */
    const handler = (event: PromiseRejectionEvent) => {
      event.promise.catch((error) => {
          // これ以上バブリングするとコンソールエラーとなる
          event.preventDefault();
        if (error instanceof AuthenticationError) {
          router.push("/");
          return;
        }
        throw error;
      });
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  });
  return <div>{children}</div>;
}
