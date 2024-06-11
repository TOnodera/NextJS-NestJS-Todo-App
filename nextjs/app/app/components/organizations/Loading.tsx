import { Col, Row, Spin } from "antd";

interface Props {
  isOpen: boolean;
}
export default function Loading({ isOpen }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100vh",
          display: `${isOpen ? "block" : "none"}`,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
        }}
      >
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      </div>
    </div>
  );
}
