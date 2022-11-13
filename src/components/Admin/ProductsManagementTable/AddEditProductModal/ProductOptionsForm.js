import React from 'react';
import { Form } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import CheckboxGroupBox from 'components/Common/CheckboxGroupBox';
import {
  SHIPPING_EXPRESSES_VALUES_OPTIONS,
  SIZES_VALUES_OPTIONS,
} from 'components/contants';
import { upload } from 'utils';
import { AdminProductsService } from 'services';

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
        label="Shipping"
        name="shipping"
      >
        <CheckboxGroupBox options={SHIPPING_EXPRESSES_VALUES_OPTIONS} />
      </Form.Item>
      <Form.Item
        label="Sizes"
        name="sizes"
      >
        <CheckboxGroupBox options={SIZES_VALUES_OPTIONS} />
      </Form.Item>
    </Form>
  )
}
