"use client";
import { Button, Card, Col, Form, Input, Row } from "antd";

export default function Page() {
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col>
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="ユーザー名"
              name="username"
              rules={[{ message: "ユーザー名を入力してください。" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="パスワード"
              name="password"
              rules={[{ message: "パスワードを入力してください。" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 8, span: 16 }}
              style={{ textAlign: "right" }}
            >
              <Button type="primary" htmlType="submit">
                ログイン
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
