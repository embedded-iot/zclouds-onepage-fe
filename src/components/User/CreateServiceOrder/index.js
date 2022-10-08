import React from 'react';
import { Col, Row } from 'antd';
import CreateViewYoutube from './CreateViewYoutube';

export default function CreateServiceOrder(props) {
  return (
    <Row>
      <Col span={12}>
        <CreateViewYoutube />
      </Col>
    </Row>
  );
}
