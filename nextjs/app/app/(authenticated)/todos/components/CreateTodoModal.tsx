import { CreateTodoInput } from "@/graphql/@generated/graphql";
import { Button, Form, Input, Modal, Typography } from "antd";

const { Title } = Typography;

interface Props {
  isOpen: boolean;
  onCreateTodoHandler: (createTodoInput: CreateTodoInput) => void;
  onCancel: ()=>void;
}
export default function CreateTodoModal({ isOpen, onCreateTodoHandler, onCancel }: Props) {
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel}>
      <Title level={4}>新規タスク登録</Title>
      <Form
        initialValues={{ title: "", description: "" }}
        style={{ marginTop: "2rem" }}
        onFinish={onCreateTodoHandler}
      >
        <Form.Item
          label="タイトル"
          name="title"
          rules={[{ required: true, message: "タイトルを入力してください。" }]}
        >
          <Input name="title" />
        </Form.Item>
        <Form.Item label="タスク詳細" name="description">
          <Input.TextArea name="description" />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            登録
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
