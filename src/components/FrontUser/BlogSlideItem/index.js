import React from 'react';
import { Col, Row } from 'antd';

import './style.scss';

export default function BlogSlideItem({ data = {}, onClick = () => {}, className = '', hasWrap = true, imageHeight = 'autp'  }) {
  const { image, headerTitle, title, description } = data;
  return (
    <Row gutter={hasWrap ? [0, 0] : [16, 0] } className={`blog-slide-item__wrapper ${className}`} onClick={() => onClick(data)}>
      <Col span={hasWrap ? 24 : 16 } className='blog-slide-item__image'>
        <img src={image} alt={title} style={{ height: imageHeight}} />
      </Col>
      <Col span={hasWrap ? 24 : 8 } className='blog-slide-item__contents'>
        <div className='blog-slide-item__header-title'>{headerTitle}</div>
        <div className='blog-slide-item__title'>{title}</div>
        <div className='blog-slide-item__description'>{description}</div>
      </Col>
    </Row>
  )
}
