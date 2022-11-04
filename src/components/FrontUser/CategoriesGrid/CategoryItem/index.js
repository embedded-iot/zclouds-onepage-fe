import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

export default function CategoryItem(props) {
  return (
    <Card
      cover={<img alt={props.name} src={props.avatar} />}
    >
      <Meta title={props.name} />
    </Card>
  )
}
