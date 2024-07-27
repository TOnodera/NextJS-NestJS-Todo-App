"use client";
import {
  CreateTodoDocument,
  CreateTodoInput,
  GetTodosDocument,
  RemoveTodoDocument,
  TodoFragmentDoc,
  UpdateTodoDocument,
  UpdateTodoInput,
} from "@/graphql/@generated/graphql";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Suspense, useState } from "react";
import { useMutation, useQuery } from "urql";
import CreateTodoModal from "../../components/molecules/todos/CreateTodoModal";
import { useFragment } from "@/graphql/@generated";
import UpdateTodo from "../../components/organizations/todos/UpdateTodo";
import DeleteTodo from "../../components/organizations/todos/DeleteTodo";
import TodoTable, { TodoTableDataType } from "@/app/components/organizations/todos/TodoTable";
import Loading from "@/app/components/organizations/Loading";

export default function Page() {
  //　登録モーダルオープン
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  /**
   * データ取得処理実行
   */
  const [result, reExecuteQuery] = useQuery({ query: GetTodosDocument });
  const { data, fetching } = result;

  /**
   * データ再取得関数定義
   */
  const reFetch = () => {
    reExecuteQuery();
  };
  // 型をつける
  const todoFragments = useFragment(TodoFragmentDoc, data?.todos);

  /**
   * 登録処理
   */
  const [, createTodo] = useMutation(CreateTodoDocument);
  const handleCreateTodo = (createTodoInput: CreateTodoInput) => {
    createTodo({ createTodoInput })
      .then(() => {
        reFetch();
      })
      .finally(() => {
        setIsOpenCreateModal(false);
      });
  };

  /**
   * 更新処理
   */
  const [, updateTodo] = useMutation(UpdateTodoDocument);
  const handleUpdateTodo = (updateTodoInput: UpdateTodoInput) => {
    updateTodo({ updateTodoInput }).then(() => {
      reFetch();
    });
  };

  /**
   * 削除処理
   */
  const [, deleteTodo] = useMutation(RemoveTodoDocument);
  const handleDeleteTodo = (id: number) => {
    deleteTodo({ id }).then(() => {
      reFetch();
    });
  };

  /**
   * 表示データ
   */
  const dataSource: TodoTableDataType[] | undefined = todoFragments?.map<TodoTableDataType>(
    (todo) => {
      return {
        key: todo.id,
        title: todo.title,
        updateButton: <UpdateTodo todo={todo} onUpdateTodoHandler={handleUpdateTodo} />,
        deleteButton: <DeleteTodo todo={todo} onDeleteTodoHandler={handleDeleteTodo} />,
      };
    },
  );

  return (
    <>
      {fetching ? (
        <Loading isOpen />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={() => setIsOpenCreateModal(true)}>
              <PlusSquareOutlined />
              登録
            </Button>
          </div>
          <TodoTable dataSource={dataSource} />
          <CreateTodoModal
            onCreateTodoHandler={handleCreateTodo}
            isOpen={isOpenCreateModal}
            onCancel={() => setIsOpenCreateModal(false)}
          />
        </>
      )}
    </>
  );
}
