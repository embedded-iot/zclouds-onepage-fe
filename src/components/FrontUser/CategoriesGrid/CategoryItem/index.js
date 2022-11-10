import React from 'react';
import { Card } from 'antd';

import './style.scss';

export default function CategoryItem({ showTitle = true, showDes1 = true, showDes2 = true, onClick = () => {}, ...restProp}) {
  const { id, name, avatar, price, sizes = 0, colors = 0, print = 0} = restProp || {};
  return (
    <Card
      className="category-item__wrapper"
      cover={<img alt={name} src={avatar} />}
      onClick={() => onClick(restProp)}
      key={id}
    >
      { showTitle && <div className='category-item__title'>{name}</div>}
      { showDes1 && <div className='category-item__description-1'>From: {price}</div>}
      { showDes2 && <div className='category-item__description-2'>{`${sizes} sizes ${colors} colors ${print} print providers`}</div>}
    </Card>
  )
}
