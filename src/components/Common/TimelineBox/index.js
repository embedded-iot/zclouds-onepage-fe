import React from 'react';
import { Timeline } from 'antd';

import './style.scss';

export default function TimelineBox({ items = [], mode, ...restProps }) {
  return (
    <Timeline mode={mode}
              {...restProps}
    >
      {
        items.map((item, index) => (
          <Timeline.Item label={item.label} key={index} >
            {
              item.children
            }
          </Timeline.Item>
        ))
      }
    </Timeline>
  )
}
