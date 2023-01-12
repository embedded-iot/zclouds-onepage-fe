import React from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
export default function CollapseBox({ items = [], defaultActiveKey = [], onChange = () => {}, ...restProps }) {
  return (
    <Collapse defaultActiveKey={defaultActiveKey}
              onChange={onChange}
              {...restProps}
    >
      {
        items.map((item, index) => (
          <Panel header={item.header} key={item.key || index}>
            <div>{item.text}</div>
          </Panel>
        ))
      }
    </Collapse>
  )
}
