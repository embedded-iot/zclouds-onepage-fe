import React from 'react';
import { Card } from 'antd';

import './style.scss';

export default function CategoryItem({ name, avatar, price, sizes = 0, colors = 0, print = 0, onClick = () => {}}) {
  return (
    <Card
      className="category-item__wrapper"
      cover={<img alt={name} src={avatar} />}
      onClick={onClick}
    >
      <div className='category-item__title'>{name}</div>
      <div className='category-item__description-1'>From: {price}</div>
      <div className='category-item__description-2'>{`${sizes} sizes ${colors} colors ${print} print providers`}</div>
    </Card>
  )
}
