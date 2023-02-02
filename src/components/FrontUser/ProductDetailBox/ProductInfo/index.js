import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { download, format } from 'utils';
import Icon from 'components/Common/Icon';
import plusIcon from 'images/plus-icon.svg';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import './style.scss';

export default function ProductInfo({ product = {}, isAddOrder = true, onAddOrder = () => {}}) {
  const [productOptions, setProductOptions] = useState({});
  const [productDetail, setProductDetail] = useState(product);
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const onOptionsChange = (name, value) => {
    const newProductOptions = {
      ...productOptions,
      [name]: value,
    }
    setProductOptions(newProductOptions);
  }

  useEffect(() => {
    if (Object.entries(productOptions).length === 0) {
      return;
    }
    let calcPrice = productDetail.price;
    let calSku = productDetail.id;
    for (const [, value] of Object.entries(productOptions)) {
      calcPrice += value.priceAdjustment;
      calSku += '|' + value.slug;
    }
    setProductDetail(productDetail => ({
      ...productDetail,
      convertedPrice: format.formatCurrency(calcPrice),
      sku: calSku,
    }))
    // eslint-disable-next-line
  }, [productOptions]);

  const buttonList = [
    !!product.designUrl && <Button className="product-info__download-button" type='primary' icon={<DownloadOutlined />} onClick={() => download(product.designUrl)}>Download Mockup & Template Design</Button>,
    isAddOrder && <Button type="primary" icon={<Icon src={plusIcon} width={24} height={24} />} onClick={() => onAddOrder(product.id)}>Order now</Button>,
  ];
  return (
    <div className={`product-info__wrapper ${isMobile && 'box-card--mobile'}`}>
      <div className='product-info__title'>{productDetail.name}</div>
      {/*<div className='product-info__description'>{product.subName || '-'}</div>*/}
      <div className='product-info__price'>From: {productDetail.convertedPrice}</div>
      <div className='product-info__sku'>SKU: {productDetail.sku}</div>
      <div className='product-info__divider'></div>
      {
        productDetail.productOptions && productDetail.productOptions.map(productOption => (
          <div className='product-info__options-wrapper' key={productOption.id}>
            <div className='product-info__option-title'>{productOption.name}</div>
            <div className='product-info__option-list'>
              {
                productOption.productOptionValues && productOption.productOptionValues.map(productOptionValue => (
                  <span className={`product-info__option-item ${productOptions[productOption.name] && productOptions[productOption.name].value === productOptionValue.value && 'product-info__option-item--selected' }`}
                       key={productOptionValue.id} onClick={() => onOptionsChange(productOption.name, productOptionValue)}>
                    {productOptionValue.value}
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
      { !!product.note && <div className='product-info__note'>{productDetail.note}</div> }
      <ButtonListWrapper buttonList={buttonList} />
    </div>
  )
}
