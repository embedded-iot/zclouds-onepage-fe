import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { getAuthorizationHeaders } from 'utils';

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export default function UploadBox({ action, onRemove, headers, ...restProps }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // const [fileList, setFileList] = useState(defaultFileList);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleCancel = () => setPreviewOpen(false);
  const handleRemove = (file) => {
    onRemove(file.response);
    return true;
  };
  return (
    <>
      <Upload
        {...restProps}
        headers={getAuthorizationHeaders()}
        action={action}
        listType="picture-card"
        // // fileList={fileList}
        onPreview={handlePreview}
        // onChange={handleChange}
        onRemove={handleRemove}
      >
        { uploadButton }
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}
