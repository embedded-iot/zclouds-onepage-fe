import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { FrontUserCategoriesService } from 'services';
import ProductImagesPreview from './ProductImagesPreview';
import ProductInfo from './ProductInfo';
import PlainText from 'components/Common/PlainText';

import './style.scss';

export default function ProductDetailBox({ productId, productName }) {
  const [product, setProduct] = useState(null);

  const getProductDetail = () => {
    FrontUserCategoriesService.getProductDetail(productId, response => {
      setProduct(response);
    })
  }
  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line
  }, [productId]);

  if (!product) {
    return null;
  }
  return (
    <div className='product-detail-box__wrapper'>
      <Row gutter={[65, 46]}>
        <Col span={12}>
          <ProductImagesPreview product={product}/>
        </Col>
        <Col span={12}>
          <ProductInfo product={product} />
        </Col>
        <Col span={24}>
          <div className='product-detail-box__title'>
            <span className='product-detail-box__title-icon' />
            Description
          </div>
          <div className='product-detail-box__description'>
            <PlainText type='TextArea'>
              { product.description || '-'}
            </PlainText>
          </div>
        </Col>
      </Row>
    </div>
  );
}
