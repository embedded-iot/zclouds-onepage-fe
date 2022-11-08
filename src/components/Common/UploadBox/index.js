import React, { useState } from 'react';
import {
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Upload } from 'antd';

export default function UploadBox({ onChange }) {
  const [fileList, setFileList] = useState([]);
  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      onChange(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Select File</Button>
    </Upload>
  );
}
