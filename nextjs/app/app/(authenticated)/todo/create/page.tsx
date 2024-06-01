"use client";
import React from "react";
import { Button, Col, Form, Input, Row } from "antd";

export default function Page() {
  return (
    <Row justify="center">
      <Col xs={24} md={12}>
        <Form name="basic" initialValues={{ remember: true }}>
          <Form.Item
            label="タイトル"
            name="title"
            rules={[{ required: true, message: "タイトル" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="タスク詳細"
            name="description"
            rules={[
              { required: false, message: "タスクの詳細を入力してください。 " },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
