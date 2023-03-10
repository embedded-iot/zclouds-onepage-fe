import React from 'react';
import { Card } from 'antd';
import Icon from 'components/Common/Icon';

import './style.scss';

export default function ProductItem({ className, title, src, description, footer }) {
  return (
    <Card
      className={`product-item__wrapper ${className}`}
      cover={(
        <div className="product-item__covert-image">
          <Icon alt={title} src={src} />
        </div>
      )}
    >
      <div className="product-item__body">
        { title && <div className='product-item__title'>{title}</div>}
        { description && <div className='product-item__description'>{description}</div>}
        { footer && <div className='product-item__footer'>{footer}</div>}
      </div>
    </Card>
  )
}
