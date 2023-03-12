import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { SellerProductsService } from 'services';
import ProductImagesPreview from './ProductImagesPreview';
import ProductInfo from './ProductInfo';
import PlainText from 'components/Common/PlainText';
import { RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import { getSellerUrl } from 'services/BaseService';
import { useMediaQuery } from 'react-responsive';

import './style.scss';

export default function ProductDetailBox({ defaultProduct = null, isAddOrder, productId, redirectTo }) {
  const [product, setProduct] = useState(defaultProduct);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const getProductDetail = () => {
    SellerProductsService.getProductDetail(productId, response => {
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

  const handleAddOrder = productId => {
    window.open(getSellerUrl() + ROUTERS.LOGIN + `?redirect=${ROUTERS.SELLER_ORDERS + '/0/productId/' + productId}`, '_self');
  }

  return (
    <div className={`${!isMobile && 'product-detail-box__wrapper'}`}>
      <Row gutter={isMobile ? [0, 8] : [65, 46]}>
        <Col span={isMobile ? 24 : 12}>
          <ProductImagesPreview product={product}/>
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <ProductInfo product={product}
                       onAddOrder={handleAddOrder}
                       isAddOrder={isAddOrder}
          />
        </Col>
        <Col span={24} className={`${isMobile && 'box-card--mobile'}`}>
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
