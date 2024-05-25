"use client";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

type SideMenu = {
  key: string;
  icon: React.FunctionComponentElement<
    Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>
  >;
  label: string;
};
interface Props {
  menus: SideMenu[];
}
export default function SideMenu({ menus }: Props) {
  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      style={{ paddingTop: "64px" }}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={menus}
      />
    </Sider>
  );
}
