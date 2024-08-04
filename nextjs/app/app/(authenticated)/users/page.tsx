import { Metadata } from "next";
import Client from "@/app/components/pages/users/Client";

export const metadata: Metadata = {
  title: "Todoアプリケーション",
  description: "Next.js/Nest.jsを使ったTodoアプリケーション作成(usersページ)",
};

export default function Page() {
  return <Client />;
}
