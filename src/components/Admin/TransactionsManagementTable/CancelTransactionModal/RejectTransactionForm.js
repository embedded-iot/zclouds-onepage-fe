import React from 'react';
import { Form } from 'antd';
import InputText from 'components/Common/InputText';

export default function RejectTransactionForm({ form, initialValues, ...restProps }) {
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      {...restProps}
    >
      <div style={{ marginBottom: 8}}>Transaction Id: {initialValues ? initialValues.transactionId : 'Transaction id'}</div>
      <Form.Item
        label="Description"
        name="description"
        >
        <InputText placeholder="Description" />
      </Form.Item>
    </Form>
  )
}
