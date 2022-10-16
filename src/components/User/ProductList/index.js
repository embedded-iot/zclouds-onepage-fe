import React from 'react';
import { Col, Divider, Row } from 'antd';
import { YoutubeOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';

import './style.scss';

export default function ProductList({ products = [], redirectTo = () => {}}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const isTablet = useMediaQuery(RESPONSIVE_MEDIAS.TABLET);
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
                      // eslint-disable-next-line
                      <Col span={isMobile && 24 || isTablet && 12 || 6} key={serviceIndex}>
                        <Row className="service-item" onClick={() => redirectTo(service.key)}>
                          <Col span={6} className="service-item-icon">
                            <YoutubeOutlined style={{ fontSize: '45px', color: '#ffffff' }}/>
                          </Col>
                          <Col span={18}>
                            <div className="service-item-title">{service.name}</div>
                            <Divider />
                            <div>{service.description || '-'}</div>
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
