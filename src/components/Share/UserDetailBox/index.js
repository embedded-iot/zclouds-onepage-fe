import React from 'react';
import { Avatar, Card, Col, Descriptions, Row } from 'antd';
import { Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Text } = Typography;


export default function UserDetailBox({ userInfo = {}}) {
  return (
    <Card>
      <Row>
        <Col span={4}>
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            src={userInfo.avatar}
            icon={<UserOutlined />}
            size={80}
          />
        </Col>
        <Col span={20}>
          <Descriptions column={2}>
            <Descriptions.Item label="Tên tài khoản">{userInfo.fullName || "-"}</Descriptions.Item>
            <Descriptions.Item label="Thành viên">{userInfo.level || "VIP"}</Descriptions.Item>
            <Descriptions.Item label="Số dư">
              <Text type="danger">{userInfo.balance || "0"} đ</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Quyền">{!!userInfo.role ? userInfo.role.toUpperCase() : "USER"}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
