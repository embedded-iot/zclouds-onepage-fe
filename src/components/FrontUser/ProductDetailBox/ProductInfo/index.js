import React, { useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import './style.scss';

export default function ProductInfo({ product = {}}) {
  const [productOptions, setProductOptions] = useState({});

  const onOptionsChange = (name, value) => {
    const newProductOptions = {
      ...productOptions,
      [name]: value,
    }
    setProductOptions(newProductOptions);
  }

  return (
    <div className='product-info__wrapper'>
      <div className='product-info__title'>{product.name}</div>
      <div className='product-info__description'>{product.subName || '-'}</div>
      <div className='product-info__price'>From: {product.price}</div>
      <div className='product-info__sku'>SKU: {product.id}</div>
      <div className='product-info__divider'></div>
      {
        product.productOptions && product.productOptions.map(productOption => (
          <div className='product-info__options-wrapper' key={productOption.id}>
            <div className='product-info__option-title'>{productOption.name}</div>
            <div className='product-info__option-list'>
              {
                productOption.productOptionValues && productOption.productOptionValues.map(productOptionValue => (
                  <span className={`product-info__option-item ${productOptions[productOption.name] === productOptionValue.value && 'product-info__option-item--selected' }`}
                       key={productOptionValue.id} onClick={() => onOptionsChange(productOption.name, productOptionValue.value)}>
                    {productOptionValue.value}
                  </span>
                ))
              }
            </div>
          </div>
        ))
      }
      <div className='product-info__note'>{product.note}</div>
      <Button className="product-info__download-button" type='primary' icon={<DownloadOutlined />}>Download Mockup & Teamplate Design</Button>
    </div>
  )
}
