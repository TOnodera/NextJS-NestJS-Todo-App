import { TodoFragmentFragment, UpdateTodoInput } from "@/graphql/@generated/graphql";
import { Card, Col, Row } from "antd";
import { Typography } from "antd";
import UpdateTodoModal from "./UpdateTodoModal";
import { useState } from "react";
import { DateTime } from "luxon";

const { Title } = Typography;

interface Props {
  todo: TodoFragmentFragment;
  onUpdateTodoHandler: (updateTodoInput: UpdateTodoInput) => void;
  onDeleteTodoHandler: (id: number) => void;
}
export default function TodoCard({ todo, onUpdateTodoHandler, onDeleteTodoHandler }: Props) {
  // モーダルオープン
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card onClick={() => setIsOpen(true)}>
        <Row justify="space-between">
          <Col>
            <Title level={3}>{todo.title}</Title>
          </Col>
        </Row>
        <Row>
          <Col>{todo.description}</Col>
        </Row>
        <Row justify="end">
          <Col>
            <span>
              更新日時:
              {DateTime.fromISO(todo.updatedAt).toFormat("yyyy年MM月dd日 H時m分")}
            </span>
          </Col>
        </Row>
      </Card>
      <UpdateTodoModal
        isOpen={isOpen}
        todo={todo}
        onCancel={() => setIsOpen(false)}
        onDeleteHandler={onDeleteTodoHandler}
        onUpdateHandler={onUpdateTodoHandler}
      />
    </>
  );
}
