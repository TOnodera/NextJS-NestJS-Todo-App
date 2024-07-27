"use client";
import { Button, Card, Col, Row } from "antd";
import Loading from "./components/organizations/Loading";
import { useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "urql";
import { LoginDocument } from "@/graphql/@generated/graphql";
import { Post } from "./utills/forClientCompentnts";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";
import { UrqlContext } from "@/contexts/UrqlContext";

const schema = z.object({
  email: z.string().email({ message: "メールアドレスを入力してください。" }),
  password: z.string().min(1, { message: "パスワードを入力してください。" }),
});
type Schema = z.infer<typeof schema>;

export default function Page() {
  const urqlContext = useContext(UrqlContext);
  const [isPending, setIsPending] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const [, login] = useMutation(LoginDocument);
  const onSubmitHandler = async (loginInput: Schema) => {
    setIsPending(true);
    // ログイン試行
    const { data } = await login({ loginInput });
    if (!data?.login.accessToken) {
      setIsAuthError(true);
      setIsPending(false);
      router.push("/");
      return;
    }
    setIsAuthError(false);
    // トークン取得出来たらセッションに保存
    await Post<{ accessToken: string }, void>("/token", {
      accessToken: data.login.accessToken,
    });
    // urqlクライアント再生成
    urqlContext?.resetClient();
    // todoページに遷移
    router.push("/todos");
    setIsPending(false);
  };

  return (
    <>
      <Loading isOpen={isPending} />
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Card>
            {isAuthError && <p className={style["login-error-message"]}>認証に失敗しました。</p>}
            <h2>ログイン</h2>
            <form className={style["login-form"]}>
              <div className={style["login-form__row"]}>
                <input className={style["login-form__input"]} type="text" {...register("email")} />
                <div className={style["login-form__error"]}>
                  {errors.email?.message && <p>{errors.email.message}</p>}
                </div>
              </div>
              <div className={style["login-form__row"]}>
                <input
                  className={style["login-form__input"]}
                  type="text"
                  {...register("password")}
                />
                <div className={style["login-form__error"]}>
                  {errors.password?.message && <p>{errors.password.message}</p>}
                </div>
              </div>
              <Button type="primary" onClick={handleSubmit(onSubmitHandler)}>
                ログイン
              </Button>
            </form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
