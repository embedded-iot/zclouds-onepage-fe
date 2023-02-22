import React from 'react';
import { Card } from 'antd';

import './style.scss';

export default function TopSellingProductItem(props) {
  const { id, name, avatar, sku, ordersCount } = props || {};
  return (
    <Card
      className="top-selling-product-item__wrapper"
      cover={<img alt={name} src={avatar} />}
      key={id}
    >
      <div className='top-selling-product-item__title'>Seller {name}</div>
      <div className='top-selling-product-item__description-1'>Design SKU {sku} - {ordersCount} Sold</div>
    </Card>
  )
}
