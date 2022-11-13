import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

export default function DraggerUploadBox({ action, ...restProps }) {
  return (
    <Upload.Dragger name="files"
                    action={action || 'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                    {...restProps}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Drag files or choose files to upload!</p>
    </Upload.Dragger>
  );
}
