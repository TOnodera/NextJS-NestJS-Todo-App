import React, { useEffect } from "react";
import { notification } from "antd";

interface Props {
  message: string;
  description?: string;
}
export default function Notification({ message, description }: Props) {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    api.error({
      message,
      description,
      duration: 10,
    });
  });

  return <>{contextHolder}</>;
}
