import React from 'react';
import { Form } from 'antd';
import {
  BLOG_CATEGORIES_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';
import InputNumber from 'components/Common/InputNumber';

export default function BlogCategoriesForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        ...initialValues,
        status: !!initialValues && !!initialValues.status ? initialValues.status : '',
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Blog category name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter blog category name!',
          },
        ]}
      >
        <InputText placeholder="Blog category name"  />
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
        <InputText placeholder="Slug" />
      </Form.Item>
      <Form.Item
        label="Display order"
        name="displayOrder"
        rules={[
          {
            required: true,
            message: 'Please enter display order!',
          },
        ]}
      >
        <InputNumber min={0} placeholder="Display order"  />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: 'Please select status!',
          },
        ]}
      >
        <DropdownSelect
          options={BLOG_CATEGORIES_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
