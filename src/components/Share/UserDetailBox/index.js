import React from 'react';
import { Avatar, Card, Col, Descriptions, Row } from 'antd';
import { Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { format } from 'utils';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
const { Text } = Typography;


export default function UserDetailBox({ userInfo = {}}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
  const paddingBottom = isMobile ? 7 : 10;
  return (
    <Card>
      <Row>
        <Col span={6}>
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            src={userInfo.avatar}
            icon={<UserOutlined />}
            // eslint-disable-next-line
            size={isMobile && 60 || isTablet && 50 || 80}
          />
        </Col>
        <Col span={18}>
          <Descriptions column={1} >
            <Descriptions.Item label="Họ và tên" style={{ paddingBottom }}>{userInfo.name || "-"}</Descriptions.Item>
            <Descriptions.Item label="Tên đăng nhập" style={{ paddingBottom }}>{userInfo.loginId || "VIP"}</Descriptions.Item>
            <Descriptions.Item label="Số dư" style={{ paddingBottom }}>
              <Text type="danger">{format.formatCurrency(userInfo.credit)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Quyền" style={{ paddingBottom }}>{!!userInfo.type ? userInfo.type.toUpperCase() : "USER"}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
