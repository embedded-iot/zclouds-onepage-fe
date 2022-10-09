import React from 'react';
import { Col, Divider, Row, Typography } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';

import './style.scss';

const { Text } = Typography;

export default function ProductList({ products = [], redirectTo = () => {}}) {
  return (
    <div className="product-list-wrapper">
      {
        products.map((product, productIndex) => {
          return (
            <div className="product_item" key={productIndex}>
              <div className="product-title">{product.name}</div>
              <br />
              <Row gutter={[30, 30]}>
                {
                  product.services.map((service, serviceIndex) => {
                    return (
                      <Col span={6} key={serviceIndex}>
                        <Row className="service-item" onClick={() => redirectTo(service.key)}>
                          <Col span={6} className="service-item-icon">
                            <YoutubeOutlined style={{ fontSize: '45px', color: '#ffffff' }}/>
                          </Col>
                          <Col span={18}>
                            <div className="service-item-title">{service.name}</div>
                            <Divider />
                            <div>{service.description} (<Text className="service-item-price">{service.price} đ</Text>)</div>
                          </Col>
                        </Row>
                      </Col>
                    );
                  })
                }
              </Row>
            </div>
          );
        })
      }
    </div>
  )
}
