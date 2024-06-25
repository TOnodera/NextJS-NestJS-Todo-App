import { Roles } from "@/app/consts";
import { CreateUserInput } from "@/graphql/@generated/graphql";
import { Button, Form, Input, Modal, Radio, Typography } from "antd";

const { Title } = Typography;

interface Props {
  isOpen: boolean;
  onCreateUserHandler: (createUserInput: CreateUserInput) => void;
  onCancel: () => void;
}
export default function CreateUserModal({ isOpen, onCreateUserHandler, onCancel }: Props) {
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel}>
      <Title level={4}>新規ユーザー登録</Title>
      <Form
        initialValues={{ title: "", description: "" }}
        style={{ marginTop: "2rem" }}
        onFinish={onCreateUserHandler}
      >
        <Form.Item
          label="ユーザー名"
          name="name"
          rules={[{ required: true, message: "ユーザー名を入力してください。" }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          label="メールアドレス"
          name="email"
          rules={[{ required: true, message: "メールアドレスを入力してください。" }]}
        >
          <Input name="email" />
        </Form.Item>
        <Form.Item
          label="パスワード"
          name="password"
          rules={[{ required: true, message: "パスワードを入力してください。" }]}
        >
          <Input name="password" />
        </Form.Item>
        <Form.Item name="roleId" style={{ textAlign: "right" }}>
          <Radio.Group>
            {Roles.map((role) => (
              <Radio.Button key={role.type} value={role.type}>
                {role.name}
              </Radio.Button>
            ))}
          </Radio.Group>
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
