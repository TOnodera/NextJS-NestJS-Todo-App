import { UpdateUserInput, User } from "@/graphql/@generated/graphql";
import { Button } from "antd";
import { useState } from "react";
import UpdateUserModal from "../../molecules/users/UpdateUserModal";

interface Props {
  user: User;
  onUpdateUserHandler: (updateUserInput: UpdateUserInput) => void;
}
export default function UpdateUser({ user, onUpdateUserHandler }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        編集
      </Button>
      <UpdateUserModal
        user={user}
        onCancel={() => setIsOpen(false)}
        onUpdateUserHandler={(updateUserInput: UpdateUserInput) => {
          onUpdateUserHandler(updateUserInput);
          setIsOpen(false);
        }}
        isOpen={isOpen}
      />
    </>
  );
}
