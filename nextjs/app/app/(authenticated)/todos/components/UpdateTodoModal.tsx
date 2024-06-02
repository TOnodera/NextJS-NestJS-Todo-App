import { STATUSES } from "@/app/consts";
import { FragmentType, useFragment } from "@/graphql/@generated";
import {
  RemoveTodoDocument,
  TodoFragmentFragmentDoc,
  UpdateTodoDocument,
  UpdateTodoInput,
} from "@/graphql/@generated/graphql";
import { Button, Form, Input, Modal, Radio, Typography } from "antd";
import { useMutation } from "urql";

const { Title } = Typography;

interface Props {
  onSubmitHandler: (updateTodoInput: UpdateTodoInput) => void;
  onCancel: () => void;
  afterMutation: () => void;
  todo: FragmentType<typeof TodoFragmentFragmentDoc>;
  isOpen: boolean;
}
export default function UpdateTodoModal({
  onCancel,
  afterMutation,
  todo,
  isOpen,
}: Props) {
  const todoFragment = useFragment(TodoFragmentFragmentDoc, todo);

  // 更新処理
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodoDocument);
  const onUpdateButtonClick = async (updateTodoInput: UpdateTodoInput) => {
    await updateTodo({
      updateTodoInput: { ...updateTodoInput, id: todoFragment.id },
    });
    afterMutation();
    onCancel();
  };
  // 削除処理
  const [deleteTodoResult, removeTodo] = useMutation(RemoveTodoDocument);
  const onDeleteButtonClick = async () => {
    await removeTodo({ id: todoFragment.id });
    afterMutation();
    onCancel();
  };

  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel}>
      <Title level={4}>タスク更新</Title>
      <Form
        style={{ marginTop: "2rem" }}
        onFinish={async (updateTodoInput: UpdateTodoInput) =>
          await onUpdateButtonClick(updateTodoInput)
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
          <Button type="primary" danger onClick={onDeleteButtonClick}>
            削除
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
