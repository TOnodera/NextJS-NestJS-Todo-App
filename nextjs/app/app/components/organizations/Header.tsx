"use client";
import { Delete, env } from "@/app/utills/forClientCompentnts";
import { UrqlContext } from "@/contexts/UrqlContext";
import { Button, Col, Row, theme } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const { useToken } = theme;

export default function Header() {
  const url = env().graphqlUrl;
  const { token } = useToken();
  const router = useRouter();
  const urqlContext = useContext(UrqlContext);

  /**
   * ログアウト処理
   */
  const logout = async () => {
    // セッションからtokenを削除
    await Delete("/token");
    // urqlクライアント再生成
    urqlContext?.resetClient();
    // トップに遷移
    router.push("/");
  };
  return (
    <AntdHeader
      style={{
        // backgroundColor: token.colorPrimaryBg,
        paddingLeft: token.paddingXS,
      }}
    >
      <Row justify="space-between">
        <Col>
          <h1 style={{ color: token.colorTextLightSolid }}>Todo App</h1>
        </Col>
        <Col>
          <Button type="primary" onClick={logout}>
            ログアウト
          </Button>
        </Col>
      </Row>
    </AntdHeader>
  );
}
