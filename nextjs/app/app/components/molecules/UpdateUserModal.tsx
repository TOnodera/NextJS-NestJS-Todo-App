import { Roles } from "@/app/consts";
import { UpdateUserInput, User } from "@/graphql/@generated/graphql";
import { Button, Form, Input, Modal, Radio, Typography } from "antd";
import { FormContext } from "antd/es/form/context";
import { userAgent } from "next/server";

const { Title } = Typography;

interface Props {
  isOpen: boolean;
  user: User;
  onUpdateUserHandler: (updateUserInput: UpdateUserInput) => void;
  onCancel: () => void;
}
export default function UpdateUserModal({ isOpen, user, onUpdateUserHandler, onCancel }: Props) {
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel}>
      <Title level={4}>ユーザー更新</Title>
      <Form
        initialValues={{ id: user.id, name: user.name, email: user.email, roleId: user.roleId }}
        style={{ marginTop: "2rem" }}
        onFinish={onUpdateUserHandler}
      >
        <Form.Item hidden name="id">
          <Input name="id" type="hidden" />
        </Form.Item>
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
            更新
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
