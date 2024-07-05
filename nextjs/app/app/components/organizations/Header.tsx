"use client";
import { Button, Col, Row, theme } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";

const { useToken } = theme;

export default function Header() {
  const { token } = useToken();
  return (
    <AntdHeader
      style={{
        // backgroundColor: token.colorPrimaryBg,
        paddingLeft: token.paddingXS,
      }}
    >
      <Row>
        <Col>
          <h1 style={{ color: token.colorTextLightSolid }}>Todo App</h1>
        </Col>
        <Col>
          <Button>TEST</Button>
        </Col>
      </Row>
    </AntdHeader>
  );
}
