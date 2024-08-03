"use client";
import React, { Suspense } from "react";
import Loading from "../organizations/Loading";

/**
 * サーバーコンポーネントでSuspence呼び出したいのでuse clientディレクティブを付けたラッパーとしてこのコンポーネントを作成
 */
interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
export default function SuspenseWrapper({ children, fallback = <Loading isOpen /> }: Props) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
