import { Todo } from "@/graphql/@generated/graphql";
import { Button } from "antd";
import { useState } from "react";
import DeleteTodoModal from "../../molecules/todos/DeleteTodoModal";

interface Props {
  todo: Todo;
  onDeleteTodoHandler: (id: number) => void;
}
export default function DeleteTodo({ todo, onDeleteTodoHandler }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="primary" danger onClick={() => setIsOpen(true)}>
        削除
      </Button>
      <DeleteTodoModal
        todo={todo}
        onCancel={() => setIsOpen(false)}
        onDeleteTodoHandler={(id) => {
          onDeleteTodoHandler(id);
          setIsOpen(false);
        }}
        isOpen={isOpen}
      />
    </>
  );
}
