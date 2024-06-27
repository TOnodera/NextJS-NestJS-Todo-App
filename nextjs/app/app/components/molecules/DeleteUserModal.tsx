import { User } from "@/graphql/@generated/graphql";
import { Button, Form, Modal, Typography } from "antd";

const { Title } = Typography;

interface Props {
  isOpen: boolean;
  user: User;
  onDeleteUserHandler: (id: number) => void;
  onCancel: () => void;
}
export default function DeleteUserModal({ isOpen, user, onDeleteUserHandler, onCancel }: Props) {
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel}>
      <Title level={4}>ユーザー削除</Title>
      <Typography>削除しますか？</Typography>
      <Form
        initialValues={{ name: user.name, email: user.email, roleId: user.roleId }}
        style={{ marginTop: "2rem" }}
        onFinish={() => onDeleteUserHandler(user.id)}
      >
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            削除
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
