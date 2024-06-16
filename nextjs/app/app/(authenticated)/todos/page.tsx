"use client";
import {
  CreateTodoDocument,
  CreateTodoInput,
  GetTodosDocument,
  RemoveTodoDocument,
  TodoFragmentFragmentDoc,
  UpdateTodoDocument,
  UpdateTodoInput,
} from "@/graphql/@generated/graphql";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Skeleton } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "urql";
import CreateTodoModal from "./components/CreateTodoModal";
import { useRouter } from "next/navigation";
import { useFragment } from "@/graphql/@generated";
import TodoCard from "./components/TodoCard";

export default function Home() {
  // ルーター取得
  const router = useRouter();
  // urql実行
  const [result, reExecuteQuery] = useQuery({ query: GetTodosDocument });
  const { data, fetching, error } = result;
  // 認証エラーの場合はログイン画面にリダイレクト
  if (error?.graphQLErrors.some((error) => error.message === "Unauthorized")) {
    router.push("/");
  }
  // 型をつける
  const todoFragments = useFragment(TodoFragmentFragmentDoc, data?.todos);
  //　登録モーダルオープン
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  /**
   * データ再取得（キャッシュからではなくネットワークから取得）
   */
  const reFetch = () => {
    reExecuteQuery({ requestPolicy: "network-only" });
  };
  /**
   * 登録処理
   */
  const [_, createTodo] = useMutation(CreateTodoDocument);
  const onCreateTodoHandler = (createTodoInput: CreateTodoInput) => {
    createTodo({ createTodoInput })
      .then(() => {
        // データ再取得
        reFetch();
      })
      .finally(() => {
        // モーダルクローズ
        setIsOpenRegisterModal(false);
      });
  };
  /**
   * 更新処理
   */
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodoDocument);
  const onUpdateTodoHandler = (updateTodoInput: UpdateTodoInput) => {
    updateTodo({ updateTodoInput }).then(() => reFetch());
  };
  /**
   * 削除処理
   */
  const [deleteTodoResult, removeTodo] = useMutation(RemoveTodoDocument);
  const onDeleteTodoHandler = (id: number) => {
    removeTodo({ id }).then(() => reFetch());
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
            onCreateTodoHandler={onCreateTodoHandler}
          />
        </Col>
      </Row>
      <div style={{ height: "90%", overflowY: "auto" }}>
        <Skeleton loading={fetching} active paragraph={{ rows: 8 }}>
          <Row justify="center">
            <Col xs={24} md={20} xl={16}>
              {todoFragments?.map((todo, idx) => (
                <div key={idx} style={{ marginBottom: "1rem", cursor: "pointer" }}>
                  <TodoCard
                    onUpdateTodoHandler={onUpdateTodoHandler}
                    onDeleteTodoHandler={onDeleteTodoHandler}
                    todo={todo}
                  />
                </div>
              ))}
            </Col>
          </Row>
        </Skeleton>
      </div>
    </div>
  );
}
