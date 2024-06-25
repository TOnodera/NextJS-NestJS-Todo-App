"use client";
import { MenuOutlined } from "@ant-design/icons";
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";

type SideMenu = {
  key: string;
  icon: React.FunctionComponentElement<
    Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>
  >;
  label: React.ReactNode;
};
interface Props {
  menus: SideMenu[];
}

export default function SideMenu({ menus }: Props) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Sider breakpoint="md" collapsed={collapsed} trigger={null}>
      <span
        className={"ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left"}
        style={{
          top: 0,
          backgroundColor: "#001529",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <MenuOutlined />
      </span>
      <Menu
        // style={{ backgroundColor: token.colorPrimaryBg }}
        theme="dark"
        items={menus}
      />
    </Sider>
  );
}
