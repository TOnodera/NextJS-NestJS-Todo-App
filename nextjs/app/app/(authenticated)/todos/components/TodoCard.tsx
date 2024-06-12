import { STATUSES } from "@/app/consts";
import { FragmentType, useFragment } from "@/graphql/@generated";
import { TodoFragmentFragmentDoc, UpdateTodoInput } from "@/graphql/@generated/graphql";
import { Card, Col, Radio, Row } from "antd";
import { Typography } from "antd";
import UpdateTodoModal from "./UpdateTodoModal";
import { useState } from "react";
import { DateTime } from "luxon";

const { Title } = Typography;

interface Props {
  todo: FragmentType<typeof TodoFragmentFragmentDoc>;
  afterMutation: () => void;
}
export default function TodoCard({ todo, afterMutation }: Props) {
  const todoFragment = useFragment(TodoFragmentFragmentDoc, todo);
  // 更新時のハンドラ
  const onUpdateTodoFormSubmitHandler = (updateTodoInput: UpdateTodoInput) => {
    console.log(updateTodoInput);
  };
  // モーダルオープン
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card onClick={() => setIsOpen(true)}>
        <Row justify="space-between">
          <Col>
            <Title level={3}>{todoFragment.title}</Title>
          </Col>
        </Row>
        <Row>
          <Col>{todoFragment.description}</Col>
        </Row>
        <Row justify="end">
          <Col>
            <span>
              登録日時: {DateTime.fromISO(todoFragment.createdAt).toFormat("yyyy年MM月dd日 H時m分")}
            </span>
          </Col>
        </Row>
      </Card>
      <UpdateTodoModal
        onSubmitHandler={onUpdateTodoFormSubmitHandler}
        todo={todo}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        afterMutation={afterMutation}
      />
    </>
  );
}
