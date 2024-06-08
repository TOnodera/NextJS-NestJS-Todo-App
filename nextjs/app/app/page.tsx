"use client";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { onLoginSubmit } from "./actions/top/login";
import { useFormState } from "react-dom";
import { LoginFormErrorType } from "./type";
import Title from "antd/es/typography/Title";

export default function Page() {
  // エラーあったらstate変わる
  // エラーの初期状態はundefined
  const [state, dispatch] = useFormState<LoginFormErrorType>(onLoginSubmit, undefined);
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col>
        <Card>
          {state?.message && (
            <Title level={4} type="danger" style={{ textAlign: "center", marginBottom: "1rem" }}>
              {state.message}
            </Title>
          )}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: false }}
            autoComplete="off"
            onFinish={dispatch}
          >
            <Form.Item
              label="メールアドレス"
              name="email"
              rules={[{ message: "メールアドレスを入力してください。" }]}
              validateStatus={state?.errors?.email ? "error" : undefined}
              help={state?.errors?.email}
            >
              <Input name="email" style={{ marginLeft: "1rem" }} />
            </Form.Item>

            <Form.Item
              label="パスワード"
              name="password"
              rules={[{ message: "パスワードを入力してください。" }]}
              validateStatus={state?.errors?.password ? "error" : undefined}
              help={state?.errors?.password}
            >
              <Input.Password name="password" style={{ marginLeft: "1rem" }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: "right" }}>
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
