"use client";
import {
  CreateTodoDocument,
  CreateTodoInput,
  GetTodosDocument,
} from "@/graphql/@generated/graphql";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "urql";
import TodoCard from "./TodoCard";

export default function Home() {
  //　登録モーダルオープン
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  // urql実行
  const [result, reexecuteQuery] = useQuery({ query: GetTodosDocument });
  const { data, fetching, error } = result;

  const [createTodoResult, createTodo] = useMutation(CreateTodoDocument);
  // 登録押下時のハンドラ
  const onSubmitHandler = (createTodoInput: CreateTodoInput) => {
    console.log(createTodoInput);
    createTodo({ createTodoInput })
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  };

  return (
    <div style={{height: "100%"}}>
      <Row justify="center" style={{ height: "10%" }}>
        <Col xs={24} md={20} xl={16} style={{ marginBottom: "1rem" }}>
          <Button type="primary" onClick={() => setIsOpenRegisterModal(true)}>
            <PlusSquareOutlined />
            登録
          </Button>
          <Modal
            open={isOpenRegisterModal}
            onCancel={() => setIsOpenRegisterModal(false)}
            footer={null}
          >
            <Form style={{ marginTop: "2rem" }} onFinish={onSubmitHandler}>
              <Form.Item
                label="タイトル"
                name="title"
                rules={[{ required: true, message: "タイトル" }]}
              >
                <Input name="title" />
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
                <Input.TextArea name="description" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button type="primary" htmlType="submit">
                  登録
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
      <div style={{ height: "90%", overflowY: "auto" }}>
        <Row justify="center">
          <Col xs={24} md={20} xl={16}>
            {data?.todos.map((todo, idx) => (
              <div key={idx} style={{ marginBottom: "1rem", cursor: "pointer" }}>
                <TodoCard todo={todo} />
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}
