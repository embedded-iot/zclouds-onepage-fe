import React, { useState } from 'react';
import { Collapse } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'

import './style.scss';

const { Panel } = Collapse;
export default function CollapseBox({ items = [], defaultActiveKey = [], onChange = () => {}, ...restProps }) {
  const [activeKey, setActiveKey] = useState(-1);
  const handleChange = (key) => {
    setActiveKey(key || -1);
    onChange(key);
  }
  const genExtra = (key) => {
    return key.toString() === activeKey.toString() ? <MinusCircleOutlined /> : <PlusCircleOutlined />
  }
  return (
    <Collapse defaultActiveKey={defaultActiveKey}
              onChange={handleChange}
              ghost
              {...restProps}
    >
      {
        items.map((item, index) => (
          <Panel header={item.header}
                 key={index}
                 showArrow={false}
                 extra={genExtra(index)}
          >
            <div>{item.text}</div>
          </Panel>
        ))
      }
    </Collapse>
  )
}
