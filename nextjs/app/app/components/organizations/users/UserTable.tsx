import { Table, TableColumnsType } from "antd";
import { TableProps } from "antd/es/table";

export interface UserTableDataType {
  key: React.Key;
  name: string;
  role: string;
  updateButton: React.ReactNode;
  deleteButton: React.ReactNode;
}
export default function UserTable<T extends UserTableDataType>({ dataSource }: TableProps<T>) {
  const columns: TableColumnsType<T> = [
    {
      title: "ユーザー名",
      dataIndex: "name",
    },
    {
      title: "ロール",
      dataIndex: "role",
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
