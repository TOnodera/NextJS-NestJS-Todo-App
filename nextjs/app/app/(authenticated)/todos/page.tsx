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
import { Button, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "urql";
import CreateTodoModal from "./components/CreateTodoModal";
import { useRouter } from "next/navigation";
import { useFragment } from "@/graphql/@generated";
import UpdateTodo from "./components/UpdateTodo";
import DeleteTodo from "./components/DeleteTodo";

interface DataType {
  key: React.Key;
  name: string;
  updateButton: React.ReactNode;
  deleteButton: React.ReactNode;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "タスク名",
    dataIndex: "title",
  },
  {
    title: "編集",
    dataIndex: "updateButton",
  },
  {
    title: "削除",
    dataIndex: "deleteButton",
  },
];

export default function Page() {
  // ルーター取得
  const router = useRouter();
  //　登録モーダルオープン
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  /**
   * データ取得処理実行
   */
  const [result, reExecuteQuery] = useQuery({ query: GetTodosDocument });
  const { data, fetching, error } = result;
  // 認証エラーの場合はログイン画面にリダイレクト
  if (error?.graphQLErrors.some((error) => error.message === "Unauthorized")) {
    router.push("/");
  }
  /**
   * データ再取得関数定義（キャッシュからではなくネットワークから取得）
   */
  const reFetch = () => {
    reExecuteQuery({ requestPolicy: "network-only" });
  };
  // 型をつける
  const todoFragments = useFragment(TodoFragmentFragmentDoc, data?.todos);

  /**
   * 登録処理
   */
  const [_, createTodo] = useMutation(CreateTodoDocument);
  const handleCreateTodo = (createTodoInput: CreateTodoInput) => {
    createTodo({ createTodoInput })
      .then(() => {
        // データ再取得
        reFetch();
      })
      .finally(() => {
        // モーダルクローズ
        setIsOpenCreateModal(false);
      });
  };
  /**
   * 更新処理
   */
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodoDocument);
  const handleUpdateTodo = (updateTodoInput: UpdateTodoInput) => {
    updateTodo({ updateTodoInput }).then(() => {
      reFetch();
    });
  };
  /**
   * 削除処理
   */
  const [deleteTodoResult, deleteTodo] = useMutation(RemoveTodoDocument);
  const handleDeleteTodo = (id: number) => {
    deleteTodo({ id }).then(() => {
      reFetch();
    });
  };

  /**
   * 表示データ
   */
  const dataSource: DataType[] | undefined = todoFragments?.map<DataType>((todo, idx) => {
    return {
      key: idx,
      name: todo.title,
      updateButton: <UpdateTodo todo={todo} onUpdateTodoHandler={handleUpdateTodo} />,
      deleteButton: <DeleteTodo todo={todo} onDeleteTodoHandler={handleDeleteTodo} />,
    };
  });

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsOpenCreateModal(true)}>
          <PlusSquareOutlined />
          登録
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <CreateTodoModal
        onCreateTodoHandler={handleCreateTodo}
        isOpen={isOpenCreateModal}
        onCancel={() => setIsOpenCreateModal(false)}
      />
    </div>
  );
}
