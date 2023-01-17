import React from 'react';
import { Form } from 'antd';
import {
  STORE_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';

export default function StoreForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: '',
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Status"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please select store status!',
          },
        ]}
      >
        <DropdownSelect
          options={STORE_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
