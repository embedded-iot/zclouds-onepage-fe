import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import CheckboxGroupBox from 'components/Common/CheckboxGroupBox';
import {
  SHIPPING_EXPRESSES_VALUES_OPTIONS,
  SIZES_VALUES_OPTIONS,
  STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';

export default function ProductForm({ form, initialValues, categoriesOptions, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: '',
        categoryId: '',
        featureImage: '',
        ...initialValues,
      }}
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
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please enter slug!',
          },
        ]}
      >
        <Input placeholder="Slug" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please enter price!',
          },
        ]}
      >
        <InputNumber min={0} max={10} placeholder="Price"  />
      </Form.Item>
      <Form.Item
        label="Category"
        name="categoryId"
        rules={[
          {
            required: true,
            message: 'Please select category!',
          },
        ]}
      >
        <DropdownSelect
          options={categoriesOptions}
        />
      </Form.Item>
      <Form.Item
        label="Upload"
        name="featureImage"
        valuePropName="fileList"
      >
        <UploadBox />
      </Form.Item>
      <Form.Item
        label="Note"
        name="note"
      >
        <Input placeholder="Note" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
      >
        <Input placeholder="Note" />
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
      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please select state!',
          },
        ]}
      >
        <DropdownSelect
          options={STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
