import { STATUSES } from "@/app/consts";
import { FragmentType, useFragment } from "@/graphql/@generated";
import {
  TodoFragmentFragmentDoc,
  UpdateTodoInput,
} from "@/graphql/@generated/graphql";
import { Button, Form, Input, Modal, Radio, Typography } from "antd";

const { Title } = Typography;

interface Props {
  onSubmitHandler: (updateTodoInput: UpdateTodoInput) => void;
  onCancel: () => void;
  todo: FragmentType<typeof TodoFragmentFragmentDoc>;
  isOpen: boolean;
}
export default function UpdateTodoModal({
  onSubmitHandler,
  onCancel,
  todo,
  isOpen,
}: Props) {
  const todoFragment = useFragment(TodoFragmentFragmentDoc, todo);
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel}>
      <Title level={4}>タスク更新</Title>
      <Form
        style={{ marginTop: "2rem" }}
        onFinish={(updateTodoInput: UpdateTodoInput) =>
          onSubmitHandler(updateTodoInput)
        }
        initialValues={{
          title: todoFragment.title,
          description: todoFragment.description,
        }}
      >
        <Form.Item
          label="タイトル"
          name="title"
          rules={[{ required: true, message: "タイトルを入力してください。" }]}
        >
          <Input name="title" value={todoFragment.title} />
        </Form.Item>
        <Form.Item label="タスク詳細" name="description">
          <Input.TextArea
            name="description"
            value={todoFragment.description ?? undefined}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          {STATUSES.map((status, idx) => (
            <Radio.Button name="status" key={idx} value={status.status}>
              {status.name}
            </Radio.Button>
          ))}
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button
            type="primary"
            htmlType="submit"
            ghost
            style={{ marginRight: "1rem" }}
          >
            更新
          </Button>
          <Button type="primary" danger>
            削除
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
