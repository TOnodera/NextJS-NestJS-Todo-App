"use client";
import { Button, Card, Col, Row } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col>
        <Card>
          <Title level={4}>サーバーエラー</Title>
          <p>
            サーバーエラーが発生しました。リクエストボタンを押すか、しばらく時間をあけてからアクセスしてください。
          </p>
          <Button onClick={reset} type="primary">
            リクエスト
          </Button>
        </Card>
      </Col>
    </Row>
  );
}
