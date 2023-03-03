import React, { useState } from 'react';
import { Button, Modal, Upload } from 'antd';
import { getAuthorizationHeaders } from 'utils';
import { UploadOutlined } from '@ant-design/icons';
import './style.scss';

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});

export default function UploadBox({ action, className, onRemove, widthAuto = false, headers, selectLabel, selectNote, maxFileUpload = 50, ...restProps }) {
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
      <Button type='primary' icon={<UploadOutlined />}>
        {selectLabel || 'Upload'}
      </Button>
      { !!selectNote &&  <div className="upload-box__select-note">{selectNote}</div>}
    </div>
  );

  const handleCancel = () => setPreviewOpen(false);
  const handleRemove = (file) => {
    console.log(file);
    !!onRemove && onRemove(file.response);
    return true;
  };
  return (
    <div className={`upload-box__wrapper ${className} ${widthAuto && 'upload-box__wrapper--full-width-card'}`}>
      <Upload
        {...restProps}
        headers={getAuthorizationHeaders()}
        action={action || 'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
        listType="picture-card"
        // // fileList={fileList}
        onPreview={handlePreview}
        // onChange={handleChange}
        onRemove={handleRemove}
      >
        { restProps.fileList && restProps.fileList.length >= maxFileUpload ? null : uploadButton }
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
    </div>
  );
}
