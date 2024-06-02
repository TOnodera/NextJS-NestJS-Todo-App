import { STATUSES } from "@/app/consts";
import { FragmentType, useFragment } from "@/graphql/@generated";
import { TodoFragmentFragmentDoc } from "@/graphql/@generated/graphql";
import { Card, Col, Radio, Row } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

interface Props {
  todo: FragmentType<typeof TodoFragmentFragmentDoc>;
}
export default function TodoCard({ todo }: Props) {
  const todoFragment = useFragment(TodoFragmentFragmentDoc, todo);
  return (
    <Card>
      <Row justify="space-between">
        <Col>
          <Title level={3}>{todoFragment.title}</Title>
        </Col>
        <Col>
          <Radio.Group>
            {STATUSES.map((status, idx) => (
              <Radio.Button key={idx} value={status.status}>
                {status.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Col>
      </Row>
      <Row>
        <Col>{todoFragment.description}</Col>
      </Row>
      <Row>
        <Col>
          <span>{todoFragment.createdAt}</span>
        </Col>
      </Row>
    </Card>
  );
}
