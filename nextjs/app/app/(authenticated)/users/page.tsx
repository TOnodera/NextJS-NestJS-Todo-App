"use client";
import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreateUserModal from "./components/CreateUserModal";
import { useMutation, useQuery } from "urql";
import {
  CreateUserDocument,
  CreateUserInput,
  GetUsersDocument,
  UserFragmentDoc,
} from "@/graphql/@generated/graphql";
import { useFragment } from "@/graphql/@generated";
import { Roles } from "@/app/consts";

interface DataType {
  key: React.Key;
  name: string;
  role: string;
  deleteButton: React.ReactNode;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "ユーザー名",
    dataIndex: "name",
  },
  {
    title: "ロール",
    dataIndex: "role",
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
  const [isOpen, setIsOpen] = useState(false);

  /**
   * ユーザー取得
   */
  const [result, reExecuteQuery] = useQuery({ query: GetUsersDocument });
  const { data, fetching, error } = result;
  const usersFragment = useFragment(UserFragmentDoc, data?.users);
  const dataSource: DataType[] | undefined = usersFragment?.map<DataType>((user, idx) => {
    return {
      key: idx,
      name: user.name,
      role: Roles.find((role) => role.type === user.roleId)!.name,
      updateButton: <Button type="primary">編集</Button>,
      deleteButton: (
        <Button type="primary" danger>
          削除
        </Button>
      ),
    };
  });

  /**
   * データ再取得関数
   */
  const reFetch = () => {
    reExecuteQuery({ requestPolicy: "network-only" });
  };

  /**
   * ユーザー登録
   */
  const [createUserResult, createUser] = useMutation(CreateUserDocument);
  const handleCreateUser = (createUserInput: CreateUserInput) => {
    createUser({ createUserInput })
      .then(() => reFetch())
      .finally(() => setIsOpen(false));
  };
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setIsOpen(true)}>
          <PlusSquareOutlined />
          登録
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource} />
      <CreateUserModal
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onCreateUserHandler={handleCreateUser}
      />
    </div>
  );
}
