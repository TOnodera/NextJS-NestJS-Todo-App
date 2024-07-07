"use client";
import { useRecreateUrqlClient } from "@/app/store/urqlStore";
import { Delete } from "@/app/utills/forClientCompentnts";
import { Button, Col, Row, theme } from "antd";
import { Header as AntdHeader } from "antd/es/layout/layout";
import { useRouter } from "next/navigation";

const { useToken } = theme;

export default function Header() {
  const { token } = useToken();
  const router = useRouter();
  const recreateUrqlClient = useRecreateUrqlClient();

  /**
   * ログアウト処理
   */
  const logout = async () => {
    // セッションからtokenを削除
    await Delete("/token");
    // urqlクライアント再生成
    recreateUrqlClient();
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
