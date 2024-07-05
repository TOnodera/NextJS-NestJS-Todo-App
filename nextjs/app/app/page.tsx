"use client";
import { Button, Card, Col, Row } from "antd";
import Loading from "./components/organizations/Loading";
import { useState } from "react";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "urql";
import { LoginDocument } from "@/graphql/@generated/graphql";
import { post } from "./utills/forClientCompentnts";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "メールアドレスを入力してください。" }),
  password: z.string().min(1, { message: "パスワードを入力してください。" }),
});
type Schema = z.infer<typeof schema>;

export default function Page() {
  const [isPending, setIsPending] = useState(false);
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
    const { data } = await login({ loginInput });
    if (data) {
      console.log(1);
      await post<{ accessToken: string }, void>("/token", { accessToken: data.login.accessToken });
      console.log(2);
      router.push("/todos");
    }
    setIsPending(false);
  };

  return (
    <>
      <Loading isOpen={isPending} />
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col>
          <Card>
            <form>
              <div>
                <input type="text" {...register("email")} />
                {errors.email?.message && <p>{errors.email.message}</p>}
              </div>
              <div>
                <input type="text" {...register("password")} />
                {errors.password?.message && <p>{errors.password.message}</p>}
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
