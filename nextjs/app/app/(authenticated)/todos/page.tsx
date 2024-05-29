import { Table } from "antd";

export default function Home() {
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "done",
      dataIndex: "done",
      key: "done",
    },
  ];
  const dataSource = [
    {
      id: 1,
      title: "title1",
      done: false,
    },
    {
      id: 2,
      title: "title2",
      done: true,
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </>
  );
}
