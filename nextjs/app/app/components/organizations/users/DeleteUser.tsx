import { User } from "@/graphql/@generated/graphql";
import { Button } from "antd";
import { useState } from "react";
import DeleteUserModal from "../../molecules/users/DeleteUserModal";

interface Props {
  user: User;
  onDeleteUserHandler: (id: number) => void;
}
export default function DeleteUser({ user, onDeleteUserHandler }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" danger onClick={() => setIsOpen(true)}>
        削除
      </Button>
      <DeleteUserModal
        user={user}
        onCancel={() => setIsOpen(false)}
        onDeleteUserHandler={(id) => {
          onDeleteUserHandler(id);
          setIsOpen(false);
        }}
        isOpen={isOpen}
      />
    </>
  );
}
