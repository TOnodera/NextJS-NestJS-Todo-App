"use client";
import { Card, Col, Row } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
export default function Error() {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        <Card>
          <Title level={4}>サーバーエラー</Title>
          <p>サーバーエラーが発生しました。しばらく時間をあけてからアクセスしてください。</p>
        </Card>
      </Col>
    </Row>
  );
}
