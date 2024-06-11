"use client";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { onLoginSubmit } from "./actions/top/login";
import { useFormState } from "react-dom";
import { Credentials, LoginFormStateType } from "./type";
import Title from "antd/es/typography/Title";
import Loading from "./components/organizations/Loading";
import { useEffect, useState } from "react";

export default function Page() {
  // const [formState, dispatch, isPending] = useFormState<LoginFormStateType, Credentials>(onLoginSubmit, {});
  // TODO ↑これでisPending使いたいがなぜかうまくいかない
  const [formState, dispatch] = useFormState<LoginFormStateType, Credentials>(onLoginSubmit, {});
  const [isPending, setIsPendind] = useState(false);

  // TODO useFormStateのpending使いたい
  useEffect(() => {
    setIsPendind(false);
  }, [formState]);
  return (
    <>
      <Loading isOpen={isPending} />
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Card>
            {formState?.message && (
              <Title level={4} type="danger" style={{ textAlign: "center", marginBottom: "1rem" }}>
                {formState.message}
              </Title>
            )}
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: false }}
              autoComplete="off"
              onFinish={(value) => {
                dispatch(value);
                setIsPendind(true);
              }}
            >
              <Form.Item
                label="メールアドレス"
                name="email"
                validateStatus={formState?.errors?.email ? "error" : undefined}
                help={formState?.errors?.email}
              >
                <Input name="email" style={{ marginLeft: "1rem" }} />
              </Form.Item>

              <Form.Item
                label="パスワード"
                name="password"
                validateStatus={formState?.errors?.password ? "error" : undefined}
                help={formState?.errors?.password}
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
    </>
  );
}
