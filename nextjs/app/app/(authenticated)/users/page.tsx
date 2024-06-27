"use client";
import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreateUserModal from "../../components/molecules/CreateUserModal";
import { useMutation, useQuery } from "urql";
import {
  CreateUserDocument,
  CreateUserInput,
  DeleteUserDocument,
  GetUsersDocument,
  UpdateUserDocument,
  UpdateUserInput,
  UserFragmentDoc,
} from "@/graphql/@generated/graphql";
import { useFragment } from "@/graphql/@generated";
import { Roles } from "@/app/consts";
import UpdateUser from "@/app/components/organizations/users/UpdateUser";
import DeleteUser from "@/app/components/organizations/users/DeleteUser";

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
  // 登録モーダルの開閉状態管理
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  /**
   * ユーザー取得
   */
  const [result, reExecuteQuery] = useQuery({ query: GetUsersDocument });
  const { data, fetching, error } = result;
  const usersFragment = useFragment(UserFragmentDoc, data?.users);

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
      .finally(() => setIsOpenCreateModal(false));
  };

  /**
   * ユーザー更新
   */
  const [updateUserResult, updateUser] = useMutation(UpdateUserDocument);
  const handleUpdateUser = (updateUserInput: UpdateUserInput) => {
    updateUser({ updateUserInput })
      .then(() => reFetch())
      .finally(() => console.log(updateUserResult));
  };

  /**
   * ユーザー削除
   */
  const [deleteUserResult, deleteUser] = useMutation(DeleteUserDocument);
  const handleDeleteUser = (id: number) => {
    deleteUser({ id }).then(() => reFetch());
  };

  /**
   * 表示データ
   */
  const dataSource: DataType[] | undefined = usersFragment?.map<DataType>((user, idx) => {
    return {
      key: idx,
      name: user.name,
      role: Roles.find((role) => role.type === user.roleId)!.name,
      updateButton: <UpdateUser user={user} onUpdateUserHandler={handleUpdateUser} />,
      deleteButton: <DeleteUser user={user} onDeleteUserHandler={handleDeleteUser} />,
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
      <CreateUserModal
        isOpen={isOpenCreateModal}
        onCancel={() => setIsOpenCreateModal(false)}
        onCreateUserHandler={handleCreateUser}
      />
    </div>
  );
}
