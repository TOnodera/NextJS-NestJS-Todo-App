"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreateUserModal from "../../components/molecules/users/CreateUserModal";
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
import UserTable, { UserTableDataType } from "@/app/components/organizations/users/UserTable";
import Loading from "@/app/components/organizations/Loading";

export default function Page() {
  // 登録モーダルの開閉状態管理
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  /**
   * ユーザー取得
   */
  const [result, reExecuteQuery] = useQuery({
    query: GetUsersDocument,
  });
  const { data, fetching, error } = result;
  const usersFragment = useFragment(UserFragmentDoc, data?.users);

  /**
   * データ再取得関数
   */
  const reFetch = () => {
    reExecuteQuery();
  };

  /**
   * ユーザー登録
   */
  const [, createUser] = useMutation(CreateUserDocument);
  const handleCreateUser = (createUserInput: CreateUserInput) => {
    createUser({ createUserInput })
      .then(() => reFetch())
      .finally(() => setIsOpenCreateModal(false));
  };

  /**
   * ユーザー更新
   */
  const [, updateUser] = useMutation(UpdateUserDocument);
  const handleUpdateUser = (updateUserInput: UpdateUserInput) => {
    updateUser({ updateUserInput }).then(() => reFetch());
  };

  /**
   * ユーザー削除
   */
  const [, deleteUser] = useMutation(DeleteUserDocument);
  const handleDeleteUser = (id: number) => {
    deleteUser({ id }).then(() => reFetch());
  };

  /**
   * 表示データ
   */
  const dataSource: UserTableDataType[] | undefined = usersFragment?.map<UserTableDataType>(
    (user) => {
      return {
        key: user.id,
        name: user.name,
        role: Roles.find((role) => role.type === user.roleId)!.name,
        updateButton: <UpdateUser user={user} onUpdateUserHandler={handleUpdateUser} />,
        deleteButton: <DeleteUser user={user} onDeleteUserHandler={handleDeleteUser} />,
      };
    },
  );

  return (
    <>
      {fetching || error ? (
        <Loading isOpen />
      ) : (
        <>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={() => setIsOpenCreateModal(true)}>
              <PlusSquareOutlined />
              登録
            </Button>
          </div>
          <UserTable dataSource={dataSource} />
          <CreateUserModal
            isOpen={isOpenCreateModal}
            onCancel={() => setIsOpenCreateModal(false)}
            onCreateUserHandler={handleCreateUser}
          />
        </>
      )}
    </>
  );
}
