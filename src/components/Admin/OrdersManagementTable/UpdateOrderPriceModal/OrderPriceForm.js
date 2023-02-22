import React from 'react';
import { Form } from 'antd';
import InputNumber from 'components/Common/InputNumber';

export default function OrderPriceForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        ...initialValues,
        price: initialValues.totalPrice || 0,
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please enter order price!',
          },
        ]}
      >
        <InputNumber placeholder={"Price"} />
      </Form.Item>
    </Form>
  )
}
