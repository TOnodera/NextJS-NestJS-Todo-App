"use client";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { useState } from "react";

export default function Home() {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "done",
      dataIndex: "done",
      key: "done",
    },
  ];
  const dataSource = [
    {
      id: 1,
      title: "title1",
      done: false,
    },
    {
      id: 2,
      title: "title2",
      done: true,
    },
  ];

  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

  return (
    <Row justify="center">
      <Col xs={24} md={20} style={{ marginBottom: "1rem" }}>
        <Button type="primary" onClick={() => setIsOpenRegisterModal(true)}>
          <PlusSquareOutlined />
          登録
        </Button>
        <Modal
          open={isOpenRegisterModal}
          onCancel={() => setIsOpenRegisterModal(false)}
          footer={null}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            style={{ marginTop: "2rem" }}
          >
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
                {
                  required: false,
                  message: "タスクの詳細を入力してください。 ",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                登録
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Col>
      <Col xs={24} md={20}>
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
      </Col>
    </Row>
  );
}
