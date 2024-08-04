import Client from "@/app/components/pages/todos/Client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todoアプリケーション",
  description: "Next.js/Nest.jsを使ったTodoアプリケーション作成(todosページ)",
};

export default function Page() {
  return <Client />;
}
