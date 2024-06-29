import { Todo } from "@/graphql/@generated/graphql";
import { Button, Form, Modal, Typography } from "antd";

const { Title } = Typography;

interface Props {
  isOpen: boolean;
  todo: Todo;
  onDeleteTodoHandler: (id: number) => void;
  onCancel: () => void;
}
export default function DeleteTodoModal({ isOpen, todo, onDeleteTodoHandler, onCancel }: Props) {
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel}>
      <Title level={4}>タスク削除</Title>
      <Typography>削除しますか？</Typography>
      <Form style={{ marginTop: "2rem" }} onFinish={() => onDeleteTodoHandler(todo.id)}>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            削除
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
