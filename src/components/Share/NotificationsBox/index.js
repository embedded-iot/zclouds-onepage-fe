import React, { useState } from 'react';
import { Alert, Space } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

export default function NotificationsBox({ items = []}) {
  // eslint-disable-next-line
  const [list, setList] = useState(items);
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      {
        list.map((item) => (
          <Alert
            message={item.title}
            description={!item.showEnglish ? item.vnContent : item.enContent}
            type="success"
            icon={<NotificationOutlined style={{ fontSize: 16 }} />}
            showIcon={true}
            closable
          />
        ))
      }
    </Space>
  )
}
