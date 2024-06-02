import { CreateTodoInput } from "@/graphql/@generated/graphql";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

interface Props {
  onSubmitHandler: (createTodoInput: CreateTodoInput) => void;
}
export default function CreateTodoForm({ onSubmitHandler }: Props) {
  return (
    <>
      <Title level={4}>新規タスク登録</Title>
      <Form
        style={{ marginTop: "2rem" }}
        onFinish={(createTodoInput: CreateTodoInput) =>
          onSubmitHandler(createTodoInput)
        }
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
    </>
  );
}
