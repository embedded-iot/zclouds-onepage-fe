import React from 'react';
import { Form, Input } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import CheckboxGroupBox from 'components/Common/CheckboxGroup';
import { SHIPPING_EXPRESSES_VALUES_OPTIONS, SIZES_VALUES_OPTIONS } from 'components/contants';

export default function ProductForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Product name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter product name!',
          },
        ]}
      >
        <Input placeholder="Product name"  />
      </Form.Item>
      <Form.Item
        label="Upload"
        name="upload"
        valuePropName="fileList"
      >
        <UploadBox />
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
