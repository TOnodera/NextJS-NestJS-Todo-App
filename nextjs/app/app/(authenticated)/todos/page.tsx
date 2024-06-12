"use client";
import { GetTodosDocument } from "@/graphql/@generated/graphql";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Skeleton } from "antd";
import { useState } from "react";
import { useQuery } from "urql";
import TodoCard from "./components/TodoCard";
import CreateTodoModal from "./components/CreateTodoModal";
import { useRouter } from "next/navigation";

export default function Home() {
  //　登録モーダルオープン
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const router = useRouter();

  // urql実行
  const [result, reExecuteQuery] = useQuery({ query: GetTodosDocument });
  const { data, fetching, error } = result;

  // 認証エラーの場合はログイン画面にリダイレクト
  if (error?.graphQLErrors.some((error) => error.message === "Unauthorized")) {
    router.push("/");
  }

  // データ再取得用関数を作成
  const refetchTodos = async () => {
    reExecuteQuery({ requestPolicy: "network-only" });
  };

  // 新規登録ボタン押下後の処理
  const afterRegisterSubmit = async () => {
    // データ再取得
    await refetchTodos();
    // モーダルクローズ
    setIsOpenRegisterModal(false);
  };

  return (
    <div style={{ height: "100%" }}>
      <Row justify="center" style={{ height: "10%" }}>
        <Col xs={24} md={20} xl={16} style={{ marginBottom: "1rem" }}>
          <Button type="primary" onClick={() => setIsOpenRegisterModal(true)}>
            <PlusSquareOutlined />
            登録
          </Button>
          <CreateTodoModal isOpen={isOpenRegisterModal} afterSubmit={afterRegisterSubmit} />
        </Col>
      </Row>
      <div style={{ height: "90%", overflowY: "auto" }}>
        <Skeleton loading={fetching} active paragraph={{ rows: 8 }}>
          <Row justify="center">
            <Col xs={24} md={20} xl={16}>
              {data?.todos.map((todo, idx) => (
                <div key={idx} style={{ marginBottom: "1rem", cursor: "pointer" }}>
                  <TodoCard todo={todo} afterMutation={refetchTodos} />
                </div>
              ))}
            </Col>
          </Row>
        </Skeleton>
      </div>
    </div>
  );
}
