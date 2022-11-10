import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { FrontUserCategoriesService } from 'services';
import ProductImagesPreview from './ProductImagesPreview';

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
  }, []);

  return (
    <div className='product-detail-box__wrapper'>
      <Row gutter={[65, 0]}>
        <Col span={12}>
          <ProductImagesPreview product={product}/>
        </Col>
        <Col span={12}>
          đá
        </Col>
      </Row>
    </div>
  );
}
