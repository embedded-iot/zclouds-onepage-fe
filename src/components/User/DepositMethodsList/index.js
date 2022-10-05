import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { WEBSITE_NAME } from 'components/contants';

import './style.scss';

const { Text } = Typography;

export default function DepositMethodsList({ userInfo = {}}) {
  const items = [
    {
      title: "1. Nạp qua ngân hàng",
      content: (
        <>
          Nội dung chuyển khoản:<br/>
          <div className="highlight-box">
            <Text type="danger" style={{background: '#fff'}}>{`${WEBSITE_NAME} ${userInfo.name || ''}`}</Text>
          </div>
          <br/>
          Vietcombank: <b>123456789</b><br/>
          Vietcombank: <b>123456789</b><br/>
          Vietcombank: <b>123456789</b><br/>
        </>
      ),
    },
    {
      title: "2. Nạp bằng thẻ cào Mobi, Vina, Viettel",
      content: (
        <>
          <div>Nội dung chuyển khoản:</div>
          <Text type="danger">asdasdasd sdasdas</Text>
        </>
      ),
    },
  ];
  return (
    <div className="deposit-method-wrapper">
      <Row gutter={16}>
        {
          items.map((item, index) => (
            <Col span={8} key={index}>
              <Card title={item.title.toUpperCase()} style={{ background: '#fafafa'}}>
                {item.content}
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
