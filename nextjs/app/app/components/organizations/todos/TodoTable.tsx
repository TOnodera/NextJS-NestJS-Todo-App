import { Table, TableColumnsType, TableProps } from "antd";

export interface TodoTableDataType {
  key: React.Key;
  title: string;
  updateButton: React.ReactNode;
  deleteButton: React.ReactNode;
}

export default function TodoTable<T extends TodoTableDataType>({ dataSource }: TableProps<T>) {
  const columns: TableColumnsType<TodoTableDataType> = [
    {
      title: "タスク名",
      dataIndex: "title",
    },
    {
      title: "編集",
      dataIndex: "updateButton",
    },
    {
      title: "削除",
      dataIndex: "deleteButton",
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
}
