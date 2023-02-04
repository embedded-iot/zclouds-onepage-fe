import React from 'react';
import { Form } from 'antd';
import {
  STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';

export default function EmailForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        ...initialValues,
        state: !!initialValues && !!initialValues.state ? initialValues.state : '',
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'Email is invalid!',
          },
          {
            required: true,
            message: 'Please enter email!',
          },
        ]}
      >
        <InputText placeholder="Email"/>
      </Form.Item>
      <Form.Item
        label="Status"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please select status!',
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
