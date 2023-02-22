import React from 'react';
import { Form } from 'antd';
import {
  SELLER_STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';

export default function SellerForm({ form, initialValues, ...restProps }) {
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
            message: 'Please select seller status!',
          },
        ]}
      >
        <DropdownSelect
          options={SELLER_STATE_LABEL_VALUE_OPTIONS}
        />
      </Form.Item>
    </Form>
  )
}
