import React from 'react';
import { Form } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import { upload } from 'utils';
import { AdminProductsService } from 'services';
import ProductOptionsBox from './ProductOptionsBox';

export default function ProductOptionsForm({ form, productId, initialValues, ...restProps }) {
  const action = AdminProductsService.getUploadProductImageUrl(productId);
  const handleRemoveImage = (file) => {
    AdminProductsService.deleteProductImage(productId, file.id);
  }

  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        options: [],
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Upload"
        name="imageFiles"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={action} onRemove={handleRemoveImage}/>
      </Form.Item>
      <Form.Item
        label="Product options"
        name="options"
      >
        <ProductOptionsBox />
      </Form.Item>
    </Form>
  )
}
