import React from 'react';
import { Form } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import {
  DESIGN_VALUES,
} from 'components/contants';
import { upload } from 'utils';
import { SellerDesignsService } from 'services';

export default function DesignDetailForm({ form, designId, initialValues, ...restProps }) {
  const actionMockup = SellerDesignsService.getDesignDetailImageUrl(designId, 'Mockup');
  const actionDesign = SellerDesignsService.getDesignDetailImageUrl(designId, 'Design');
  const handleRemoveImage = (file) => {
    SellerDesignsService.deleteProductImage(designId, file.id);
  }
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        type: DESIGN_VALUES._2D,
        designFileList: upload.getFileListFromList(initialValues && initialValues.design),
        mockFileList: upload.getFileListFromList(initialValues && initialValues.mockup),
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Mockup"
        name="mockFileList"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={actionMockup} onRemove={handleRemoveImage}/>
      </Form.Item>
      <Form.Item
        label="Design"
        name="designFileList"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={actionDesign} onRemove={handleRemoveImage}/>
      </Form.Item>
    </Form>
  )
}
