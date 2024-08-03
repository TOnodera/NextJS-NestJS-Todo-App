import SuspenseWrapper from "@/app/components/atoms/SuspenceWrapper";
import Client from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todoアプリケーション",
  description: "Next.js/Nest.jsを使ったTodoアプリケーション作成(todosページ)",
};

export default function Page() {
  return (
    <SuspenseWrapper>
      <Client />
    </SuspenseWrapper>
  );
}
