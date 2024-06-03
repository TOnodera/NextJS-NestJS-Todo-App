"use client";
import { GetTodosDocument } from "@/graphql/@generated/graphql";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Skeleton } from "antd";
import { useState } from "react";
import { useQuery } from "urql";
import TodoCard from "./components/TodoCard";
import CreateTodoModal from "./components/CreateTodoModal";

export default function Home() {
  //　登録モーダルオープン
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  // urql実行
  const [result, reExecuteQuery] = useQuery({ query: GetTodosDocument });
  const { data, fetching, error } = result;
  // データ再取得用関数を作成
  const refetchTodos = async () => {
    reExecuteQuery({ requestPolicy: "network-only" });
  };

  return (
    <div style={{ height: "100%" }}>
      <Row justify="center" style={{ height: "10%" }}>
        <Col xs={24} md={20} xl={16} style={{ marginBottom: "1rem" }}>
          <Button type="primary" onClick={() => setIsOpenRegisterModal(true)}>
            <PlusSquareOutlined />
            登録
          </Button>
          <CreateTodoModal
            isOpen={isOpenRegisterModal}
            onCancel={() => setIsOpenRegisterModal(false)}
          />
        </Col>
      </Row>
      <div style={{ height: "90%", overflowY: "auto" }}>
        <Skeleton loading={fetching} active paragraph={{ rows: 8 }}>
          <Row justify="center">
            <Col xs={24} md={20} xl={16}>
              {data?.todos.map((todo, idx) => (
                <div
                  key={idx}
                  style={{ marginBottom: "1rem", cursor: "pointer" }}
                >
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
