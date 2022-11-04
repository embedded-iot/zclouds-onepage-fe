import React from 'react';
import { Col, Row } from 'antd';

export default function Grid({ dataSource = [], gridItemTemplate = () => {}, gutter = [20, 20], colSpan = 6 }) {
  return (
    <Row gutter={gutter}>
      {
        dataSource.map((item, index) => (
          <Col span={colSpan} key={index}>
            {
              gridItemTemplate({ item, index })
            }
          </Col>
        ))
      }
    </Row>
  )
}
