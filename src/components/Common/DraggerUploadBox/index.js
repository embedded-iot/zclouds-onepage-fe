import React from 'react';
import { Upload } from 'antd';
import uploadIcon from 'images/upload-icon.svg';
import Icon from 'components/Common/Icon';
import './style.scss';

export default function DraggerUploadBox({ action, selectLabel, ...restProps }) {
  return (
    <div className="dragger-upload-box__wrapper">
      <Upload.Dragger name="files"
                      action={action || 'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                      {...restProps}
      >
        <Icon src={uploadIcon} width={24} height={24} />
        <div className="dragger-upload-box__select-label">{selectLabel || 'Drag files or choose files to upload!'}</div>
      </Upload.Dragger>
    </div>
  );
}
