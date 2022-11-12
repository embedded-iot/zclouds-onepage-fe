import React from 'react';
import { Form, Input } from 'antd';
import {
  PERMISSIONS_VALUES_OPTIONS,
} from 'components/contants';
import CheckboxGroupBox from 'components/Common/CheckboxGroupBox';

export default function RoleForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={initialValues}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Role name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter role name!',
          },
        ]}
      >
        <Input placeholder="Role name"  />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
      >
        <Input placeholder="Role name"  />
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
        label="Permissions"
        name="permissions"
      >
        <CheckboxGroupBox options={PERMISSIONS_VALUES_OPTIONS} />
      </Form.Item>
    </Form>
  )
}
