"use client";
import {
  CreateTodoDocument,
  CreateTodoInput,
  GetTodosDocument,
  UpdateTodoInput,
} from "@/graphql/@generated/graphql";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row } from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "urql";
import TodoCard from "./TodoCard";
import CreateTodoForm from "./CreateTodoModal";
import CreateTodoModal from "./CreateTodoModal";

export default function Home() {
  //　登録モーダルオープン
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  // urql実行
  const [result, reexecuteQuery] = useQuery({ query: GetTodosDocument });
  const { data, fetching, error } = result;

  // 登録押下時のハンドラ
  const [createTodoResult, createTodo] = useMutation(CreateTodoDocument);
  const onCreateTodoFormSubmitHandler = (createTodoInput: CreateTodoInput) => {
    console.log(createTodoInput);
    createTodo({ createTodoInput })
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  };

  return (
    <div style={{ height: "100%" }}>
      <Row justify="center" style={{ height: "10%" }}>
        <Col xs={24} md={20} xl={16} style={{ marginBottom: "1rem" }}>
          <Button type="primary" onClick={() => setIsOpenRegisterModal(true)}>
            <PlusSquareOutlined />
            登録
          </Button>
          <CreateTodoModal
            isOpen={isOpenRegisterModal}
            onCancel={() => setIsOpenRegisterModal(false)}
            onSubmitHandler={onCreateTodoFormSubmitHandler}
          />
        </Col>
      </Row>
      <div style={{ height: "90%", overflowY: "auto" }}>
        <Row justify="center">
          <Col xs={24} md={20} xl={16}>
            {data?.todos.map((todo, idx) => (
              <div
                key={idx}
                style={{ marginBottom: "1rem", cursor: "pointer" }}
              >
                <TodoCard todo={todo} />
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}
