import React from 'react';
import InputSearch from 'components/Common/InputSearch';
import { Col, Row } from 'antd';

import "./style.scss";
import ProductOptionsView from 'components/Share/ProductOptionsView';

export default function ProductSelectBox({ name, value, options, onChange, onSelect, onProductOptionsChange,  selectedProduct = {}, hasLabel = false }) {
  return (
    <div className="product-select-box__wrapper">
      <InputSearch name={name}
                   onChange={onChange}
                   placeholder="Search product"
                   value={value}
                   className="product-select-box__search-text"
      />
      <Row gutter={[15, 15]}>
        <Col span={12}>
          <div className="product-select-box__product-list">
            {
              options.map(item => (
                <div className={`product-select-box__product-item ${selectedProduct && selectedProduct.value === item.value && 'product-select-box__product-item--selected' }`}
                     onClick={() => onSelect(item.value, item, name)}
                     key={item.id}
                >
                  <img className="product-select-box__product-item-image" src={item.avatar} alt={item.label} />
                  <div className='product-select-box__product-item-contents'>
                    <div className='product-select-box__product-item-title'>{item.name}</div>
                    <div className='product-select-box__product-item-price'>From: {item.convertedPrice}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </Col>
        <Col span={12}>
          <div className='product-select-box__selected-product-title'>{selectedProduct.name || '-'}</div>
          <div className='product-select-box__selected-product-price'>{selectedProduct.convertedPrice && `Price: ${selectedProduct.convertedPrice}`}</div>
          <div className='product-select-box__selected-product-sku'>{selectedProduct.sku && `SKU: ${selectedProduct.sku}`}</div>
          <div className='product-select-box__selected-product-options'>
            <ProductOptionsView productOptions={selectedProduct.productOptions}
                                onProductOptionsChange={onProductOptionsChange}
                                hasLabel={hasLabel}

            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
