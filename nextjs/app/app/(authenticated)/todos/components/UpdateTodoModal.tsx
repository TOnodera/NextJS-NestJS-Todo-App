import { STATUSES } from "@/app/consts";
import { TodoFragmentFragment, UpdateTodoInput } from "@/graphql/@generated/graphql";
import { Button, Form, Input, Modal, Radio, Typography } from "antd";

const { Title } = Typography;

interface Props {
  onUpdateHandler: (updateTodoInput: UpdateTodoInput) => void;
  onDeleteHandler: (id: number) => void;
  onCancel: () => void;
  todo: TodoFragmentFragment;
  isOpen: boolean;
}
export default function UpdateTodoModal({
  onUpdateHandler,
  onDeleteHandler,
  onCancel,
  todo,
  isOpen,
}: Props) {
  return (
    <Modal footer={null} open={isOpen} onCancel={onCancel}>
      <Title level={4}>タスク更新</Title>
      <Form
        style={{ marginTop: "2rem" }}
        onFinish={(value) => {
          onUpdateHandler(value);
          onCancel();
        }}
        initialValues={{
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status: todo.status,
        }}
      >
        <Form.Item hidden name="id">
          <Input type="hidden" />
        </Form.Item>
        <Form.Item
          label="タイトル"
          name="title"
          rules={[{ required: true, message: "タイトルを入力してください。" }]}
        >
          <Input name="title" value={todo.title} />
        </Form.Item>
        <Form.Item label="タスク詳細" name="description">
          <Input.TextArea name="description" value={todo.description ?? undefined} />
        </Form.Item>
        <Form.Item name="status" style={{ textAlign: "right" }}>
          <Radio.Group>
            {STATUSES.map((status, idx) => (
              <Radio.Button key={idx} value={status.status}>
                {status.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" ghost style={{ marginRight: "1rem" }}>
            更新
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              onDeleteHandler(todo.id);
              onCancel();
            }}
          >
            削除
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
