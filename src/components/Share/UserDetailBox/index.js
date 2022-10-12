import React from 'react';
import { Avatar, Card, Col, Descriptions, Row } from 'antd';
import { Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { format } from 'utils';
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
            <Descriptions.Item label="Họ và tên">{userInfo.name || "-"}</Descriptions.Item>
            <Descriptions.Item label="Tên đăng nhập">{userInfo.loginId || "VIP"}</Descriptions.Item>
            <Descriptions.Item label="Số dư">
              <Text type="danger">{format.formatCurrency(userInfo.credit)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Quyền">{!!userInfo.type ? userInfo.type.toUpperCase() : "USER"}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
