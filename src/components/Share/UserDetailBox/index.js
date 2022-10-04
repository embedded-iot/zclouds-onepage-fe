import React from 'react';
import { Descriptions } from 'antd';
import { Typography } from 'antd';
const { Text } = Typography;


export default function UserDetailBox({ userInfo = {}}) {
  return (
    <Descriptions column={3} bordered>
      <Descriptions.Item label="Tên tài khoản">{userInfo.username || "-"}</Descriptions.Item>
      <Descriptions.Item label="Thành viên">{userInfo.level || "VIP"}</Descriptions.Item>
      <Descriptions.Item label="Số dư">
        <Text type="danger">{userInfo.balance || "0"} đ</Text>
      </Descriptions.Item>
      <Descriptions.Item label="Quyển">{!!userInfo.role ? userInfo.role.toUpperCase() : "USER"}</Descriptions.Item>
    </Descriptions>
  );
}
