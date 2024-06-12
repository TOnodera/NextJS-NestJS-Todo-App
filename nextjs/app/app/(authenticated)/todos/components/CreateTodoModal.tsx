import { CreateTodoDocument, CreateTodoInput } from "@/graphql/@generated/graphql";
import { Button, Form, Input, Modal, Typography } from "antd";
import { useMutation } from "urql";

const { Title } = Typography;

interface Props {
  isOpen: boolean;
  afterSubmit: () => Promise<void>;
}
export default function CreateTodoModal({ isOpen, afterSubmit }: Props) {
  // 登録押下時のハンドラ
  const [_, createTodo] = useMutation(CreateTodoDocument);
  const onSubmitHandler = async (createTodoInput: CreateTodoInput) => {
    await createTodo({ createTodoInput });
  };

  return (
    <Modal open={isOpen} onCancel={afterSubmit} footer={null}>
      <Title level={4}>新規タスク登録</Title>
      <Form
        style={{ marginTop: "2rem" }}
        onFinish={async (createTodoInput: CreateTodoInput) => {
          await onSubmitHandler(createTodoInput);
          await afterSubmit();
        }}
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
