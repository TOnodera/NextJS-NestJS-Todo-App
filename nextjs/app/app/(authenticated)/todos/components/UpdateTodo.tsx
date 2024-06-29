import { Todo, UpdateTodoInput } from "@/graphql/@generated/graphql";
import { Button } from "antd";
import { useState } from "react";
import UpdateTodoModal from "./UpdateTodoModal";

interface Props {
  todo: Todo;
  onUpdateTodoHandler: (updateTodoInput: UpdateTodoInput) => void;
}
export default function UpdateTodo({ todo, onUpdateTodoHandler }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        編集
      </Button>
      <UpdateTodoModal
        todo={todo}
        onCancel={() => setIsOpen(false)}
        onUpdateTodoHandler={(updateTodoInput: UpdateTodoInput) => {
          onUpdateTodoHandler(updateTodoInput);
          setIsOpen(false);
        }}
        isOpen={isOpen}
      />
    </>
  );
}
